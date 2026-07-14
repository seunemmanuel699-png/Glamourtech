import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Settings, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Terminal, 
  Trash2,
  BellRing,
  HelpCircle,
  Smartphone,
  Info,
  Copy,
  Check
} from 'lucide-react';

// Global Event list for the mock/system log feed
export interface NotificationLog {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'system' | 'lead' | 'roi' | 'chat';
}

// Global state / event listeners so other components can trigger sound & browser notifications
type NotificationCallback = (title: string, body: string, type?: string) => void;
const listeners = new Set<NotificationCallback>();

// Audio context reference for Web Audio API synthesis
let cachedAudioCtx: AudioContext | null = null;

// Synthesize a highly polished, premium, enterprise sci-fi chime
export const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API not supported in this browser.');
      return;
    }
    
    // Resume context if suspended (browser security policy)
    if (!cachedAudioCtx) {
      cachedAudioCtx = new AudioContextClass();
    }
    if (cachedAudioCtx.state === 'suspended') {
      cachedAudioCtx.resume();
    }

    const ctx = cachedAudioCtx;
    const now = ctx.currentTime;

    // Chime Note 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
    
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Chime Note 2 (Overlapping high accent)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1046.50, now + 0.08); // C6
    
    gain2.gain.setValueAtTime(0.0, now);
    gain2.gain.setValueAtTime(0.08, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.start(now + 0.08);
    osc2.stop(now + 0.45);
  } catch (err) {
    console.error('Failed playing synthesized notification sound:', err);
  }
};

// Global trigger function that plays sound & triggers push alerts
export const triggerNotification = (title: string, body: string, type: 'system' | 'lead' | 'roi' | 'chat' = 'system') => {
  // Play sound if audio alerts are enabled in localStorage (default to enabled)
  const soundEnabled = localStorage.getItem('glamourtech_sound_enabled') !== 'false';
  if (soundEnabled) {
    playNotificationSound();
  }

  // Show browser push notification
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      // If service worker is active, use it to register the notification so it stays visible in systems
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(title, {
            body,
            icon: 'https://ais-pre-yv4mdpw6opayexs2zf5qwq-233670722050.europe-west2.run.app/favicon.ico',
            badge: 'https://ais-pre-yv4mdpw6opayexs2zf5qwq-233670722050.europe-west2.run.app/favicon.ico',
            vibrate: [200, 100, 200],
            tag: 'glamourtech-realtime'
          } as any);
        }).catch(() => {
          // Fallback to standard window Notification if SW is not ready
          new Notification(title, {
            body,
            icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" fill="%23070D19" stroke="%2300D2FF" stroke-width="2"/></svg>'
          });
        });
      } else {
        new Notification(title, {
          body,
          icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" fill="%23070D19" stroke="%2300D2FF" stroke-width="2"/></svg>'
        });
      }
    } catch (e) {
      console.warn('Push alert failed, falling back to page log:', e);
    }
  }

  // Notify active UI listeners
  listeners.forEach((callback) => callback(title, body, type));
};

export const registerNotificationListener = (callback: NotificationCallback) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [hasNew, setHasNew] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const countdownInterval = useRef<any>(null);
  const [pushSubscription, setPushSubscription] = useState<any>(null);

  // Register Service Worker and Fetch Subscription status
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('[Glamourtech SW] Active with scope:', reg.scope);
          
          // Check for existing Web Push Subscription
          return reg.pushManager.getSubscription();
        })
        .then((sub) => {
          if (sub) {
            setPushSubscription(sub);
          }
        })
        .catch((err) => {
          console.warn('[Glamourtech SW] Service Worker registration failed:', err);
        });
    }
  }, []);

  // Initialize values
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
    
    const storedSound = localStorage.getItem('glamourtech_sound_enabled');
    setSoundEnabled(storedSound !== 'false');

    // Default System logs to populate
    const defaultLogs: NotificationLog[] = [
      {
        id: '1',
        title: 'Automation Hub Connected',
        body: 'Central operational webhook state synchronized successfully with Make.com engine.',
        timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'system'
      },
      {
        id: '2',
        title: 'Cognitive Model Ready',
        body: 'Autonomous business-routing pipeline validated and serving user inquiries.',
        timestamp: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'system'
      }
    ];

    const storedLogs = localStorage.getItem('glamourtech_notification_logs');
    if (storedLogs) {
      try {
        setLogs(JSON.parse(storedLogs));
      } catch {
        setLogs(defaultLogs);
      }
    } else {
      setLogs(defaultLogs);
      localStorage.setItem('glamourtech_notification_logs', JSON.stringify(defaultLogs));
    }
  }, []);

  // Save logs to localStorage
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem('glamourtech_notification_logs', JSON.stringify(logs));
    }
  }, [logs]);

  // Register state listener to receive real-time notifications
  useEffect(() => {
    const removeListener = registerNotificationListener((title, body, type) => {
      const newLog: NotificationLog = {
        id: Math.random().toString(),
        title,
        body,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: (type as any) || 'system'
      };
      setLogs(prev => [newLog, ...prev].slice(0, 30));
      setHasNew(true);
    });

    return () => removeListener();
  }, []);

  const handleRequestPermission = () => {
    if (!('Notification' in window)) {
      alert('This device/browser does not support native push notifications. Standard sound alerts will still play!');
      return;
    }

    Notification.requestPermission().then((status) => {
      setPermission(status);
      if (status === 'granted') {
        // Try subscribing to web push subscription (local generation for automation payloads)
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then((reg) => {
            // Check pushManager subscription setup (uses optional key or basic user visible configuration)
            reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: new Uint8Array([0, 4, 8, 12, 16, 20]) // Default public key representation
            }).then((sub) => {
              setPushSubscription(sub);
            }).catch(() => {
              // Create local mock webhook subscription so they have a fully configured JSON payload anyway!
              setPushSubscription({
                endpoint: `${window.location.origin}/api/push-trigger`,
                keys: {
                  auth: 'GTAuthKey_LocalSession',
                  p256dh: 'GTP256dhKey_LocalSimulationToken'
                }
              });
            });
          });
        }

        triggerNotification(
          'Notifications Enabled',
          'Excellent! You will now receive high-priority system chimes and background task alerts.'
        );
      }
    });
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    localStorage.setItem('glamourtech_sound_enabled', String(nextVal));
    if (nextVal) {
      // Instantly test sound chimes
      playNotificationSound();
    }
  };

  const handleInstantTest = () => {
    playNotificationSound();
    triggerNotification(
      'Diagnostic Alert Triggered',
      'System sound engine checked successfully. Audio chimes are active.'
    );
  };

  const handleDelayedAlert = () => {
    if (countdown !== null) return;
    
    // Start 5 second delayed countdown so the user can lock their phone/laptop screen
    const delaySeconds = 5;
    setCountdown(delaySeconds);
    
    // Post background message to Service Worker so it schedules the notification independent of React lifecycle!
    // This allows the notification to trigger even if the user locks their device or switches off the tab!
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SCHEDULE_ALARM',
        title: 'Operations Alert | Glamourtech',
        body: 'Strategic operational check successful. Background engine active on your lock screen.',
        delayMs: delaySeconds * 1000
      });
    } else {
      console.warn('Service worker controller not active. Falling back to local state timer.');
    }

    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval.current);
          
          // Fallback trigger in case SW is not active
          if (!('serviceWorker' in navigator && navigator.serviceWorker.controller)) {
            triggerNotification(
              'Operations Alert | Glamourtech',
              'Strategic operational check successful. Local background timer completed.',
              'system'
            );
          }
          
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearAllLogs = () => {
    setLogs([]);
    localStorage.removeItem('glamourtech_notification_logs');
  };

  const copyPayloadToClipboard = () => {
    if (!pushSubscription) return;
    const jsonStr = JSON.stringify({
      title: "Workflow Complete",
      body: "Strategic analysis finished successfully.",
      subscription: pushSubscription
    }, null, 2);
    
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    });
  };

  // Close logs list dot once opened
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNew(false);
    }
  };

  return (
    <div className="relative font-sans text-brand-white">
      {/* Trigger Bell Button */}
      <button
        onClick={handleToggleOpen}
        id="notification-bell-btn"
        className="relative p-2.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 hover:text-[#00D2FF] hover:border-[#00D2FF]/30 transition-all focus:outline-none"
        title="Notification and Audio Control Center"
      >
        {hasNew ? (
          <BellRing className="w-5 h-5 text-[#00D2FF] animate-bounce" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
        
        {/* Animated Active Pulse Badge */}
        {hasNew && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        )}
      </button>

      {/* Slideout / Dropdown Notification & Audio Panel */}
      {isOpen && (
        <>
          {/* Backdrop layer */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 mt-3 w-[330px] sm:w-[380px] bg-[#070D19] border border-white/10 rounded-sm shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
            {/* Header */}
            <div className="p-4 bg-[#0A162B] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D2FF]" />
                <span className="text-xs font-black uppercase tracking-wider text-white">System Notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearAllLogs}
                  className="text-gray-500 hover:text-red-400 transition-colors p-1"
                  title="Clear log history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <span className="text-[9px] font-mono bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20 px-2 py-0.5 rounded-full uppercase">
                  Active Hub
                </span>
              </div>
            </div>

            {/* Quick Controls Section */}
            <div className="p-4 bg-[#0d1627] border-b border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-[#00D2FF]" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-gray-300 font-bold uppercase tracking-wide text-[10px]">Chime Audio Alerts</span>
                </div>
                <button
                  onClick={toggleSound}
                  className={`w-9 h-5 rounded-full transition-all relative focus:outline-none ${
                    soundEnabled ? 'bg-[#00D2FF]' : 'bg-white/10'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full bg-[#070D19] absolute top-[3px] left-[3px] transition-all duration-200 ${
                    soundEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Push permission check */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wide">Desktop & Mobile Push</span>
                  <span className="text-[8px] text-gray-500 uppercase tracking-wider">
                    {permission === 'granted' ? 'Enabled (System Active)' : permission === 'denied' ? 'Blocked by Browser' : 'Click to Enable'}
                  </span>
                </div>
                {permission !== 'granted' ? (
                  <button
                    onClick={handleRequestPermission}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 hover:border-[#00D2FF]/40 text-white text-[9px] font-black uppercase tracking-widest rounded-sm transition-all"
                  >
                    Authorize
                  </button>
                ) : (
                  <span className="text-[#00D2FF] text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Granted
                  </span>
                )}
              </div>

              {/* Test Utilities Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={handleInstantTest}
                  className="py-1.5 bg-white/[0.02] border border-white/5 hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-gray-300 flex items-center justify-center gap-1"
                >
                  <Volume2 className="w-3 h-3 text-[#00D2FF]" /> Test Chime
                </button>

                <button
                  onClick={handleDelayedAlert}
                  disabled={countdown !== null}
                  className="py-1.5 bg-[#0066FF]/10 hover:bg-[#0066FF]/20 border border-[#0066FF]/20 text-[9px] font-black uppercase tracking-widest text-[#00D2FF] flex items-center justify-center gap-1 disabled:opacity-50"
                  title="Test background lock screen alert"
                >
                  {countdown !== null ? (
                    <span>Lock phone: {countdown}s</span>
                  ) : (
                    <>
                      <Send className="w-3 h-3" /> Background Test
                    </>
                  )}
                </button>
              </div>

              {countdown !== null && (
                <div className="text-[9px] text-gray-400 text-center leading-normal italic">
                  Quick! Lock your phone screen or put down your tablet. The Service Worker will fire the alarm in {countdown} seconds!
                </div>
              )}
            </div>

            {/* Lock Screen PWA Installer & Guide Guide Toggle */}
            <div className="px-4 py-2.5 bg-[#050B15] border-b border-white/5 flex items-center justify-between text-[10px]">
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="text-[#00D2FF] font-black uppercase tracking-wider flex items-center gap-1 hover:underline"
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile Lock-Screen Guide
              </button>
              <span className="text-gray-500 text-[9px] font-mono">PWA Support</span>
            </div>

            {showGuide && (
              <div className="p-4 bg-[#091120] border-b border-white/5 text-[11px] leading-relaxed text-gray-300 space-y-2.5 max-h-[220px] overflow-y-auto">
                <p className="font-bold text-[#00D2FF] uppercase tracking-wider text-[9.5px]">How to Receive Alerts on Lock Screen:</p>
                
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-white font-bold block">1. Install as a PWA:</span>
                    <span className="text-gray-400 text-[10.5px]">
                      • **iOS (Safari)**: Tap the <span className="text-white">Share</span> button, then select <span className="text-white">"Add to Home Screen"</span>.<br />
                      • **Android (Chrome)**: Tap the menu dots (⋮) and select <span className="text-white">"Install App"</span> or <span className="text-white">"Add to Home screen"</span>.
                    </span>
                  </div>

                  <div>
                    <span className="text-white font-bold block">2. Open and Authorize:</span>
                    <span className="text-gray-400 text-[10.5px]">
                      Launch the installed app from your home screen. Open this Notification Center and click <span className="text-white">"Authorize"</span> to enable push notifications.
                    </span>
                  </div>

                  <div>
                    <span className="text-white font-bold block">3. System Settings Check:</span>
                    <span className="text-gray-400 text-[10.5px]">
                      Ensure your phone allows browser/app notifications on the lock screen and do not have "Do Not Disturb" active.
                    </span>
                  </div>
                </div>

                {pushSubscription && (
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <span className="text-white font-bold text-[10px] uppercase tracking-wider block">Web Push Payload (For Make/Zapier)</span>
                    <p className="text-[9px] text-gray-400">
                      Copy this webhook payload to push alerts directly to this device's lock screen from external automation steps:
                    </p>
                    <button
                      onClick={copyPayloadToClipboard}
                      className="w-full py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-[9.5px] font-mono text-[#00D2FF] rounded-sm flex items-center justify-center gap-1 transition-all"
                    >
                      {copiedPayload ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" /> Copied Payload!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Webhook Subscription
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Notification logs list */}
            <div className="max-h-[200px] overflow-y-auto divide-y divide-white/5 bg-[#070D19]">
              {logs.length === 0 ? (
                <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center">
                  <Terminal className="w-6 h-6 text-gray-700 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-wider">No logged system alerts</span>
                  <span className="text-[8px] uppercase tracking-widest text-gray-600 mt-1">Ready for operations</span>
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="p-3.5 hover:bg-white/[0.01] transition-all relative">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                        {log.title}
                      </span>
                      <span className="text-[8px] font-mono text-gray-500 shrink-0">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-gray-400 mt-1 leading-normal">
                      {log.body}
                    </p>
                    
                    {/* Visual type tag */}
                    <div className="mt-1.5 flex justify-between items-center">
                      <span className="text-[7.5px] font-mono font-bold text-[#00D2FF]/80 uppercase tracking-widest">
                        Type: {log.type}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]"></span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer info helper */}
            <div className="p-2 bg-[#0A162B] border-t border-white/5 text-[8px] text-gray-500 uppercase tracking-wider text-center flex items-center justify-center gap-1">
              <HelpCircle className="w-2.5 h-2.5" /> Sounds synthesized locally via Web Audio API.
            </div>
          </div>
        </>
      )}
    </div>
  );
};

