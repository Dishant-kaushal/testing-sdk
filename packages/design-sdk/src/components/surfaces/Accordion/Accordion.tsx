import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type AccordionMode = 'single' | 'multiple';

export interface AccordionProps {
  /** Expand behaviour — 'single' closes others, 'multiple' keeps all open */
  mode?: AccordionMode;
  /** Initially expanded item keys */
  defaultExpandedKeys?: string[];
  /** Accordion item children */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Context
   ═══════════════════════════════════════════════════════════════════════════ */

interface AccordionContextValue {
  expandedKeys: Set<string>;
  toggleKey: (key: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  return useContext(AccordionContext);
}

/* ═══════════════════════════════════════════════════════════════════════════
   Accordion
   ═══════════════════════════════════════════════════════════════════════════ */

export function Accordion({
  mode = 'single',
  defaultExpandedKeys = [],
  children,
  className,
}: AccordionProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(defaultExpandedKeys),
  );

  const toggleKey = useCallback(
    (key: string) => {
      setExpandedKeys((prev) => {
        if (mode === 'single') {
          // If already open, close it; otherwise open only this one
          return prev.has(key) ? new Set() : new Set([key]);
        }
        // Multiple mode — toggle the key in the set
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return next;
      });
    },
    [mode],
  );

  return (
    <AccordionContext.Provider value={{ expandedKeys, toggleKey }}>
      <div className={className}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

Accordion.displayName = 'Accordion';
