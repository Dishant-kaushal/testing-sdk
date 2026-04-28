import type { HTMLAttributes } from 'react';
import './TimeInputPopover.css';
export type TimeInputMeridiem = 'AM' | 'PM';
export interface TimeInputPopoverProps extends HTMLAttributes<HTMLDivElement> {
    /** 12-hour mode shows the meridiem column; 24-hour hides it */
    hourFormat: '12' | '24';
    /** Draft hour items (display strings) */
    hourItems: readonly string[];
    /** Draft minute items (display strings) */
    minuteItems: readonly string[];
    /** Selected hour index */
    hourIndex: number;
    /** Selected minute index */
    minuteIndex: number;
    /** Selected meridiem (ignored when hourFormat === '24') */
    meridiem: TimeInputMeridiem;
    /** Called when the user picks an hour */
    onHourChange: (index: number) => void;
    /** Called when the user picks a minute */
    onMinuteChange: (index: number) => void;
    /** Called when the user picks a meridiem */
    onMeridiemChange: (meridiem: TimeInputMeridiem) => void;
    /** Show the Cancel / Apply footer */
    showFooter?: boolean;
    /** Apply button label */
    applyLabel?: string;
    /** Cancel button label */
    cancelLabel?: string;
    /** Disable the Apply button */
    isApplyDisabled?: boolean;
    /** Called when Cancel is pressed */
    onCancel?: () => void;
    /** Called when Apply is pressed */
    onApply?: () => void;
}
export declare function TimeInputPopover({ hourFormat, hourItems, minuteItems, hourIndex, minuteIndex, meridiem, onHourChange, onMinuteChange, onMeridiemChange, showFooter, applyLabel, cancelLabel, isApplyDisabled, onCancel, onApply, className, ...props }: TimeInputPopoverProps): import("react/jsx-runtime").JSX.Element;
export declare namespace TimeInputPopover {
    var displayName: string;
}
