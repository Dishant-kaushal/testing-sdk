import React from 'react';
import { cn } from '../../../utils/cn';
import { SelfMessageBubble } from './SelfMessageBubble';
import { DefaultMessageBubble } from './DefaultMessageBubble';
import { ThumbnailPreview } from './ThumbnailPreview';
import { RollingText } from './RollingText';
import type { ChatMessageProps } from './types';
import './ChatMessage.css';

const ChatMessage = React.forwardRef<HTMLElement, ChatMessageProps>(
  (
    {
      senderType = 'self',
      isLoading = false,
      validationState = 'none',
      errorText,
      onClick,
      footerActions,
      children,
      leading,
      loadingText,
      wordBreak = 'break-word',
      maxWidth,
      thumbnails,
      onThumbnailClick,
      reasoningTraces,
      reasoningStatus,
      reasoningTitle,
      reasoningActiveStepIndex,
      testID,
    },
    ref,
  ) => {
    const shouldWrapInText =
      typeof children === 'string' ||
      (Array.isArray(children) && children.every((c) => typeof c === 'string')) ||
      isLoading;

    const loadingContent =
      isLoading && Array.isArray(loadingText) ? (
        <RollingText texts={loadingText} />
      ) : (
        loadingText
      );

    const textColorClass = isLoading
      ? Array.isArray(loadingText)
        ? senderType === 'other' ? 'fds-chat-msg__other-text--loading-array' : ''
        : senderType === 'other' ? 'fds-chat-msg__other-text--loading-str' : ''
      : senderType === 'other'
        ? 'fds-chat-msg__other-text--normal'
        : '';

    const finalChildren = shouldWrapInText ? (
      <span
        className={cn(
          'BodyMediumRegular',
          senderType === 'self' ? 'fds-chat-msg__self-text' : 'fds-chat-msg__other-text',
          validationState === 'error' && 'fds-chat-msg__self-text--error',
          textColorClass,
        )}
        style={{ wordBreak }}
      >
        {isLoading ? loadingContent : (children as string)}
      </span>
    ) : (
      (children as React.ReactElement)
    );

    const bubble =
      senderType === 'self' ? (
        <SelfMessageBubble
          validationState={validationState}
          errorText={errorText}
          isChildText={shouldWrapInText}
        >
          {finalChildren}
        </SelfMessageBubble>
      ) : (
        <DefaultMessageBubble
          leading={leading}
          isLoading={isLoading}
          footerActions={footerActions}
          isChildText={shouldWrapInText}
          reasoningTraces={reasoningTraces}
          reasoningStatus={reasoningStatus}
          reasoningTitle={reasoningTitle}
          reasoningActiveStepIndex={reasoningActiveStepIndex}
        >
          {finalChildren}
        </DefaultMessageBubble>
      );

    const thumbnailAlign =
      senderType === 'self'
        ? 'fds-chat-msg__thumbnail-align-end'
        : 'fds-chat-msg__thumbnail-align-start';

    const Tag = onClick ? 'button' : 'div';

    return (
      <div className="fds-chat-msg" style={{ maxWidth }} data-testid={testID}>
        {thumbnails && thumbnails.length > 0 && (
          <div className={thumbnailAlign}>
            <ThumbnailPreview thumbnails={thumbnails} onThumbnailClick={onThumbnailClick} />
          </div>
        )}
        <Tag
          ref={ref as React.Ref<HTMLDivElement & HTMLButtonElement>}
          className={cn(onClick && 'fds-chat-msg--clickable')}
          onClick={onClick}
          {...(Tag === 'button' ? { type: 'button' as const } : {})}
        >
          {bubble}
        </Tag>
      </div>
    );
  },
);

ChatMessage.displayName = 'ChatMessage';

export { ChatMessage };
