import React from 'react';
import { cn } from '../../../utils/cn';
import { Rotate } from './Rotate';
import { ReasoningTraces } from './ReasoningTraces';
import type { ReasoningTrace } from './types';

type DefaultMessageBubbleProps = {
  children?: React.ReactNode;
  leading?: React.ReactNode;
  isLoading?: boolean;
  footerActions?: React.ReactNode;
  isChildText: boolean;
  reasoningTraces?: ReasoningTrace[];
  reasoningStatus?: 'loading' | 'complete';
  reasoningTitle?: string;
  reasoningActiveStepIndex?: number;
};

const DefaultMessageBubble = ({
  children,
  leading,
  isLoading = false,
  footerActions,
  isChildText,
  reasoningTraces,
  reasoningStatus,
  reasoningTitle,
  reasoningActiveStepIndex,
}: DefaultMessageBubbleProps): React.ReactElement => {
  const hasTraces = reasoningTraces && reasoningTraces.length > 0;

  return (
    <div className="fds-chat-msg__other-grid">
      {/* Leading icon column */}
      <div className="fds-chat-msg__leading">
        <Rotate animate={isLoading}>{leading as React.ReactElement}</Rotate>
      </div>

      {/* Content column */}
      <div className={cn('fds-chat-msg__content', isChildText && 'fds-chat-msg__content-padded')}>
        {/* Loading text shown above traces while traces are still loading */}
        {hasTraces && reasoningStatus === 'loading' && isLoading && children}

        {hasTraces && (
          <ReasoningTraces
            traces={reasoningTraces}
            status={reasoningStatus}
            title={reasoningTitle}
            activeStepIndex={reasoningActiveStepIndex}
          />
        )}

        {/* Final content shown after reasoning completes */}
        {hasTraces && reasoningStatus === 'complete' && !isLoading && children}

        {/* No traces: show content normally */}
        {!hasTraces && children}
      </div>

      {footerActions && (
        <div className="fds-chat-msg__footer-actions">{footerActions}</div>
      )}
    </div>
  );
};

export { DefaultMessageBubble };
