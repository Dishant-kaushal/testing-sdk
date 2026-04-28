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
export declare function FileUpload({ mode, label, necessityIndicator, helpText, errorText, validationState, isDisabled, accept, files, onFilesSelect, onRemove, onDownload, onPreview, className, ...props }: FileUploadProps): import("react/jsx-runtime").JSX.Element;
export declare namespace FileUpload {
    var displayName: string;
}
