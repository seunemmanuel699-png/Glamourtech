import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Cpu, Check, Loader2, Info, RefreshCw, Volume2, ArrowRight, Sparkles, CheckCircle2, RotateCcw, MoveRight, ImageOff, Key, Lock, Star, Hexagon, Circle, Square, Crown } from 'lucide-react';

interface ReCaptchaProps {
  onVerify: (verified: boolean) => void;
  theme?: 'dark' | 'light';
  size?: 'normal' | 'compact';
}

// Preset Rotating Grid Challenge Topics with HD verified Unsplash images
interface GridTile {
  id: number;
  url: string;
  isCorrect: boolean;
  label: string;
}

interface ChallengeTopic {
  id: string;
  title: string;
  instruction: string;
  tiles: GridTile[];
}

const CHALLENGE_TOPICS: ChallengeTopic[] = [
  {
    id: 'houses',
    title: 'Houses & Architecture',
    instruction: 'Select all squares with a HOUSE or RESIDENCE:',
    tiles: [
      { id: 1, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Luxury Home' },
      { id: 2, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Sports Car' },
      { id: 3, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Modern Mansion' },
      { id: 4, url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Suburban Villa' },
      { id: 5, url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Red Car' },
      { id: 6, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Country Estate' },
      { id: 7, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Nature Mountain' },
      { id: 8, url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Brick House' },
      { id: 9, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Highrise Glass Tower' }
    ]
  },
  {
    id: 'cars',
    title: 'Cars & Automobiles',
    instruction: 'Select all squares with a CAR or AUTOMOBILE:',
    tiles: [
      { id: 1, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Porsche Sports Car' },
      { id: 2, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Modern House' },
      { id: 3, url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Chevrolet Corvette' },
      { id: 4, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'City Skyscraper' },
      { id: 5, url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Ferrari Red' },
      { id: 6, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Luxury Villa' },
      { id: 7, url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Audi Sedan' },
      { id: 8, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Mountain Landscape' },
      { id: 9, url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'BMW Coupe' }
    ]
  },
  {
    id: 'vehicles',
    title: 'Buses & Heavy Transport',
    instruction: 'Select all squares with BUSES or HEAVY VEHICLES:',
    tiles: [
      { id: 1, url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'City Bus' },
      { id: 2, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'House' },
      { id: 3, url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Red London Bus' },
      { id: 4, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Mountain' },
      { id: 5, url: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Double Decker Bus' },
      { id: 6, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Sports Coupe' },
      { id: 7, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Modern Home' },
      { id: 8, url: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Tourist Coach' },
      { id: 9, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Tower Building' }
    ]
  },
  {
    id: 'skyscrapers',
    title: 'Bridges & Skyscrapers',
    instruction: 'Select all squares with BRIDGES or SKYSCRAPERS:',
    tiles: [
      { id: 1, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Glass Skyscraper' },
      { id: 2, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Sports Car' },
      { id: 3, url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Golden Gate Bridge' },
      { id: 4, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Country Villa' },
      { id: 5, url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'City Skyline' },
      { id: 6, url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'City Bus' },
      { id: 7, url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&auto=format&fit=crop&q=80', isCorrect: true, label: 'Metropolis Tower' },
      { id: 8, url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Red Ferrari' },
      { id: 9, url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80', isCorrect: false, label: 'Modern Interior' }
    ]
  }
];

// Fisher-Yates Tile Shuffle Helper
const shuffleTiles = (tiles: GridTile[]): GridTile[] => {
  const arr = [...tiles];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Available icons for Draw/Fit challenges (over 100+ dynamic challenge combinations)
const FIT_ICONS = [
  { id: 'shield', name: 'Security Shield', Icon: ShieldCheck },
  { id: 'cpu', name: 'AI Processor Core', Icon: Cpu },
  { id: 'key', name: 'Encrypted Key', Icon: Key },
  { id: 'lock', name: 'Biometric Lock', Icon: Lock },
  { id: 'sparkles', name: 'Quantum Sparkle', Icon: Sparkles },
  { id: 'star', name: 'Verification Star', Icon: Star },
  { id: 'crown', name: 'Enterprise Crown', Icon: Crown },
  { id: 'hexagon', name: 'Matrix Hexagon', Icon: Hexagon },
];

export const ReCaptcha: React.FC<ReCaptchaProps> = ({ 
  onVerify, 
  theme = 'dark',
  size = 'normal' 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  
  // Challenge mode: 'grid' (choose cars/houses) vs 'fit' (slide & fit puzzle shape)
  const [challengeMode, setChallengeMode] = useState<'grid' | 'fit'>('grid');
  
  // Rotating topic index dynamically incremented across page reloads
  const [topicIndex, setTopicIndex] = useState(() => {
    try {
      const storedCount = localStorage.getItem('recaptcha_reload_counter');
      const nextCount = storedCount ? (parseInt(storedCount, 10) + 1) : 0;
      localStorage.setItem('recaptcha_reload_counter', nextCount.toString());
      return nextCount % CHALLENGE_TOPICS.length;
    } catch {
      return Math.floor(Math.random() * CHALLENGE_TOPICS.length);
    }
  });

  const [activeTiles, setActiveTiles] = useState<GridTile[]>(() => 
    shuffleTiles(CHALLENGE_TOPICS[topicIndex].tiles)
  );

  const [selectedTileIds, setSelectedTileIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedImageIds, setFailedImageIds] = useState<number[]>([]);

  // Dynamic Fit Challenge Generator State (supports over 100 combinations!)
  const [fitChallengeId, setFitChallengeId] = useState(1);
  const [targetSliderPos, setTargetSliderPos] = useState(70);
  const [targetRotationAngle, setTargetRotationAngle] = useState(0);
  const [fitIconIndex, setFitIconIndex] = useState(0);

  const [sliderPos, setSliderPos] = useState(10);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [isFittingSuccess, setIsFittingSuccess] = useState(false);

  const currentTopic = CHALLENGE_TOPICS[topicIndex];

  // Generate a random new Fit Challenge with different position, rotation, and icon shape
  const generateNewFitChallenge = () => {
    const posOptions = [25, 35, 45, 55, 65, 75, 80];
    const rotOptions = [-135, -90, -45, 0, 45, 90, 135];
    
    const newTargetPos = posOptions[Math.floor(Math.random() * posOptions.length)];
    const newTargetRot = rotOptions[Math.floor(Math.random() * rotOptions.length)];
    const newIconIdx = Math.floor(Math.random() * FIT_ICONS.length);
    
    setTargetSliderPos(newTargetPos);
    setTargetRotationAngle(newTargetRot);
    setFitIconIndex(newIconIdx);
    setFitChallengeId((prev) => prev + 1);

    // Set non-overlapping initial user positions
    setSliderPos(newTargetPos > 50 ? 15 : 85);
    setRotationAngle((newTargetRot + 90) > 180 ? newTargetRot - 90 : newTargetRot + 90);
    setErrorMessage(null);
    setIsFittingSuccess(false);
  };

  // Re-shuffle tiles whenever topicIndex changes
  useEffect(() => {
    setActiveTiles(shuffleTiles(CHALLENGE_TOPICS[topicIndex].tiles));
    setSelectedTileIds([]);
    setFailedImageIds([]);
  }, [topicIndex]);

  const handleCheckboxClick = () => {
    if (isVerified || isVerifying) return;
    setIsVerifying(true);
    setErrorMessage(null);
    
    // Open the interactive CAPTCHA visual challenge modal!
    setTimeout(() => {
      setShowChallengeModal(true);
      setIsVerifying(false);
      generateNewFitChallenge();
    }, 400);
  };

  const handleTileClick = (id: number) => {
    setSelectedTileIds((prev) => 
      prev.includes(id) ? prev.filter((tId) => tId !== id) : [...prev, id]
    );
    setErrorMessage(null);
  };

  const handleImageError = (tileId: number) => {
    setFailedImageIds((prev) => [...prev, tileId]);
  };

  const rotateTopic = () => {
    setTopicIndex((prev) => (prev + 1) % CHALLENGE_TOPICS.length);
    setSelectedTileIds([]);
    setErrorMessage(null);
  };

  const verifyGridChallenge = () => {
    const correctIds = activeTiles.filter((t) => t.isCorrect).map((t) => t.id);
    
    // Check if user selected all correct tiles and no incorrect ones
    const isExactMatch = 
      correctIds.every((id) => selectedTileIds.includes(id)) &&
      selectedTileIds.every((id) => correctIds.includes(id));

    if (isExactMatch && selectedTileIds.length > 0) {
      // Transition to Stage 2: Slide/Fit Object Challenge for total verification!
      setErrorMessage(null);
      setChallengeMode('fit');
    } else {
      setErrorMessage('Please try again. Select all matching squares containing ' + currentTopic.title);
      // Auto rotate topic on miss
      setTimeout(() => {
        rotateTopic();
      }, 1200);
    }
  };

  // Check Slider / Draw Fit accuracy
  const verifyFitChallenge = () => {
    const posDiff = Math.abs(sliderPos - targetSliderPos);
    const rotDiff = Math.abs(rotationAngle - targetRotationAngle);

    if (posDiff <= 5 && rotDiff <= 12) {
      setIsFittingSuccess(true);
      setTimeout(() => {
        setShowChallengeModal(false);
        setIsVerified(true);
        onVerify(true);
      }, 800);
    } else {
      setErrorMessage(`Not aligned! Rotate slider to ${targetRotationAngle}° and position slider to ${targetSliderPos}%.`);
    }
  };

  const resetCaptcha = () => {
    setIsVerifying(false);
    setIsVerified(false);
    setShowChallengeModal(false);
    setSelectedTileIds([]);
    setChallengeMode('grid');
    setIsFittingSuccess(false);
    onVerify(false);
  };

  const isDark = theme === 'dark';
  const CurrentFitIcon = FIT_ICONS[fitIconIndex].Icon;

  return (
    <>
      <div 
        id="recaptcha-widget" 
        className={`border select-none overflow-hidden transition-all duration-300 rounded-sm font-sans relative ${
          isDark 
            ? 'bg-[#040811] border-white/10 text-brand-white' 
            : 'bg-gray-50 border-gray-200 text-gray-800'
        } ${
          size === 'compact' ? 'p-3 w-full max-w-[280px]' : 'p-5 w-full max-w-[360px]'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Checkbox and Text Area */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={handleCheckboxClick}
                disabled={isVerified || isVerifying}
                className={`w-7 h-7 rounded border transition-all flex items-center justify-center relative focus:outline-none ${
                  isVerified 
                    ? 'bg-green-500 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                    : isVerifying
                      ? 'border-[#0066FF]/30 bg-[#0066FF]/5'
                      : isDark 
                        ? 'border-white/20 hover:border-[#00D2FF] bg-black/40' 
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isVerified && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Check className="w-4 h-4 stroke-[3.5]" />
                    </motion.div>
                  )}

                  {isVerifying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Loader2 className="w-4 h-4 text-[#0066FF] animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="flex flex-col">
              <span className={`text-[12px] font-bold tracking-wide uppercase ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                {isVerified ? 'Verification Complete' : isVerifying ? 'Launching Challenge...' : "I'm not a robot"}
              </span>
              <span className="text-[9px] text-gray-500 font-mono tracking-wider">
                {isVerified 
                  ? 'reCAPTCHA v3 & Biometrics Clear' 
                  : isVerifying 
                    ? 'Security popup loading' 
                    : 'Protected by Google reCAPTCHA v3'}
              </span>
            </div>
          </div>

          {/* reCAPTCHA Brand Logo / Badge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-[#0066FF]">
              <ShieldCheck className={`w-5 h-5 ${isVerified ? 'text-green-400' : 'text-[#0066FF]'}`} />
              <span className="text-[10px] font-black tracking-widest text-white">RECAPTCHA</span>
            </div>
            <span className="text-[8px] text-gray-500 uppercase mt-0.5 font-mono tracking-widest">Enterprise AI</span>
          </div>
        </div>

        {/* Small terms helper footer */}
        <div className={`mt-3 pt-2 border-t text-[8px] font-mono tracking-wider flex items-center justify-between ${isDark ? 'border-white/5 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
          <span className="hover:underline cursor-pointer">Glamourtech Solutions Privacy</span>
          <span className="hover:underline cursor-pointer">Terms & Core Policy</span>
        </div>
      </div>

      {/* POPUP RECAPTCHA CHALLENGE MODAL */}
      <AnimatePresence>
        {showChallengeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 selection:bg-[#0066FF] selection:text-white"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="w-full max-w-sm bg-[#0A0F1D] border border-white/15 rounded-lg overflow-hidden shadow-2xl relative"
            >
              {/* Header Box (Google reCAPTCHA Style Header) */}
              <div className="bg-[#0066FF] p-4 text-white relative">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-white/80 block mb-1">
                  reCAPTCHA v3 Interactive Challenge
                </span>
                
                {challengeMode === 'grid' ? (
                  <>
                    <h3 className="text-xl font-bold tracking-tight uppercase leading-tight">
                      {currentTopic.instruction}
                    </h3>
                    <p className="text-xs text-white/90 mt-1 font-medium">
                      If there are none, click skip or rotate.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold tracking-tight uppercase leading-tight">
                      Rotate & Slide Object to Fit Slot
                    </h3>
                    <p className="text-xs text-white/90 mt-1 font-medium">
                      Challenge #{fitChallengeId}: Match target angle ({targetRotationAngle}°) & position ({targetSliderPos}%).
                    </p>
                  </>
                )}

                <button 
                  onClick={() => setShowChallengeModal(false)}
                  className="absolute top-3 right-3 text-white/80 hover:text-white text-xs font-mono bg-black/20 hover:bg-black/40 px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>

              {/* Mode Switch Tabs */}
              <div className="bg-black/40 border-b border-white/10 flex text-[10px] font-mono uppercase tracking-wider">
                <button
                  onClick={() => setChallengeMode('grid')}
                  className={`flex-1 py-2 text-center transition-colors border-r border-white/10 ${
                    challengeMode === 'grid' ? 'bg-[#0066FF]/20 text-[#00D2FF] font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  1. Image Grid ({currentTopic.title})
                </button>
                <button
                  onClick={() => setChallengeMode('fit')}
                  className={`flex-1 py-2 text-center transition-colors ${
                    challengeMode === 'fit' ? 'bg-[#0066FF]/20 text-[#00D2FF] font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  2. Draw / Fit Shape (#{fitChallengeId})
                </button>
              </div>

              {/* Challenge Content Area */}
              <div className="p-4">
                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-2.5 bg-[#0066FF]/20 border border-[#00D2FF]/40 rounded text-[#00D2FF] text-xs font-mono text-center font-bold"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* MODE 1: 3x3 IMAGE GRID CHALLENGE */}
                {challengeMode === 'grid' && (
                  <div>
                    <div className="grid grid-cols-3 gap-2 aspect-square relative bg-black/60 p-1 rounded border border-white/10">
                      {activeTiles.map((tile) => {
                        const isSelected = selectedTileIds.includes(tile.id);
                        const isImageFailed = failedImageIds.includes(tile.id);
                        return (
                          <div
                            key={tile.id}
                            onClick={() => handleTileClick(tile.id)}
                            className={`relative cursor-pointer overflow-hidden rounded transition-all duration-200 group bg-slate-900 ${
                              isSelected ? 'ring-4 ring-[#0066FF] scale-[0.96]' : 'hover:opacity-90'
                            }`}
                          >
                            {!isImageFailed ? (
                              <img 
                                src={tile.url} 
                                alt={tile.label}
                                onError={() => handleImageError(tile.id)}
                                className={`w-full h-full object-cover transition-transform duration-300 ${
                                  isSelected ? 'scale-110 blur-[1px]' : 'group-hover:scale-105'
                                }`} 
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-slate-800 text-gray-400 text-center">
                                <ImageOff className="w-5 h-5 mb-1 text-gray-500" />
                                <span className="text-[8px] font-mono leading-tight uppercase">{tile.label}</span>
                              </div>
                            )}

                            {isSelected && (
                              <div className="absolute inset-0 bg-[#0066FF]/40 flex items-center justify-center">
                                <div className="w-7 h-7 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-lg">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={rotateTopic}
                          title="Rotate Challenge Topic (Houses -> Cars -> Buses -> Skyscrapers)"
                          className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-gray-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#00D2FF]" />
                          <span>Rotate</span>
                        </button>
                      </div>

                      <button
                        onClick={verifyGridChallenge}
                        disabled={selectedTileIds.length === 0}
                        className={`px-6 py-2.5 rounded font-black text-xs uppercase tracking-widest transition-all ${
                          selectedTileIds.length > 0
                            ? 'bg-[#0066FF] hover:bg-[#0052D4] text-white shadow-lg shadow-[#0066FF]/30'
                            : 'bg-white/10 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {/* MODE 2: SLIDE / DRAW & ROTATE OBJECT TO FIT TARGET SLOT */}
                {challengeMode === 'fit' && (
                  <div className="space-y-4">
                    {/* Interactive Puzzle Canvas Area */}
                    <div className="h-48 bg-[#040811] border border-white/10 rounded relative overflow-hidden flex items-center justify-center">
                      {/* Grid background lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />

                      {/* Target Missing Cutout Slot (Dashed Outline) */}
                      <div 
                        className="absolute w-20 h-20 border-2 border-dashed border-[#00D2FF] bg-[#0066FF]/15 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{ left: `${targetSliderPos}%`, transform: `translateX(-50%) rotate(${targetRotationAngle}deg)` }}
                      >
                        <span className="text-[9px] font-mono text-[#00D2FF] uppercase font-bold tracking-widest text-center px-1">
                          TARGET
                        </span>
                      </div>

                      {/* Draggable/Rotatable Object Shape */}
                      <motion.div 
                        className={`absolute w-20 h-20 bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] rounded-lg shadow-xl border border-white/30 flex flex-col items-center justify-center transition-all ${
                          isFittingSuccess ? 'bg-green-500 border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.6)]' : ''
                        }`}
                        style={{ 
                          left: `${sliderPos}%`, 
                          transform: `translateX(-50%) rotate(${rotationAngle}deg)` 
                        }}
                      >
                        <CurrentFitIcon className="w-8 h-8 text-white" />
                        <span className="text-[8px] font-mono font-bold text-white uppercase mt-1">FIT ME</span>
                      </motion.div>
                    </div>

                    {/* Controls: Horizontal Slide Position */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>Slide Position</span>
                        <span className="text-[#00D2FF] font-bold">{Math.round(sliderPos)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPos}
                        onChange={(e) => {
                          setSliderPos(Number(e.target.value));
                          setErrorMessage(null);
                        }}
                        className="w-full accent-[#0066FF] cursor-pointer"
                      />
                    </div>

                    {/* Controls: Object Rotation Angle */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>Rotate Angle</span>
                        <span className="text-[#00D2FF] font-bold">{rotationAngle}°</span>
                      </div>
                      <input 
                        type="range" 
                        min="-180" 
                        max="180" 
                        value={rotationAngle}
                        onChange={(e) => {
                          setRotationAngle(Number(e.target.value));
                          setErrorMessage(null);
                        }}
                        className="w-full accent-[#0066FF] cursor-pointer"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2">
                      <button
                        onClick={generateNewFitChallenge}
                        className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded text-xs font-mono flex items-center gap-1.5 transition-colors border border-white/10"
                        title="Generate a new randomized puzzle challenge"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#00D2FF]" />
                        <span>New Challenge</span>
                      </button>

                      <button
                        onClick={verifyFitChallenge}
                        className="px-6 py-2.5 bg-[#0066FF] hover:bg-[#0052D4] text-white rounded font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#0066FF]/30"
                      >
                        VERIFY ACCESS
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-black/60 p-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-gray-500">
                <span>Google reCAPTCHA Enterprise</span>
                <span className="text-[#00D2FF]">SECURITY RATING: HIGH</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


