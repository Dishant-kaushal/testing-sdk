import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Search } from 'react-feather';
import { cn } from '../../../utils/cn';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { useDismissOnScrollOutside } from '../../../hooks/useDismissOnScrollOutside';
import { DropdownMenu } from '../../overlays/DropdownMenu/DropdownMenu';
import { ActionListItem } from '../../overlays/DropdownMenu/ActionListItem';
import { ActionListItemGroup } from '../../overlays/DropdownMenu/ActionListItemGroup';
import { TextInput } from '../TextInput/TextInput';
import {
  filterCountries,
  getCountryByIso,
  getCountryList,
  type CountryEntry,
  type CountryIso,
} from './countries';
import './CountrySelector.css';

const MENU_GAP = 4;
const MENU_MAX_HEIGHT = 360;

export interface CountrySelectorProps {
  country: CountryIso;
  onCountryChange: (country: CountryIso) => void;
  allowedCountries?: CountryIso[];
  showDialCode?: boolean;
  size?: 'Medium' | 'Large';
  isDisabled?: boolean;
}

export function CountrySelector({
  country,
  onCountryChange,
  allowedCountries,
  showDialCode = true,
  size = 'Medium',
  isDisabled = false,
}: CountrySelectorProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);

  const fullList = useMemo<CountryEntry[]>(() => {
    const all = getCountryList();
    if (!allowedCountries || allowedCountries.length === 0) return all;
    const allowed = new Set(allowedCountries);
    return all.filter((c) => allowed.has(c.iso));
  }, [allowedCountries]);

  const filtered = useMemo(
    () => filterCountries(fullList, query),
    [fullList, query],
  );

  const selected = getCountryByIso(country);

  useClickOutside(menuRef, (e) => {
    if (open && !triggerRef.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  });

  useKeyboard('Escape', () => setOpen(false), open);

  useDismissOnScrollOutside(menuRef, () => setOpen(false), open);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    const flipUp = spaceBelow < MENU_MAX_HEIGHT && r.top > spaceBelow;
    setMenuPos({
      top: flipUp ? r.top - MENU_GAP - MENU_MAX_HEIGHT : r.bottom + MENU_GAP,
      left: r.left,
    });
  }, [open]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const handleSelect = useCallback(
    (iso: CountryIso) => {
      onCountryChange(iso);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onCountryChange],
  );

  const handleTriggerClick = useCallback(() => {
    if (isDisabled) return;
    setOpen((o) => !o);
  }, [isDisabled]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          'fds-country-selector__trigger',
          size === 'Large' && 'fds-country-selector__trigger--size-large',
        )}
        onClick={handleTriggerClick}
        disabled={isDisabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={
          selected
            ? `Country: ${selected.name}, dial code ${selected.dialCode}`
            : 'Select country'
        }
      >
        <span className="fds-country-selector__flag" aria-hidden="true">
          {selected?.flagEmoji ?? '🌐'}
        </span>
        {showDialCode && selected && (
          <span className="fds-country-selector__dial-code BodyMediumRegular">
            {selected.dialCode}
          </span>
        )}
        <ChevronDown size={16} aria-hidden="true" className="fds-country-selector__chevron" />
      </button>

      {open && menuPos && typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            className="fds-country-selector__menu"
            style={{ top: menuPos.top, left: menuPos.left }}
          >
            <div className="fds-country-selector__search">
              <TextInput
                label="Search country"
                size="Medium"
                placeholder="Search country or code"
                icon={<Search size={16} />}
                value={query}
                onChange={({ value }) => setQuery(value)}
                autoFocus
                aria-label="Search country"
              />
            </div>
            <DropdownMenu className="fds-country-selector__dropdown">
              {filtered.length === 0 ? (
                <div className="fds-country-selector__empty BodyMediumRegular">
                  No countries found
                </div>
              ) : (
                <ActionListItemGroup>
                  {filtered.map((c) => (
                    <ActionListItem
                      key={c.iso}
                      title={c.name}
                      leadingIcon={
                        <span className="fds-country-selector__row-flag" aria-hidden="true">
                          {c.flagEmoji}
                        </span>
                      }
                      trailing={
                        <span className="fds-country-selector__row-dial-code BodyMediumRegular">
                          {c.dialCode}
                        </span>
                      }
                      selectionType="Single"
                      isSelected={c.iso === country}
                      onClick={() => handleSelect(c.iso)}
                    />
                  ))}
                </ActionListItemGroup>
              )}
            </DropdownMenu>
          </div>,
          document.body,
        )
      }
    </>
  );
}

CountrySelector.displayName = 'CountrySelector';
