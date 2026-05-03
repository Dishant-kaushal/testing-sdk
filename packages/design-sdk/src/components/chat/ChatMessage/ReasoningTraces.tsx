import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { Rotate } from './Rotate';
import type { ReasoningTrace, ReasoningTracesProps } from './types';

// ── Motion constants (mapped from Faclon motion tokens) ──────────────────
const ROW_DURATION = 0.28;     // --global-duration-moderate = 280ms
const ROW_EASE: [number, number, number, number] = [0, 0, 0.2, 1]; // --global-easing-entrance
const SLIDE_DURATION = 0.36;   // --global-duration-xmoderate = 360ms
const SLIDE_EASE: [number, number, number, number] = [0.5, 0, 0, 1]; // --global-easing-emphasized
const COLLAPSE_DURATION = 0.36;
const SHIMMER_DURATION = 0.96; // --global-duration-2xgentle = 960ms
const SHIMMER_DELAY = 0.48;    // --global-delay-gentle = 480ms
const SHIMMER_EASE: [number, number, number, number] = [0.3, 0, 0.2, 1]; // --global-easing-standard

// ── SparkleIcon ──────────────────────────────────────────────────────────
const SparkleIcon = (): React.ReactElement => (
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
    <path
      d="M4.7169 8.67519C4.62025 8.93638 4.25084 8.93638 4.15419 8.67519L3.13296 5.91537C3.10258 5.83326 3.03784 5.76851 2.95572 5.73813L0.195898 4.7169C-0.0652872 4.62025 -0.0652871 4.25084 0.195899 4.15419L2.95572 3.13296C3.03784 3.10258 3.10258 3.03784 3.13297 2.95572L4.15419 0.1959C4.25084 -0.0652861 4.62026 -0.0652861 4.7169 0.195899L5.73813 2.95572C5.76851 3.03784 5.83326 3.10258 5.91537 3.13297L8.6752 4.15419C8.93638 4.25084 8.93638 4.62026 8.6752 4.7169L5.91537 5.73813C5.83326 5.76851 5.76851 5.83326 5.73813 5.91537L4.7169 8.67519Z"
      fill="currentColor"
    />
  </svg>
);

const ActiveStepIcon = (): React.ReactElement => (
  <span className="fds-chat-msg__sparkle">
    <Rotate animate>
      <SparkleIcon />
    </Rotate>
  </span>
);

type StepStatus = 'completed' | 'active' | 'pending';

const ChevronDown = (): React.ReactElement => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUp = (): React.ReactElement => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ShimmerOverlay = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }): React.ReactElement => {
  if (!isActive) return <>{children}</>;
  return (
    <span className="fds-chat-msg__shimmer-wrap">
      {children}
      <motion.span
        aria-hidden
        className="fds-chat-msg__shimmer"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: SHIMMER_DURATION, ease: SHIMMER_EASE, repeat: Infinity, repeatDelay: SHIMMER_DELAY }}
      />
    </span>
  );
};

const StepDot = ({ status }: { status: StepStatus }): React.ReactElement => (
  <span
    className={cn(
      'fds-chat-msg__trace-dot',
      status === 'completed' ? 'fds-chat-msg__trace-dot--completed' : 'fds-chat-msg__trace-dot--pending',
    )}
  />
);

const StepConnector = ({ fromStatus }: { fromStatus: StepStatus }): React.ReactElement => (
  <span
    className={cn(
      'fds-chat-msg__trace-connector',
      fromStatus === 'completed'
        ? 'fds-chat-msg__trace-connector--completed'
        : 'fds-chat-msg__trace-connector--pending',
    )}
  />
);

const TraceRow = ({ text, isLast, stepStatus }: { text: string; isLast: boolean; stepStatus: StepStatus }): React.ReactElement => (
  <div className="fds-chat-msg__trace-row">
    <div className="fds-chat-msg__trace-timeline">
      <div className="fds-chat-msg__trace-icon-cell">
        {stepStatus === 'active' ? <ActiveStepIcon /> : <StepDot status={stepStatus} />}
      </div>
      {!isLast && <StepConnector fromStatus={stepStatus} />}
    </div>
    <div
      className={cn(
        'fds-chat-msg__trace-text-col',
        isLast && 'fds-chat-msg__trace-text-col--last',
        stepStatus === 'pending' && 'fds-chat-msg__trace-text-col--pending',
      )}
    >
      <ShimmerOverlay isActive={stepStatus === 'active'}>
        <span className={cn('BodySmallRegular', 'fds-chat-msg__trace-text', stepStatus === 'active' && 'fds-chat-msg__trace-text--active')}>
          {text}
        </span>
      </ShimmerOverlay>
    </div>
  </div>
);

const ReasoningTraces = ({
  traces,
  status = 'loading',
  title = 'Explored',
  activeStepIndex,
}: ReasoningTracesProps): React.ReactElement => {
  const isUpfrontMode = activeStepIndex !== undefined;
  const [isExpanded, setIsExpanded] = useState(!isUpfrontMode);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (status === 'loading') setIsExpanded(true);
  }, [status]);

  useEffect(() => {
    if (status === 'complete') {
      const t = setTimeout(() => setIsExpanded(false), 600);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [status]);

  const getStepStatus = (index: number): StepStatus => {
    if (status === 'complete') return 'completed';
    if (activeStepIndex !== undefined) {
      if (index < activeStepIndex) return 'completed';
      if (index === activeStepIndex) return 'active';
      return 'pending';
    }
    return index < traces.length - 1 ? 'completed' : 'active';
  };

  const getLabel = (trace: ReasoningTrace, step: StepStatus): string =>
    step === 'completed' && trace.completedLabel ? trace.completedLabel : trace.label;

  return (
    <div className="fds-chat-msg__reasoning">
      {status === 'complete' && (
        <button
          type="button"
          className="fds-chat-msg__reasoning-header"
          onClick={() => setIsExpanded((p) => !p)}
        >
          <span className="BodyMediumRegular fds-chat-msg__reasoning-title">{title}</span>
          <span style={{ color: 'var(--text-gray-tertiary)', display: 'flex' }}>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>
      )}

      <motion.div
        className="fds-chat-msg__reasoning-body"
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: COLLAPSE_DURATION, ease: SLIDE_EASE }}
      >
        <div className="fds-chat-msg__reasoning-inner">
          {isUpfrontMode || !isLoading ? (
            traces.map((trace, i) => {
              const step = getStepStatus(i);
              return (
                <TraceRow key={trace.label} text={getLabel(trace, step)} isLast={i === traces.length - 1} stepStatus={step} />
              );
            })
          ) : (
            <>
              {traces.slice(0, -1).map((trace, i) => {
                const isJustCompleted = i === traces.length - 2;
                return (
                  <motion.div
                    key={trace.label}
                    initial={isJustCompleted ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: ROW_DURATION, ease: ROW_EASE }}
                  >
                    <TraceRow text={getLabel(trace, 'completed')} isLast={false} stepStatus="completed" />
                  </motion.div>
                );
              })}

              {traces.length > 0 && (
                <motion.div
                  key="active-row"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: ROW_DURATION, ease: ROW_EASE }}
                >
                  <div className="fds-chat-msg__trace-row">
                    <div className="fds-chat-msg__trace-timeline">
                      <div className="fds-chat-msg__trace-icon-cell">
                        <ActiveStepIcon />
                      </div>
                    </div>
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={traces.length}
                          initial={{ y: 12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -12, opacity: 0, position: 'absolute' }}
                          transition={{ duration: SLIDE_DURATION, ease: SLIDE_EASE }}
                        >
                          <ShimmerOverlay isActive>
                            <span className="BodySmallRegular fds-chat-msg__trace-text fds-chat-msg__trace-text--active">
                              {getLabel(traces[traces.length - 1], 'active')}
                            </span>
                          </ShimmerOverlay>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export { ReasoningTraces };
