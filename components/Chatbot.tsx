
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const STORAGE_KEY = 'glamourtech_consultant_v1';
const WEBHOOK_URL = 'https://hook.us2.make.com/fvvlanaosnlakmzbrdbya9mazf1w9oyo';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setDefaultMessage();
        }
      } catch (e) {
        console.error("History parse error", e);
        setDefaultMessage();
      }
    } else {
      setDefaultMessage();
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const setDefaultMessage = () => {
    setMessages([
      { 
        role: 'model', 
        text: "Hi there. I'm a strategy consultant here at Glamourtech. Our systems are now processing requests via our central automation hub. How can I assist you with your operations today?" 
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowInvite(false); 
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setInput('');
    
    const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send the data to Make.com Webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: newMessages.slice(-5), // Send last 5 messages for context
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      });

      if (!response.ok) {
        throw new Error('Automation hub returned an error');
      }

      // Handle the response from Make.com Webhook Response module
      const rawResponse = await response.text();
      let modelText = rawResponse;
      
      try {
        // In case Make.com sends a JSON string
        const jsonData = JSON.parse(rawResponse);
        modelText = jsonData.output || jsonData.response || jsonData.message || jsonData.text || rawResponse;
      } catch (e) {
        // If it's not JSON, it's likely raw text from the "Webhook Response" body
      }

      // Remove markdown bolds if present for a cleaner UI
      const cleanResponse = (modelText || "I've processed your request but the response was empty. Please check your automation configuration.").replace(/\*\*/g, ''); 
      
      setMessages(prev => [...prev, { role: 'model', text: cleanResponse }]);
    } catch (error) {
      console.error("Consultant logic error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble reaching our automation hub. Please ensure the Webhook Response is active in your workflow." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  const clearHistory = () => {
    if (window.confirm("Clear conversation history?")) {
      localStorage.removeItem(STORAGE_KEY);
      setDefaultMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans text-brand-white">
      {/* FAB - Fixed Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-red text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-300 transform active:scale-95 border border-white/10 z-50 relative"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[360px] md:w-[420px] h-[600px] max-h-[80vh] bg-brand-black border border-white/10 rounded-sm shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          <div className="bg-brand-red p-5 flex items-center justify-between shadow-lg">
            <div>
              <h3 className="text-white font-bold heading-font text-sm uppercase tracking-widest">Automation Hub</h3>
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-tighter">Powered by Make.com</p>
            </div>
            <button onClick={clearHistory} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-brand-black">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 text-sm leading-relaxed rounded-sm ${
                  m.role === 'user' 
                    ? 'bg-brand-red text-white border border-brand-red/20 shadow-lg' 
                    : 'bg-white/5 text-gray-200 border border-white/10'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 flex space-x-2">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 border-t border-white/10">
            <div className="flex space-x-2">
              <button
                onClick={toggleListening}
                className={`p-3 border ${isListening ? 'bg-brand-red border-brand-red text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              
              <input
                type="text"
                className="flex-grow bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-brand-red outline-none"
                placeholder={isListening ? "Listening..." : "Type your message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              
              <button
                onClick={() => handleSend()}
                disabled={isLoading}
                className="bg-brand-red text-white px-5 py-3 hover:bg-red-700 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
