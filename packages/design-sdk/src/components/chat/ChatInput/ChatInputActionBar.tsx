import React from 'react';
import { Plus, ArrowUp, StopCircle } from 'react-feather';
import { cn } from '../../../utils/cn';
import { Button } from '../../actions/Button/Button';

type ChatInputActionBarProps = {
  isDisabled?: boolean;
  isGenerating?: boolean;
  isSubmitDisabled: boolean;
  onUploadClick: () => void;
  onSubmit: () => void;
  onStop?: () => void;
};

const ChatInputActionBar = ({
  isDisabled,
  isGenerating,
  isSubmitDisabled,
  onUploadClick,
  onSubmit,
  onStop,
}: ChatInputActionBarProps): React.ReactElement => {
  return (
    <div className="fds-chat-input__action-bar">
      <button
        type="button"
        className={cn('fds-chat-input__attach-btn', 'BodySmallRegular')}
        onClick={onUploadClick}
        disabled={isDisabled}
        aria-label="Attach file"
      >
        <Plus size={14} aria-hidden />
        <span>Upload file</span>
      </button>

      <div>
        {isGenerating ? (
          <Button
            variant="Secondary"
            color="Primary"
            size="Small"
            iconOnly
            leadingIcon={<StopCircle size={14} />}
            aria-label="Stop generation"
            onClick={() => onStop?.()}
            isDisabled={isDisabled}
          />
        ) : (
          <Button
            variant="Primary"
            color="Primary"
            size="Small"
            iconOnly
            leadingIcon={<ArrowUp size={14} />}
            aria-label="Send message"
            onClick={onSubmit}
            isDisabled={isSubmitDisabled}
          />
        )}
      </div>
    </div>
  );
};

export { ChatInputActionBar };
