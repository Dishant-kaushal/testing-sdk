import type { HTMLAttributes } from 'react';
import { type InputFieldNecessityIndicator } from '../../forms/InputFieldHeader/InputFieldHeader';
import type { FileType } from './FileThumbnail';
import type { UploadState } from './UploadItem';
import './FileUpload.css';
export interface UploadFile {
    id: string;
    name: string;
    size: string;
    type: FileType;
    state: UploadState;
    progress?: number;
    errorText?: string;
}
export type FileUploadType = 'single' | 'multiple';
export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Upload mode — `'single'` (one file replaces previous) or `'multiple'`. Default `'single'`. */
    uploadType?: FileUploadType;
    /** @deprecated Use `uploadType`. Kept for backwards compatibility. */
    mode?: FileUploadType;
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
    /** Maximum size of each file in bytes. Files exceeding this are blocked at selection time. */
    maxSize?: number;
    /** Maximum number of files allowed (multiple mode). Files beyond this are blocked at selection time. */
    maxCount?: number;
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
    /** Called when a failed file's retry / re-upload action is clicked */
    onReupload?: (id: string) => void;
}
export declare function FileUpload({ uploadType, mode, label, necessityIndicator, helpText, errorText, validationState, isDisabled, accept, maxSize, maxCount, files, onFilesSelect, onRemove, onDownload, onPreview, onReupload, className, ...props }: FileUploadProps): import("react/jsx-runtime").JSX.Element;
export declare namespace FileUpload {
    var displayName: string;
}
