import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 28 });
  const sy = useSpring(y, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    document.body.classList.add('has-custom-cursor');
    setVisible(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const t = e.target;
      if (t.closest('a, button, [data-cursor="hover"]')) setHovering(true);
      else setHovering(false);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border border-white bg-white/10"
          animate={{
            width: hovering ? 48 : 14,
            height: hovering ? 48 : 14,
            opacity: hovering ? 0.9 : 0.7,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </>
  );
}
