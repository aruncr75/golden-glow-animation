import { useEffect, useState } from "react";

const Index = () => {
  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; top: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background with hexagon pattern */}
      <div className="absolute inset-0 bg-hexagon-pattern opacity-20" />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gold-gradient bg-400% animate-gradient-shift opacity-40">
        {/* Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="gold-particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {/* Award Circle */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gold-medium border-8 border-gold-light flex items-center justify-center mb-8 animate-float">
          <div className="absolute inset-0 rounded-full animate-shimmer" />
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-black mb-2">GOLD WINNER</h1>
            <p className="text-lg md:text-xl text-black/80">2024</p>
          </div>
        </div>

        {/* Laurel Wreaths */}
        <div className="relative w-full max-w-md flex justify-between items-center mb-12">
          <div className="w-32 h-32 md:w-40 md:h-40 transform -scale-x-100">
            {/* Left Laurel */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-gold-light">
              <path
                d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40">
            {/* Right Laurel */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-gold-light">
              <path
                d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Podium */}
        <div className="relative w-full max-w-md h-32 flex justify-center items-end animate-podium-rise">
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gold-podium to-gold-light rounded-t-lg" />
          <div className="absolute bottom-0 w-3/4 h-16 bg-gradient-to-t from-gold-medium to-gold-podium rounded-t-lg" />
          <div className="absolute bottom-0 w-1/2 h-8 bg-gradient-to-t from-gold-dark to-gold-medium rounded-t-lg" />
        </div>
      </div>
    </div>
  );
};

export default Index;