import { useState, useEffect } from 'react';
import { Trophy, Stars, PartyPopper, Sparkles, Award, Crown } from 'lucide-react';

function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [drumrollCount, setDrumrollCount] = useState(0);
  const winnerName = "Sarah Johnson";

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAnimating) {
      interval = setInterval(() => {
        setDrumrollCount(prev => prev + 1);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleReveal = () => {
    if (!isRevealed && !isAnimating) {
      setIsAnimating(true);
      // Play drumroll animation for 2 seconds
      setTimeout(() => {
        setIsRevealed(true);
        setIsAnimating(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#1a1a2e] to-black flex items-center justify-center p-4 overflow-hidden">
      {/* Background sparkle effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-2xl text-center">
        {/* Floating background icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-20 text-yellow-500
                ${isRevealed ? 'animate-[float_3s_ease-in-out_infinite]' : 'opacity-0'}
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              {i % 3 === 0 ? <Stars className="w-6 h-6" /> : 
               i % 3 === 1 ? <PartyPopper className="w-6 h-6" /> :
               <Sparkles className="w-6 h-6" />}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Title */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 mb-2">
              Grand Prize Winner
            </h1>
            <p className="text-yellow-300/60 text-lg">Click to reveal our champion</p>
          </div>

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

          {/* Winner reveal section */}
          <div className={`
            mt-16 space-y-8
            transform transition-all duration-1200 ease-out
            ${isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
          `}>
            {isRevealed && (
              <>
                {/* Confetti effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-[confetti_2.5s_ease-in-out_forwards]"
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 0.5}s`,
                      }}
                    >
                      {i % 3 === 0 ? <Crown className="w-8 h-8 text-[#FFD700]" /> :
                       i % 3 === 1 ? <Award className="w-8 h-8 text-[#FFA500]" /> :
                       <Sparkles className="w-8 h-8 text-yellow-300" />}
                    </div>
                  ))}
                </div>

                {/* Winner name with decorative elements */}
                <div className="relative p-12 rounded-3xl backdrop-blur-sm bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-5 blur-3xl" />
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <Crown className="w-16 h-16 text-[#FFD700] animate-[bounce_2s_ease-in-out_infinite]" />
                    </div>
                    <div className="text-[#FFD700] text-5xl font-bold flex items-center justify-center gap-6 mb-6">
                      <span className="animate-[bounce_1s_ease-in-out_infinite] delay-100">✨</span>
                      <span className="font-serif bg-gradient-to-r from-[#FFD700] via-yellow-500 to-[#FFA500] text-transparent bg-clip-text">
                        {winnerName}
                      </span>
                      <span className="animate-[bounce_1s_ease-in-out_infinite] delay-300">✨</span>
                    </div>
                    <div className="flex justify-center gap-4 text-yellow-500/80">
                      <Trophy className="w-8 h-8" />
                      <Award className="w-8 h-8" />
                      <Stars className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                {/* Celebration text */}
                <div className="space-y-4">
                  <p className="text-yellow-300 text-2xl font-medium animate-pulse">
                    Congratulations!
                  </p>
                  <p className="text-yellow-300/60 text-lg">
                    Our grand champion has been crowned! 🎉
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;