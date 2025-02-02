import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Car } from "lucide-react";

interface WinnerDisplayProps {
  theme: "bmw" | "gold";
  winnerName: string;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ theme, winnerName }) => {
  const [showWinner, setShowWinner] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setShowWinner(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1500);

    return () => clearInterval(countdownInterval);
  }, []);

  const getThemeStyles = () => {
    if (theme === "bmw") {
      return "bg-gradient-to-br from-bmw-primary via-blue-600 to-bmw-accent text-white shadow-xl";
    }
    return "bg-gradient-to-br from-gold-primary via-yellow-500 to-gold-secondary text-white shadow-xl";
  };

  const getThemeIcon = () => {
    if (theme === "bmw") {
      return <Car className="w-16 h-16 mb-4 text-white animate-bounce" />;
    }
    return <Trophy className="w-16 h-16 mb-4 text-gold-accent animate-bounce" />;
  };

  const containerVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const letterVariants = {
    animate: (i: number) => ({
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0.1,
        delay: i * 0.1,
        ease: "easeInOut"
      },
    }),
  };

  return (
    <div className="p-4 w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div 
        className={`relative w-full max-w-4xl rounded-2xl p-8 ${getThemeStyles()} 
          transform perspective-1000 hover:scale-105 transition-all duration-500
          before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl 
          before:backdrop-blur-sm before:opacity-20`}
      >
        {showWinner && (
          <Confetti
            width={width}
            height={height}
            colors={theme === "bmw" 
              ? ['#1E3A8A', '#3B82F6', '#93C5FD', '#FFFFFF'] 
              : ['#B45309', '#F59E0B', '#FCD34D', '#FFFFFF']}
            recycle={true}
            numberOfPieces={200}
          />
        )}
        
        <AnimatePresence mode="wait">
          {!showWinner && countdown > 0 && (
            <motion.div
              key={countdown}
              initial={{ scale: 0.1, opacity: 0, rotateX: -180 }}
              animate={{ 
                scale: [0.1, 1.5, 1],
                opacity: [0, 1, 1],
                rotateX: [-180, 0, 0],
                z: ["-100px", "100px", "0px"]
              }}
              exit={{ 
                scale: 0,
                opacity: 0,
                rotateX: 180,
                transition: { duration: 0.8 }
              }}
              transition={{ 
                duration: 1.2,
                times: [0, 0.6, 1],
                ease: "easeOut"
              }}
              className="fixed inset-0 flex items-center justify-center digital-number text-[30vw] font-bold text-center text-white"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {countdown}
            </motion.div>
          )}

          {showWinner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.2, 1],
                transition: {
                  duration: 0.5,
                  scale: {
                    times: [0, 0.5, 1],
                    duration: 0.8
                  }
                }
              }}
              className="relative z-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="flex justify-center"
              >
                {getThemeIcon()}
              </motion.div>

              <motion.div
                className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              >
                Congratulations!
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                animate="animate"
                className={`text-3xl md:text-5xl font-semibold mb-6 flex justify-center gap-2 ${
                  theme === "bmw"
                    ? "text-blue-200"
                    : "text-yellow-200"
                }`}
              >
                {winnerName.split('').map((letter, index) => (
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
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="text-xl md:text-3xl font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                You've Won a{" "}
                <span className={`font-bold ${
                  theme === "bmw" 
                    ? "text-blue-200" 
                    : "text-yellow-200"
                }`}>
                  {theme === "bmw" ? "Brand New BMW!" : "Golden Prize!"}
                </span>
              </motion.div>

              <motion.div
                className="mt-8 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className={`inline-block px-6 py-3 rounded-full 
                  ${theme === "bmw" 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-yellow-600 hover:bg-yellow-700"
                  } 
                  transition-colors duration-300 cursor-pointer
                  transform hover:scale-105 active:scale-95`}
                >
                  Claim Your Prize
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WinnerDisplay;
