import { useRef, useState } from 'react';
import type { HTMLAttributes, DragEvent, ChangeEvent } from 'react';
import { cn } from '../../../utils/cn';
import { LinkButton } from '../../actions/LinkButton/LinkButton';
import './UploadCta.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface UploadCtaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Body text shown before the upload link */
  bodyText?: string;
  /** Upload link label */
  linkText?: string;
  /** Whether the component is disabled */
  isDisabled?: boolean;
  /** Accepted file types (e.g. ".png,.jpg" or "image/*") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Called when files are selected (via click or drop) */
  onFilesSelect?: (files: FileList) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   UploadCta
   ═══════════════════════════════════════════════════════════════════════════ */

export function UploadCta({
  bodyText = 'Drag files here or',
  linkText = 'Upload',
  isDisabled = false,
  accept,
  multiple = false,
  onFilesSelect,
  className,
  ...props
}: UploadCtaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClick = () => {
    if (!isDisabled) inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelect?.(e.target.files);
    }
    // Reset so the same file can be selected again
    e.target.value = '';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDisabled) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!isDisabled && e.dataTransfer.files.length > 0) {
      onFilesSelect?.(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={cn(
        'fds-upload-cta',
        isDragOver && 'fds-upload-cta--active',
        isDisabled && 'fds-upload-cta--disabled',
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      {...props}
    >
      <div
        className="fds-upload-cta__root"
        onClick={handleClick}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div className="fds-upload-cta__inner">
          <span className="fds-upload-cta__body BodyMediumRegular">{bodyText}</span>
          <LinkButton
            type="Anchor"
            color="Primary"
            size="Medium"
            label={linkText}
            isDisabled={isDisabled}
            className="fds-upload-cta__link"
          />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        hidden
        tabIndex={-1}
      />
    </div>
  );
}

UploadCta.displayName = 'UploadCta';
