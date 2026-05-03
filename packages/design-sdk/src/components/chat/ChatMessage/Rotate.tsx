import React from 'react';
import { motion } from 'framer-motion';

type RotateProps = {
  children: React.ReactElement;
  animate?: boolean;
};

const Rotate = ({ children, animate }: RotateProps): React.ReactElement => {
  if (!animate) return children;

  return (
    <motion.div
      style={{ display: 'flex' }}
      animate={{ rotate: [0, 90] }}
      transition={{
        duration: 0.48,          // --global-duration-gentle = 480ms
        repeat: Infinity,
        ease: [0.5, 0, 0, 1],    // --global-easing-emphasized
        repeatDelay: 0.48,       // --global-delay-gentle = 480ms (pause between cycles)
      }}
    >
      {children}
    </motion.div>
  );
};

export { Rotate };
