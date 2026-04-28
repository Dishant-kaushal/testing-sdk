import type { HTMLAttributes } from 'react';
import './TimeInputFooter.css';
export interface TimeInputFooterProps extends HTMLAttributes<HTMLDivElement> {
    cancelLabel?: string;
    applyLabel?: string;
    isApplyDisabled?: boolean;
    onCancel?: () => void;
    onApply?: () => void;
}
export declare function TimeInputFooter({ cancelLabel, applyLabel, isApplyDisabled, onCancel, onApply, className, ...props }: TimeInputFooterProps): import("react/jsx-runtime").JSX.Element;
export declare namespace TimeInputFooter {
    var displayName: string;
}
