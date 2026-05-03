import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './ChatMessage.css';

type RollingTextProps = {
  texts: string[];
};

const SHIMMER_COLOR = 'rgba(255, 255, 255, 0.24)';
const CYCLE_MS = 3000;        // --global-delay-xlong
const SLIDE_DURATION = 0.36;  // --global-duration-xmoderate = 360ms
const SLIDE_EASE: [number, number, number, number] = [0.5, 0, 0, 1]; // --global-easing-emphasized
const SHIMMER_DURATION = 0.96; // --global-duration-2xgentle = 960ms
const SHIMMER_DELAY = 0.48;   // --global-delay-gentle = 480ms
const SHIMMER_EASE: [number, number, number, number] = [0.3, 0, 0.2, 1]; // --global-easing-standard

const RollingText = ({ texts }: RollingTextProps): React.ReactElement => {
  const [index, setIndex] = useState(0);
  const key = texts.join('\0');

  useEffect(() => {
    setIndex(0);
    if (texts.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  if (texts.length === 0) return <span />;
  if (texts.length === 1) return <span>{texts[0]}</span>;

  return (
    <span className="fds-chat-msg__rolling">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ y: 16, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: SLIDE_DURATION, ease: SLIDE_EASE } }}
          exit={{ y: -16, opacity: 0, filter: 'blur(4px)', position: 'absolute', transition: { duration: SLIDE_DURATION, ease: SLIDE_EASE } }}
        >
          <span className="fds-chat-msg__shimmer-wrap">
            {texts[index]}
            <motion.span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg, transparent 0%, ${SHIMMER_COLOR} 50%, transparent 100%)`,
                pointerEvents: 'none',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: SHIMMER_DURATION, ease: SHIMMER_EASE, repeat: Infinity, repeatDelay: SHIMMER_DELAY }}
            />
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export { RollingText };
