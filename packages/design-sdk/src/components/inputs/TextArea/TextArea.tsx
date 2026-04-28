import {
  forwardRef,
  useId,
  useState,
  useCallback,
  useRef,
  type FocusEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type TextareaHTMLAttributes,
} from 'react';
import { Tag } from '../../data-display/Tag/Tag';
import { InputFieldHeader } from '../../forms/InputFieldHeader/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter/InputFieldFooter';
import { cn } from '../../../utils/cn';
import './TextArea.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type TextAreaSize = 'Medium' | 'Large';
export type TextAreaMaxLines = 2 | 3 | 4 | 5;
export type TextAreaValidationState = 'none' | 'error';
export type TextAreaNecessityIndicator = 'optional' | 'required';

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onBlur' | 'onFocus'> {
  /** Label for the textarea */
  label: string;
  /** Size — Medium (14px text) or Large (16px text) */
  size?: TextAreaSize;
  /** Number of visible lines (controls field height) */
  maxLines?: TextAreaMaxLines;
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value (text mode) */
  value?: string;
  /** Default value for uncontrolled usage (text mode) */
  defaultValue?: string;
  /** Validation state */
  validationState?: TextAreaValidationState;
  /** Help text shown below the field */
  helpText?: string;
  /** Error text shown when validationState is 'error' */
  errorText?: string;
  /** Called when value changes (text mode) */
  onChange?: (meta: { name: string; value: string }) => void;
  /** Called when field receives focus */
  onFocus?: (meta: { name: string; value: string }) => void;
  /** Called when field loses focus */
  onBlur?: (meta: { name: string; value: string }) => void;
  /** Disables the textarea */
  isDisabled?: boolean;
  /** Marks the field as required */
  isRequired?: boolean;
  /** Indicator next to label */
  necessityIndicator?: TextAreaNecessityIndicator;
  /** Max character count (text mode) */
  maxCharacters?: number;

  /* —— Tags mode ————————————————————————————————————————————————————————— */

  /** Enable tags mode — Enter creates tag chips instead of new lines */
  isTagsMode?: boolean;
  /** Controlled tags (tags mode) */
  tags?: string[];
  /** Default tags for uncontrolled usage (tags mode) */
  defaultTags?: string[];
  /** Called when tags change (tags mode) */
  onTagsChange?: (tags: string[]) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TextArea
   ═══════════════════════════════════════════════════════════════════════════ */

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      size = 'Medium',
      maxLines = 2,
      placeholder,
      value,
      defaultValue,
      validationState = 'none',
      helpText,
      errorText,
      onChange,
      onFocus,
      onBlur,
      isDisabled = false,
      isRequired = false,
      necessityIndicator,
      maxCharacters,
      isTagsMode = false,
      tags: controlledTags,
      defaultTags,
      onTagsChange,
      className,
      id: idProp,
      name: nameProp,
      disabled,
      ...restProps
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const helpId = `${id}-help`;
    const fieldName = nameProp ?? '';
    const resolvedDisabled = isDisabled || disabled || false;
    const resolvedPlaceholder = placeholder ?? (isTagsMode ? 'Enter Description' : 'Enter value');
    const resolvedNecessity = necessityIndicator ?? (isRequired ? 'required' : undefined);

    /* —— Text mode state ————————————————————————————————————————————————— */
    const [hasBlurred, setHasBlurred] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    /* —— Tags mode state ————————————————————————————————————————————————— */
    const [internalTags, setInternalTags] = useState<string[]>(defaultTags ?? []);
    const [tagInput, setTagInput] = useState('');
    const tagInputRef = useRef<HTMLInputElement>(null);
    const isTagsControlled = controlledTags !== undefined;
    const currentTags = isTagsControlled ? controlledTags : internalTags;

    /* —— Derived state ——————————————————————————————————————————————————— */
    const isRequiredEmpty = (resolvedNecessity === 'required' || isRequired) && hasBlurred &&
      (isTagsMode ? currentTags.length === 0 : !currentValue);
    const hasError = validationState === 'error' || isRequiredEmpty;

    const resolvedFooterText = hasError
      ? (validationState === 'error' ? (errorText ?? 'Error') : (errorText ?? `${label} is required`))
      : (helpText ?? '');
    const resolvedFooterState: 'error' | 'default' = hasError ? 'error' : 'default';

    const charCount = currentValue.length;
    const counterText = maxCharacters !== undefined ? `${charCount}/${maxCharacters}` : '';
    const showFooter = !!resolvedFooterText || (!isTagsMode && maxCharacters !== undefined);

    const typographyClass = size === 'Large' ? 'BodyLargeRegular' : 'BodyMediumRegular';

    /* —— Text mode handlers —————————————————————————————————————————————— */
    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      if (maxCharacters !== undefined && val.length > maxCharacters) return;
      if (!isControlled) setInternalValue(val);
      onChange?.({ name: fieldName, value: val });
    }, [isControlled, fieldName, onChange, maxCharacters]);

    const handleBlur = useCallback((e: FocusEvent<HTMLTextAreaElement>) => {
      setHasBlurred(true);
      onBlur?.({ name: fieldName, value: e.target.value });
    }, [fieldName, onBlur]);

    const handleFocus = useCallback((e: FocusEvent<HTMLTextAreaElement>) => {
      onFocus?.({ name: fieldName, value: e.target.value });
    }, [fieldName, onFocus]);

    /* —— Tags mode handlers —————————————————————————————————————————————— */
    const addTag = useCallback((text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (currentTags.includes(trimmed)) return;
      const next = [...currentTags, trimmed];
      if (!isTagsControlled) setInternalTags(next);
      onTagsChange?.(next);
    }, [currentTags, isTagsControlled, onTagsChange]);

    const removeTag = useCallback((tagToRemove: string) => {
      const next = currentTags.filter((t) => t !== tagToRemove);
      if (!isTagsControlled) setInternalTags(next);
      onTagsChange?.(next);
    }, [currentTags, isTagsControlled, onTagsChange]);

    const handleTagInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addTag(tagInput);
        setTagInput('');
      }
      if (e.key === 'Backspace' && tagInput === '' && currentTags.length > 0) {
        removeTag(currentTags[currentTags.length - 1]);
      }
    }, [tagInput, addTag, removeTag, currentTags]);

    const handleTagInputBlur = useCallback(() => {
      setHasBlurred(true);
      if (tagInput.trim()) {
        addTag(tagInput);
        setTagInput('');
      }
    }, [tagInput, addTag]);

    /* —— Root classes ———————————————————————————————————————————————————— */
    const rootClasses = cn(
      'fds-textarea',
      `fds-textarea--size-${size.toLowerCase()}`,
      maxLines > 2 && `fds-textarea--lines-${maxLines}`,
      resolvedDisabled && 'fds-textarea--disabled',
      hasError && 'fds-textarea--error',
      isTagsMode && 'fds-textarea--tags',
      className,
    );

    return (
      <div className={rootClasses}>
        {/* —— Label ————————————————————————————————————————————————————— */}
        <InputFieldHeader
          label={resolvedNecessity === 'optional' ? `${label} (optional)` : label}
          necessityIndicator={resolvedNecessity === 'required' ? 'required' : 'none'}
          size={size}
          htmlFor={id}
        />

        {/* —— Field ————————————————————————————————————————————————————— */}
        <div className="fds-textarea__field-wrapper">
          <div
            className="fds-textarea__field"
            onClick={isTagsMode ? () => tagInputRef.current?.focus() : undefined}
          >
            {isTagsMode ? (
              /* —— Tags mode: chips + inline input ——————————————————————— */
              <>
                {currentTags.map((tag) => (
                  <Tag
                    key={tag}
                    id={tag}
                    label={tag}
                    size={size}
                    isDisabled={resolvedDisabled}
                    onDismiss={() => removeTag(tag)}
                  />
                ))}
                <input
                  ref={tagInputRef}
                  className={cn('fds-textarea__tag-input', typographyClass)}
                  id={id}
                  placeholder={currentTags.length === 0 ? resolvedPlaceholder : ''}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  onBlur={handleTagInputBlur}
                  disabled={resolvedDisabled}
                  aria-label={label}
                  aria-disabled={resolvedDisabled || undefined}
                />
              </>
            ) : (
              /* —— Normal textarea mode —————————————————————————————————— */
              <textarea
                ref={ref}
                className={cn('fds-textarea__input', typographyClass)}
                id={id}
                name={fieldName || undefined}
                placeholder={resolvedPlaceholder}
                value={isControlled ? value : undefined}
                defaultValue={!isControlled ? defaultValue : undefined}
                disabled={resolvedDisabled}
                required={resolvedNecessity === 'required' || isRequired || undefined}
                maxLength={maxCharacters}
                aria-label={label}
                aria-required={resolvedNecessity === 'required' || isRequired || undefined}
                aria-disabled={resolvedDisabled || undefined}
                aria-invalid={hasError || undefined}
                aria-describedby={showFooter ? helpId : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                {...restProps}
              />
            )}
          </div>
        </div>

        {/* —— Footer ————————————————————————————————————————————————————— */}
        {showFooter && (
          <InputFieldFooter
            helpText={resolvedFooterText || undefined}
            counterText={!isTagsMode && maxCharacters !== undefined ? counterText : undefined}
            state={resolvedFooterState}
            size={size}
            id={helpId}
          />
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
