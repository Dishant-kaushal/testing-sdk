import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, X } from 'react-feather';
import { cn } from '../../../utils/cn';
import { IconButton } from '../../actions/IconButton/IconButton';
import { useChatInput } from './useChatInput';
import { ChatInputActionBar } from './ChatInputActionBar';
import { ChatInputGhostSuggestion } from './ChatInputGhostSuggestion';
import type { ChatInputProps } from './types';
import './ChatInput.css';

const ERROR_DURATION = 0.28;
const ERROR_EASE: [number, number, number, number] = [0.5, 0, 0, 1];
const FILE_PREVIEW_DURATION = 0.2;
const FILE_PREVIEW_EASE: [number, number, number, number] = [0.5, 0, 0, 1];

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onSubmit,
      placeholder = 'Ask a question...',
      isDisabled = false,
      isGenerating = false,
      onStop,
      accept,
      onFileChange,
      suggestions,
      onSuggestionAccept,
      validationState = 'none',
      errorText,
      onErrorDismiss,
      accessibilityLabel = 'Chat input',
      testID,
    },
    ref,
  ) => {
    const {
      textValue,
      files,
      activeSuggestionIndex,
      hasFiles,
      isSubmitDisabled,
      showGhostSuggestion,
      textareaRef,
      fileInputRef,
      handleTextChange,
      handleKeyDown,
      handlePaste,
      handleSubmit,
      handleUploadClick,
      handleFileInputChange,
      handleFileRemove,
      handleInnerMouseDownCapture,
    } = useChatInput(
      {
        value,
        defaultValue,
        onChange,
        onSubmit,
        isDisabled,
        isGenerating,
        onStop,
        accept,
        onFileChange,
        suggestions,
        onSuggestionAccept,
      },
      ref,
    );

    const isError = validationState === 'error';

    return (
      <div
        className={cn('fds-chat-input', isDisabled && 'fds-chat-input--disabled')}
        data-testid={testID}
      >
        {/* Hidden file input — outside card so mouseDownCapture doesn't intercept */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileInputChange}
          disabled={isDisabled}
          style={{ display: 'none' }}
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* Main card — z-index:1 keeps it above error strip */}
        <div
          className="fds-chat-input__card"
          onMouseDownCapture={handleInnerMouseDownCapture}
        >
          {/* File preview row — animated height 0→auto */}
          <AnimatePresence initial={false}>
            {hasFiles && (
              <motion.div
                key="file-preview"
                initial={{ height: 0, overflow: 'hidden' }}
                animate={{
                  height: 'auto',
                  overflow: 'hidden',
                  transition: { duration: FILE_PREVIEW_DURATION, ease: FILE_PREVIEW_EASE },
                }}
                exit={{
                  height: 0,
                  overflow: 'hidden',
                  transition: { duration: FILE_PREVIEW_DURATION, ease: FILE_PREVIEW_EASE },
                }}
              >
                <div className="fds-chat-input__files">
                  {files.map((file) => (
                    <div key={file.id ?? file.name} className="fds-chat-input__file-chip">
                      <span className={cn('fds-chat-input__file-chip-name', 'BodySmallRegular')}>
                        {file.name}
                      </span>
                      <IconButton
                        icon={<X size={12} />}
                        size="12"
                        onClick={() => handleFileRemove(file)}
                        aria-label={`Remove ${file.name}`}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Textarea row */}
          <div className="fds-chat-input__textarea-row">
            {showGhostSuggestion && suggestions && (
              <ChatInputGhostSuggestion
                suggestions={suggestions}
                activeSuggestionIndex={activeSuggestionIndex}
                isVisible={showGhostSuggestion}
              />
            )}

            <textarea
              ref={textareaRef}
              className={cn('fds-chat-input__textarea', 'BodyMediumRegular')}
              value={textValue}
              placeholder={showGhostSuggestion ? '' : placeholder}
              aria-label={accessibilityLabel}
              disabled={isDisabled}
              rows={1}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <ChatInputActionBar
            isDisabled={isDisabled}
            isGenerating={isGenerating}
            isSubmitDisabled={isSubmitDisabled}
            onUploadClick={handleUploadClick}
            onSubmit={handleSubmit}
            onStop={onStop}
          />
        </div>

        {/* Error strip — z-index:0, absolute, slides up from behind card top */}
        <div className="fds-chat-input__error-wrap">
          <AnimatePresence>
            {isError && (
              <motion.div
                key="error"
                className="fds-chat-input__error-strip"
                initial={{ opacity: 0, translateY: '100%' }}
                animate={{
                  opacity: 1,
                  translateY: '0%',
                  transition: { duration: ERROR_DURATION, ease: ERROR_EASE },
                }}
                exit={{
                  opacity: 0,
                  translateY: '100%',
                  transition: { duration: ERROR_DURATION, ease: ERROR_EASE },
                }}
                role="alert"
              >
                <span className="fds-chat-input__error-icon" aria-hidden>
                  <AlertCircle size={14} />
                </span>
                <span className={cn('fds-chat-input__error-text', 'BodySmallRegular')}>
                  {errorText}
                </span>
                {onErrorDismiss && (
                  <span className="fds-chat-input__error-dismiss">
                    <IconButton
                      icon={<X size={12} />}
                      size="12"
                      onClick={onErrorDismiss}
                      aria-label="Dismiss error"
                    />
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
);

ChatInput.displayName = 'ChatInput';

export { ChatInput };
