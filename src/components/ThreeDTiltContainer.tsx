import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import React, { useRef } from 'react';

interface ThreeDTiltContainerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
  id?: string;
  key?: React.Key;
}

export default function ThreeDTiltContainer({ children, className = '', intensity = 15, glow = true, id }: ThreeDTiltContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coords relative to container
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const springX = useSpring(x, { stiffness: 150, damping: 25 });
  const springY = useSpring(y, { stiffness: 150, damping: 25 });

  // Transforms to tilt degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);

  // Glow position interpolation
  const glowX = useTransform(springX, [-0.5, 0.5], ['0px', '100%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['0px', '100%']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates (-0.5 to 0.5)
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      id={id}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {glow && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-inherit opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(180px circle at ${glowX} ${glowY}, rgba(16, 185, 129, 0.12), transparent 70%)`,
          }}
        />
      )}
      <div className="w-full h-full preserve-3d">
        {children}
      </div>
    </motion.div>
  );
}
