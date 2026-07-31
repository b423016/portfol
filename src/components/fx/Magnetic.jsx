import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Magnetic pull on hover — signature interaction from high-end portfolios
 * (bylinski / awwwards-style).
 */
export default function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * strength, y: y * strength });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 15, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
