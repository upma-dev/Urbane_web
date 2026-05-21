import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for the outer circle
  const springConfig = { damping: 30, stiffness: 280, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Only display on devices that support hover triggers (desktops/fine pointers)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Expand cursor on interactive elements
      const target = e.target as HTMLElement;
      if (
        !target ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        target.closest('select') ||
        target.closest('input')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring: Pure royal mix of Emerald and Golden Yellow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          border: isHovered
            ? '2px solid rgba(245, 158, 11, 0.9)' // Golden yellow border on hover
            : '1.5px solid rgba(16, 185, 129, 0.8)', // Emerald border standard
          backgroundColor: isHovered 
            ? 'rgba(16, 185, 129, 0.08)' // Light emerald inner glow
            : 'rgba(245, 158, 11, 0.03)', // Light golden glow
          boxShadow: isHovered 
            ? '0 0 16px rgba(245, 158, 11, 0.4), inset 0 0 10px rgba(16, 185, 129, 0.2)' 
            : '0 0 8px rgba(16, 185, 129, 0.2)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
        }}
      />

      {/* Inner Pin-Point: Royal Gold / Emerald Core */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-gradient-to-r from-amber-400 to-[#FAC638] shadow-[0_0_8px_#F59E0B]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          backgroundColor: isHovered ? '#10B981' : '#F59E0B', // Swaps gold/emerald on hover
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.25s',
        }}
      />
    </>
  );
}
