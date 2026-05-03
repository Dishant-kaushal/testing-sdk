import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { Badge } from '../../data-display/Badge/Badge';

const SLIDE_DURATION = 0.28;
const SLIDE_EASE: [number, number, number, number] = [0.5, 0, 0, 1];

type ChatInputGhostSuggestionProps = {
  suggestions: string[];
  activeSuggestionIndex: number;
  isVisible: boolean;
};

const ChatInputGhostSuggestion = ({
  suggestions,
  activeSuggestionIndex,
  isVisible,
}: ChatInputGhostSuggestionProps): React.ReactElement | null => {
  if (!isVisible || suggestions.length === 0) return null;

  const text = suggestions[activeSuggestionIndex] ?? suggestions[0];

  return (
    <div className="fds-chat-input__ghost" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={activeSuggestionIndex}
          className={cn('fds-chat-input__ghost-text', 'BodyMediumRegular')}
          initial={{ y: 8, opacity: 0, filter: 'blur(2px)' }}
          animate={{
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: SLIDE_DURATION, ease: SLIDE_EASE },
          }}
          exit={{
            y: -8,
            opacity: 0,
            filter: 'blur(2px)',
            position: 'absolute',
            transition: { duration: SLIDE_DURATION, ease: SLIDE_EASE },
          }}
        >
          {text}
        </motion.span>
      </AnimatePresence>

      <Badge color="Neutral" size="Small">
        Tab
      </Badge>
    </div>
  );
};

export { ChatInputGhostSuggestion };
