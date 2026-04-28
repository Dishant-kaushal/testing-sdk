import type { HTMLAttributes } from 'react';
import { CheckCircle, X, Download, Eye } from 'react-feather';
import { cn } from '../../../utils/cn';
import { IconButton } from '../../actions/IconButton/IconButton';
import { Divider } from '../../layout/Divider/Divider';
import { ProgressBar } from '../../feedback/ProgressBar/ProgressBar';
import { FileThumbnail, type FileType } from './FileThumbnail';
import './UploadItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type UploadState = 'completed' | 'intermediary' | 'failed' | 'loading';

export interface UploadItemProps extends HTMLAttributes<HTMLDivElement> {
  /** File name to display */
  fileName: string;
  /** File size text (e.g. "1.3 MB") */
  fileSize: string;
  /** File type — drives the thumbnail icon */
  fileType?: FileType;
  /** Upload state */
  uploadState?: UploadState;
  /** Show download action on hover */
  showDownload?: boolean;
  /** Show preview/eye action on hover */
  showPreview?: boolean;
  /** Error message (failed state) */
  errorText?: string;
  /** Upload progress 0–100 (loading state) */
  progress?: number;
  /** Called when remove (X) is clicked */
  onRemove?: () => void;
  /** Called when download is clicked */
  onDownload?: () => void;
  /** Called when preview is clicked */
  onPreview?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   UploadItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function UploadItem({
  fileName,
  fileSize,
  fileType = 'xyz',
  uploadState = 'completed',
  showDownload = true,
  showPreview = true,
  errorText,
  progress = 0,
  onRemove,
  onDownload,
  onPreview,
  className,
  ...props
}: UploadItemProps) {
  const isFailed = uploadState === 'failed';
  const isLoading = uploadState === 'loading';
  const showHoverActions = !isFailed && !isLoading;

  return (
    <div
      className={cn(
        'fds-upload-item',
        isFailed && 'fds-upload-item--failed',
        isLoading && 'fds-upload-item--loading',
        className,
      )}
      {...props}
    >
      <div className="fds-upload-item__root">
        <div className={cn('fds-upload-item__body', (isFailed || isLoading) && 'fds-upload-item__body--top')}>
          {/* Thumbnail */}
          <FileThumbnail type={isFailed ? 'error' : fileType} />

          {/* File info */}
          <div className="fds-upload-item__info">
            <div className="fds-upload-item__name-group">
              <span className={cn('fds-upload-item__name BodyMediumMedium', (isFailed || isLoading) && 'fds-upload-item__name--wide')}>
                {isLoading ? `Uploading ${fileName} ...` : fileName}
              </span>
              {uploadState === 'completed' && (
                <CheckCircle size={14} className="fds-upload-item__status-icon" />
              )}
            </div>
            {isFailed ? (
              <span className="fds-upload-item__error BodySmallRegular">{errorText}</span>
            ) : (
              <span className="fds-upload-item__size BodySmallRegular">{fileSize}</span>
            )}
          </div>

          {/* Actions */}
          <div className="fds-upload-item__actions">
            {showHoverActions && (
              <div className="fds-upload-item__hover-actions">
                {showDownload && (
                  <>
                    <IconButton
                      icon={<Download size={16} />}
                      size="16"
                      onClick={onDownload}
                      aria-label="Download file"
                    />
                    <Divider orientation="Vertical" thickness="Thin" variant="Muted" className="fds-upload-item__divider" />
                  </>
                )}
                {showPreview && (
                  <>
                    <IconButton
                      icon={<Eye size={16} />}
                      size="16"
                      onClick={onPreview}
                      aria-label="Preview file"
                    />
                    <Divider orientation="Vertical" thickness="Thin" variant="Muted" className="fds-upload-item__divider" />
                  </>
                )}
              </div>
            )}

            <IconButton
              icon={<X size={16} />}
              size="16"
              onClick={onRemove}
              aria-label="Remove file"
            />
          </div>
        </div>

        {/* Progress bar — loading only */}
        {isLoading && (
          <ProgressBar
            size="Small"
            intent="None"
            value={progress}
            showPercentage={false}
            className="fds-upload-item__progress"
          />
        )}
      </div>
    </div>
  );
}

UploadItem.displayName = 'UploadItem';
