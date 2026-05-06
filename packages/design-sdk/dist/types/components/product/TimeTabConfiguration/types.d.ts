export interface GTPPreset {
    id: string;
    label: string;
    x?: number;
    xPeriod?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
    calendarType?: 'today' | 'yesterday' | 'current_week' | 'previous_week' | 'current_month' | 'previous_month';
    isBuiltIn?: boolean;
    navigation?: string;
    xEvent?: string;
    y?: number;
    yPeriod?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
    yEvent?: string;
    periodicities?: string[];
}
export interface GTPShift {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    color: string;
}
export interface GTPCycleTimeConfig {
    identifier: 'start' | 'end';
    hour: string;
    minute: string;
    dayOfWeek: number | null;
    date: string;
    month: string;
    year: string;
}
export type GTPTimeType = 'fixed' | 'local' | 'global';
export interface GTPGlobalTimepicker {
    id: string;
    name: string;
}
export interface TimeTabUIConfig {
    timezone: string;
    timeType?: GTPTimeType;
    globalTimepickerId?: string;
    defaultDurationId: string;
    allDurations: GTPPreset[];
    defaultPeriodicity: 'minute' | 'hourly' | 'daily' | 'weekly' | 'monthly';
    disablePeriodicities?: boolean;
    comparisonMode?: boolean;
    disableTimeSelection?: boolean;
    futureDaysAllowed?: string;
    shifts?: GTPShift[];
    shiftAggregator?: string;
    cycleTime?: GTPCycleTimeConfig;
}
