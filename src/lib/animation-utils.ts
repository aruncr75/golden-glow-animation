import { CSSProperties } from 'react';

export const generateParticles = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.4 + 0.2,
  }));
};

export const letterVariants = {
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

export const containerVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

type RingStyle = {
  width: number;
  height: number;
  animationDuration: string;
  animationDirection: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  opacity: number;
  borderColor: string;
  boxShadow: string;
};

export const generateRings = (length: number): RingStyle[] => {
  return Array.from({ length }).map((_, i) => ({
    width: 300 + i * 60,
    height: 300 + i * 60,
    animationDuration: `${4 + i}s`,
    animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
    opacity: 0.3 - i * 0.05,
    borderColor: i % 2 === 0 ? '#FFD700' : '#FFA500',
    boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 165, 0, 0.3)'}`,
  }));
};
