import { useEffect, useState, CSSProperties } from "react";
import { Trophy, Stars, PartyPopper, Sparkles, Car } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { cn } from "@/lib/utils";
import { 
  generateParticles, 
  letterVariants, 
  containerVariants, 
  generateRings 
} from "@/lib/animation-utils";

const Index = () => {
  const [particles, setParticles] = useState(generateParticles(50));
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [drumrollCount, setDrumrollCount] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showWinnerCard, setShowWinnerCard] = useState(false);
  const [count, setCount] = useState(5);
  const [key, setKey] = useState(0);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const handleResize = () => setParticles(generateParticles(50));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAnimating) {
      interval = setInterval(() => {
        setDrumrollCount(prev => prev + 1);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Update countdown effect
  useEffect(() => {
    if (showCountdown && count >= 0) {
      const timer = setTimeout(() => {
        if (count === 0) {
          setShowWinnerCard(true);
          setShowCountdown(false);
        } else {
          setCount(count - 1);
          setKey(prev => prev + 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, showCountdown]);

  // Generate rings using utility
  const rings = generateRings(3).map((ring, i) => (
    <div
      key={i}
      className="ring"
      style={ring as CSSProperties}
    />
  ));

  const handleReveal = () => {
    if (!isRevealed && !isAnimating) {
      setIsAnimating(true);
      setShowCountdown(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black/90">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gold-primary via-yellow-500 to-gold-secondary animate-gradient-shift opacity-75"
        style={{ backgroundSize: "400% 400%" }}
      >
        {/* Brighter Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="gold-particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: Math.random() * 0.4 + 0.2, // Reduced opacity
              boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)' // Reduced glow
            }}
          />
        ))}
        {/* Shimmer effect */}
        <div className="shimmer-effect animate-shimmer opacity-75" />
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex items-center justify-center min-h-[50vh]">
          {/* Brighter Floating icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute text-yellow-400
                  ${isRevealed ? 'animate-[float_3s_ease-in-out_infinite]' : 'opacity-0'}
                `}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.4, // Increased from 0.2
                  filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))' // Added glow effect
                }}
              >
                {i % 3 === 0 ? <Stars className="w-6 h-6" /> : 
                 i % 3 === 1 ? <PartyPopper className="w-6 h-6" /> :
                 <Sparkles className="w-6 h-6" />}
              </div>
            ))}
          </div>

          {!showCountdown && !showWinnerCard ? (
            <button
              onClick={handleReveal}
              disabled={isRevealed || isAnimating}
              aria-label="Reveal winner"
              className={cn(`
                group relative min-w-[300px] min-h-[70px] px-12 py-5
                bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00]
                rounded-2xl text-white font-bold text-2xl
                transform transition-all duration-500
                hover:scale-105 active:scale-95 hover:rotate-1
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-4
                shadow-[0_0_30px_rgba(255,215,0,0.3)]
                hover:shadow-[0_0_50px_rgba(255,215,0,0.5)]
                overflow-hidden
              `)}
            >
              <Trophy className={`w-8 h-8 ${isAnimating ? 'animate-bounce' : ''}`} />
              <span className={`relative ${isAnimating ? 'animate-pulse' : ''}`}>
                {isAnimating ? (
                  <span className="inline-flex items-center">
                    Drumroll
                    <span className="w-16 text-left ml-1">
                      {'.'.repeat(drumrollCount % 4)}
                    </span>
                  </span>
                ) : (
                  'Reveal Winner'
                )}
              </span>
              
              {/* Interactive hover effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity transform skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
            </button>
          ) : showCountdown ? (
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {rings}
              </div>

              {/* Number display */}
              <div 
                key={key}
                className="text-[300px] font-bold leading-none number-animation relative z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.7))',
                  textShadow: `
                    2px 2px 4px #ffd700,
                    -2px -2px 4px #ffa500,
                    0 0 20px #ff8c00,
                    0 0 40px rgba(255, 215, 0, 0.3)
                  `
                }}>
                {count >= 0 ? count : ''}
              </div>
            </div>
          ) : (
            <div className="p-2 sm:p-4 w-full">
              <motion.div 
                className={`relative w-full max-w-4xl rounded-2xl p-4 sm:p-8 mx-auto
                  bg-gradient-to-br from-gold-primary via-yellow-500 to-gold-secondary
                  text-white shadow-xl
                  transform perspective-1000 hover:scale-105 transition-all duration-500
                  before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl 
                  before:backdrop-blur-sm before:opacity-20`}
                initial={{ 
                  scale: 0,
                  opacity: 0,
                  y: -50,
                  rotateX: -45
                }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  rotateX: 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.8
                }}
              >
                <Confetti
                  width={width * 0.5}
                  height={height}
                  colors={['#B45309', '#F59E0B', '#FCD34D', '#FFFFFF']}
                  recycle={true}
                  numberOfPieces={Math.min(200, Math.floor(width / 4))}
                />
                
                {/* Winner content */}
                <motion.div
                  className="relative z-10 text-center px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Trophy Icon */}
                  <motion.div className="flex justify-center">
                    <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-gold-accent animate-bounce" />
                  </motion.div>

                  {/* Congratulations Text */}
                  <motion.h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8">
                    Congratulations!
                  </motion.h2>

                  {/* Winner Name */}
                  <motion.div
                    variants={containerVariants}
                    animate="animate"
                    className="text-xl sm:text-3xl md:text-5xl font-semibold mb-4 sm:mb-6 flex flex-wrap justify-center gap-1 sm:gap-2 text-yellow-200"
                  >
                    {"Sarah Johnson".split('').map((letter, index) => (
                      <motion.span
                        key={index}
                        custom={index}
                        variants={letterVariants}
                        animate="animate"
                        style={{ 
                          display: 'inline-block',
                          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Prize Text */}
                  <motion.div className="text-lg sm:text-xl md:text-3xl">
                    You've Won a <span className="font-bold text-yellow-200">Golden Prize!</span>
                  </motion.div>

                  {/* Claim Button */}
                  <motion.div className="mt-6 sm:mt-8">
                    <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-yellow-600 hover:bg-yellow-700 
                      transition-colors duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base">
                      Claim Your Prize
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;