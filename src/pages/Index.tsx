import { useEffect, useState } from "react";

const Index = () => {
  const [stars] = useState(Array.from({ length: 11 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    rotation: (i * 360) / 11,
  })));

  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; top: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1, // Smaller particles
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
    <div className="relative min-h-screen overflow-hidden bg-stage-gradient">
      {/* Background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gold-light opacity-10"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Stars circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              transform: `rotate(${star.rotation}deg) translateY(-120px)`,
            }}
          >
            <div
              className="h-8 w-8 animate-star-spin text-gold-light"
              style={{
                animationDelay: `${star.delay}s`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="drop-shadow-[0_0_10px_rgba(255,215,0,0.7)]"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        ))}

        {/* Podium */}
        <div className="relative mt-32 animate-podium-rise">
          <div className="relative h-40 w-80">
            {/* Third level */}
            <div className="absolute bottom-0 left-1/2 h-10 w-80 -translate-x-1/2 rounded-t-lg bg-gold-podium opacity-90" />
            {/* Second level */}
            <div className="absolute bottom-8 left-1/2 h-10 w-64 -translate-x-1/2 rounded-t-lg bg-gold-podium opacity-95" />
            {/* Top level */}
            <div className="absolute bottom-16 left-1/2 h-10 w-48 -translate-x-1/2 rounded-t-lg bg-gold-podium shadow-lg" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gold-light mb-6 drop-shadow-lg">
            Welcome to Your Golden App
          </h1>
          <p className="text-xl md:text-2xl text-gold-light/90 max-w-2xl mx-auto drop-shadow-md">
            Start building your award-winning project here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;