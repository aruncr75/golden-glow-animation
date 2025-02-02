import { useEffect, useState } from 'react';

const Countdown = () => {
  const [count, setCount] = useState(10);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (count >= 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
        setKey(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  // Generate particles
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const tx = Math.cos(angle) * 100;
    const ty = Math.sin(angle) * 100;
    return (
      <div
        key={i}
        className="particle"
        style={{
          '--tx': `${tx}px`,
          '--ty': `${ty}px`,
          animationDelay: `${i * 0.1}s`,
        } as React.CSSProperties}
      />
    );
  });

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95 overflow-hidden">
      <div className="relative">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-orange-500/10 to-yellow-500/20 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/30 via-orange-500/10 to-transparent" />
        </div>

        {/* Decorative rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {rings}
        </div>

        {/* Particles */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {particles}
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
    </div>
  );
}

export default Countdown;
