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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-gold-gradient bg-400% animate-gradient-shift"
        style={{ backgroundSize: "400% 400%" }}
      >
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
        {/* Shimmer effect */}
        <div className="shimmer-effect animate-shimmer" />
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to Your Golden App
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Start building your award-winning project here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;