import type { GTPGlobalTimepicker, TimeTabUIConfig } from './types';
import './TimeTabConfiguration.css';
export interface TimeTabConfigurationProps {
    value?: Partial<TimeTabUIConfig>;
    onChange: (value: TimeTabUIConfig) => void;
    globalTimepickers?: GTPGlobalTimepicker[];
    /** When 'series', hides the Shift accordion and periodicity options. */
    mode?: string;
}
export declare function TimeTabConfiguration({ value, onChange, globalTimepickers, mode }: TimeTabConfigurationProps): import("react/jsx-runtime").JSX.Element;
