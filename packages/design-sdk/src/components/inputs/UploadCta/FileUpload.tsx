import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { InputFieldHeader, type InputFieldNecessityIndicator } from '../../forms/InputFieldHeader/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter/InputFieldFooter';
import { UploadCta } from './UploadCta';
import { UploadItem } from './UploadItem';
import type { FileType } from './FileThumbnail';
import type { UploadState } from './UploadItem';
import './FileUpload.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface UploadFile {
  id: string;
  name: string;
  size: string;
  type: FileType;
  state: UploadState;
  progress?: number;
  errorText?: string;
}

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Single file or multiple files */
  mode?: 'single' | 'multiple';
  /** Label above the upload area */
  label?: string;
  /** Required indicator */
  necessityIndicator?: InputFieldNecessityIndicator;
  /** Help text below upload area (validation=none) */
  helpText?: string;
  /** Error text below upload area (validation=error) */
  errorText?: string;
  /** Validation state */
  validationState?: 'none' | 'error';
  /** Disable the upload area */
  isDisabled?: boolean;
  /** Accepted file types (e.g. ".png,.jpg" or "image/*") */
  accept?: string;
  /** Current list of files */
  files?: UploadFile[];
  /** Called when new files are selected via click or drop */
  onFilesSelect?: (files: FileList) => void;
  /** Called when a file is removed */
  onRemove?: (id: string) => void;
  /** Called when download is clicked on a file */
  onDownload?: (id: string) => void;
  /** Called when preview is clicked on a file */
  onPreview?: (id: string) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FileUpload
   ═══════════════════════════════════════════════════════════════════════════ */

export function FileUpload({
  mode = 'single',
  label,
  necessityIndicator = 'none',
  helpText,
  errorText,
  validationState = 'none',
  isDisabled = false,
  accept,
  files = [],
  onFilesSelect,
  onRemove,
  onDownload,
  onPreview,
  className,
  ...props
}: FileUploadProps) {
  const isError = validationState === 'error';
  const footerText = isError ? errorText : helpText;

  // Single mode with file: hide CTA and footer (file replaces everything)
  // Multiple mode: always show CTA, footer shows when CTA is visible
  const showCta = !(mode === 'single' && files.length > 0);
  const showFooter = showCta && !!footerText;

  return (
    <div className={cn('fds-file-upload', className)} {...props}>
      {label && (
        <InputFieldHeader label={label} necessityIndicator={necessityIndicator} />
      )}

      {showCta && (
        <UploadCta
          isDisabled={isDisabled}
          accept={accept}
          multiple={mode === 'multiple'}
          onFilesSelect={onFilesSelect}
        />
      )}

      {showFooter && (
        <InputFieldFooter
          helpText={footerText}
          state={isError ? 'error' : 'default'}
        />
      )}

      {files.length > 0 && (
        <div className="fds-file-upload__list">
          {files.map((file) => (
            <UploadItem
              key={file.id}
              fileName={file.name}
              fileSize={file.size}
              fileType={file.type}
              uploadState={file.state}
              progress={file.progress}
              errorText={file.errorText}
              onRemove={() => onRemove?.(file.id)}
              onDownload={() => onDownload?.(file.id)}
              onPreview={() => onPreview?.(file.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

FileUpload.displayName = 'FileUpload';
