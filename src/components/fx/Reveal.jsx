import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const reduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={prefersReduced ? reduced : variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({ children, className = '', stagger = 0.08 }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: prefersReduced ? 0 : stagger,
          },
        },
      }}
    >
      {React.Children.map(children, (child) =>
        child ? (
          <motion.div variants={prefersReduced ? reduced : variants}>{child}</motion.div>
        ) : null
      )}
    </motion.div>
  );
}

export default Reveal;
