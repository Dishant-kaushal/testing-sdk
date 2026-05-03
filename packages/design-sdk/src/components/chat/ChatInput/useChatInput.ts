import React from 'react';
import type { ChatInputProps, ChatInputFile, ChatInputFileList } from './types';

const CHAT_INPUT_MAX_HEIGHT = 200;  // px — mirrors Blade's chatInputMaxTextAreaHeight
const SUGGESTION_CYCLE_MS = 4000;   // ms — mirrors Blade's chatInputSuggestionCycleInterval

type UseChatInputOptions = Pick<
  ChatInputProps,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onSubmit'
  | 'isDisabled'
  | 'isGenerating'
  | 'onStop'
  | 'accept'
  | 'onFileChange'
  | 'suggestions'
  | 'onSuggestionAccept'
>;

type UseChatInputReturn = {
  textValue: string;
  files: ChatInputFileList;
  activeSuggestionIndex: number;
  hasText: boolean;
  hasFiles: boolean;
  isSubmitDisabled: boolean;
  showGhostSuggestion: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  handleUploadClick: () => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: (file: ChatInputFile) => void;
  handleInnerMouseDownCapture: (e: React.MouseEvent) => void;
};

function isFileAccepted(file: File, accept: string): boolean {
  const patterns = accept.split(',').map((s) => s.trim());
  return patterns.some((p) => {
    if (p.startsWith('.')) return file.name.toLowerCase().endsWith(p.toLowerCase());
    if (p.endsWith('/*')) return file.type.startsWith(p.slice(0, -2));
    return file.type === p;
  });
}

function useChatInput(
  {
    value: controlledValue,
    defaultValue,
    onChange,
    onSubmit,
    isDisabled,
    accept,
    onFileChange,
    suggestions,
    onSuggestionAccept,
  }: UseChatInputOptions,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
): UseChatInputReturn {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(forwardedRef, () => textareaRef.current!, []);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const textValue = isControlled ? (controlledValue ?? '') : internalValue;

  const setTextValue = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.({ value: next });
    },
    [isControlled, onChange],
  );

  const [files, setFiles] = React.useState<ChatInputFileList>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0);

  const hasText = textValue.trim().length > 0;
  const hasFiles = files.length > 0;
  const isSubmitDisabled = Boolean(isDisabled) || (!hasText && !hasFiles);
  const showGhostSuggestion = !hasText && Boolean(suggestions?.length);

  const adjustHeight = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, CHAT_INPUT_MAX_HEIGHT)}px`;
  }, []);

  React.useEffect(() => {
    adjustHeight();
  }, [textValue, adjustHeight]);

  React.useEffect(() => {
    if (!suggestions || suggestions.length <= 1 || !showGhostSuggestion) return;
    const id = setInterval(() => {
      setActiveSuggestionIndex((i) => (i + 1) % suggestions.length);
    }, SUGGESTION_CYCLE_MS);
    return () => clearInterval(id);
  }, [suggestions, showGhostSuggestion]);

  React.useEffect(() => {
    setActiveSuggestionIndex(0);
  }, [suggestions]);

  const handleSubmit = React.useCallback(() => {
    if (isSubmitDisabled) return;
    onSubmit?.({ value: textValue, files });
    setTextValue('');
    setFiles([]);
  }, [isSubmitDisabled, onSubmit, textValue, files, setTextValue]);

  const handleTextChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextValue(e.target.value);
    },
    [setTextValue],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
        return;
      }
      if (e.key === 'Tab' && showGhostSuggestion && suggestions?.length) {
        e.preventDefault();
        const current = suggestions[activeSuggestionIndex];
        setTextValue(current);
        onSuggestionAccept?.({ suggestion: current });
      }
    },
    [handleSubmit, showGhostSuggestion, suggestions, activeSuggestionIndex, setTextValue, onSuggestionAccept],
  );

  const handlePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const clipFiles = Array.from(e.clipboardData?.files ?? []) as ChatInputFileList;
      if (clipFiles.length === 0) return;
      e.preventDefault();
      for (const f of clipFiles) {
        if (!f.id) (f as ChatInputFile).id = `${Date.now()}${Math.floor(Math.random() * 1_000_000)}`;
      }
      const next = [...files, ...clipFiles] as ChatInputFileList;
      setFiles(next);
      onFileChange?.({ files: next });
    },
    [files, onFileChange],
  );

  const handleUploadClick = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = Array.from(e.target.files ?? []) as ChatInputFileList;
      const valid = accept ? input.filter((f) => isFileAccepted(f, accept)) : input;
      for (const f of valid) {
        if (!f.id) (f as ChatInputFile).id = `${Date.now()}${Math.floor(Math.random() * 1_000_000)}`;
      }
      if (valid.length > 0) {
        const next = [...files, ...valid] as ChatInputFileList;
        setFiles(next);
        onFileChange?.({ files: next });
      }
      e.target.value = '';
    },
    [accept, files, onFileChange],
  );

  const handleFileRemove = React.useCallback(
    (file: ChatInputFile) => {
      const next = files.filter((f) => f.id !== file.id) as ChatInputFileList;
      setFiles(next);
      onFileChange?.({ files: next });
    },
    [files, onFileChange],
  );

  const handleInnerMouseDownCapture = React.useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('textarea')) return;
    e.preventDefault();
  }, []);

  return {
    textValue,
    files,
    activeSuggestionIndex,
    hasText,
    hasFiles,
    isSubmitDisabled,
    showGhostSuggestion,
    textareaRef,
    fileInputRef,
    handleTextChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleUploadClick,
    handleFileInputChange,
    handleFileRemove,
    handleInnerMouseDownCapture,
  };
}

export { useChatInput };
