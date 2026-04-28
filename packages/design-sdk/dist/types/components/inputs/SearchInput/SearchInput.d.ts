import { type ReactNode, type HTMLAttributes } from 'react';
import { type SelectInputTag } from '../SelectInput/MultiSelectField';
import './SearchInput.css';
export type SearchInputType = 'single' | 'multiple' | 'multiple-flex';
export type SearchInputTag = SelectInputTag;
export interface SearchInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'onFocus' | 'onBlur' | 'onSubmit'> {
    type?: SearchInputType;
    label: string;
    name?: string;
    placeholder?: string;
    inputValue?: string;
    onInputChange?: (value: string) => void;
    helpText?: string;
    errorText?: string;
    validationState?: 'none' | 'error';
    isDisabled?: boolean;
    isRequired?: boolean;
    /** Controlled open state. Omit for uncontrolled (opens on focus, closes on outside click/Escape). */
    isOpen?: boolean;
    /** Called when the component wants to change open state. */
    onOpenChange?: (open: boolean) => void;
    icon?: ReactNode;
    prefix?: string;
    children?: ReactNode;
    onFocus?: () => void;
    onBlur?: () => void;
    tags?: SearchInputTag[];
    maxVisibleTags?: number;
    onBackspace?: () => void;
    onSubmit?: (value: string) => void;
    noResultsText?: string;
}
export declare const SearchInput: import("react").ForwardRefExoticComponent<SearchInputProps & import("react").RefAttributes<HTMLInputElement>>;
