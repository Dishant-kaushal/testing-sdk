import React from 'react';
import { cn } from '../../../utils/cn';

type SelfMessageBubbleProps = {
  children?: React.ReactNode;
  validationState?: 'error' | 'none';
  errorText?: string;
  isChildText: boolean;
};

const SelfMessageBubble = ({
  children,
  validationState = 'none',
  errorText = 'Message not sent. Tap to retry.',
  isChildText,
}: SelfMessageBubbleProps): React.ReactElement => {
  const isError = validationState === 'error';

  return (
    <div className="fds-chat-msg__self-bubble">
      <div
        className={cn(
          'fds-chat-msg__self-inner',
          isChildText && 'fds-chat-msg__self-inner--padded',
          isError && 'fds-chat-msg__self-inner--error',
        )}
      >
        {children}
      </div>
      {isError && (
        <span className="BodySmallRegular fds-chat-msg__error-hint">{errorText}</span>
      )}
    </div>
  );
};

export { SelfMessageBubble };
