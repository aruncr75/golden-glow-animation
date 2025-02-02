import { useEffect, useState } from "react";
import { Trophy, Stars, PartyPopper, Sparkles } from "lucide-react";

const Index = () => {
  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; top: number }>>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [drumrollCount, setDrumrollCount] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [count, setCount] = useState(10);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 4,
        left: Math.random() * 100,
        top: Math.random() * 100,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener("resize", generateParticles);

    return () => {
      window.removeEventListener("resize", generateParticles);
    };
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

  // Add countdown effect
  useEffect(() => {
    if (showCountdown && count >= 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
        setKey(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count < 0) {
      // Hide countdown and show winner
      setShowCountdown(false);
      setIsRevealed(true);
    }
  }, [count, showCountdown]);

  // Generate rings
  const rings = Array.from({ length: 3 }).map((_, i) => (
    <div
      key={i}
      className="ring"
      style={{
        width: `${300 + i * 60}px`,
        height: `${300 + i * 60}px`,
        animationDuration: `${4 + i}s`,
        animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
        opacity: 0.3 - i * 0.05,
        borderColor: i % 2 === 0 ? '#FFD700' : '#FFA500',
        boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 165, 0, 0.3)'}`,
      }}
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
        className="absolute inset-0 bg-gold-gradient bg-400% animate-gradient-shift opacity-75"
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

          {!showCountdown ? (
            <button
              onClick={handleReveal}
              disabled={isRevealed || isAnimating}
              aria-label="Reveal winner"
              className={`
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
              `}
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;