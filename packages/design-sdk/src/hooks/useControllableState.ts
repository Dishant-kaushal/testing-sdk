import { useCallback, useRef, useState } from 'react';

/**
 * Bridges controlled (`value`) and uncontrolled (`defaultValue`) usage for a
 * single state slot. When `value` is provided the hook is a pass-through;
 * when it's `undefined` the hook keeps its own `useState`.
 *
 * Lock-in of the mode happens on first render — flipping between controlled
 * and uncontrolled after mount is not supported (same as React's own inputs).
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue?: T;
  onChange?: (next: T) => void;
}): [T | undefined, (next: T) => void] {
  const isControlledRef = useRef(value !== undefined);
  const [internal, setInternal] = useState<T | undefined>(defaultValue);

  const current = isControlledRef.current ? value : internal;

  const set = useCallback(
    (next: T) => {
      if (!isControlledRef.current) setInternal(next);
      onChange?.(next);
    },
    [onChange],
  );

  return [current, set];
}
