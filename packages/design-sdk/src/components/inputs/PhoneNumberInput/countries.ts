import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from 'libphonenumber-js';

export type CountryIso = CountryCode;

export interface CountryEntry {
  iso: CountryIso;
  name: string;
  dialCode: string;
  flagEmoji: string;
}

export function isoToFlagEmoji(iso: string): string {
  if (!iso || iso.length !== 2) return '';
  const base = 0x1f1e6 - 'A'.charCodeAt(0);
  return String.fromCodePoint(
    iso.toUpperCase().charCodeAt(0) + base,
    iso.toUpperCase().charCodeAt(1) + base,
  );
}

let cachedList: CountryEntry[] | null = null;

export function getCountryList(): CountryEntry[] {
  if (cachedList) return cachedList;

  const names = new Intl.DisplayNames(['en'], { type: 'region' });

  const list: CountryEntry[] = getCountries().map((iso) => ({
    iso,
    name: names.of(iso) ?? iso,
    dialCode: `+${getCountryCallingCode(iso)}`,
    flagEmoji: isoToFlagEmoji(iso),
  }));

  list.sort((a, b) => a.name.localeCompare(b.name));
  cachedList = list;
  return list;
}

export function getCountryByIso(iso: CountryIso): CountryEntry | undefined {
  return getCountryList().find((c) => c.iso === iso);
}

export function filterCountries(
  list: CountryEntry[],
  query: string,
): CountryEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const qDigits = q.replace(/\D/g, '');
  return list.filter((c) => {
    if (c.name.toLowerCase().includes(q)) return true;
    if (c.iso.toLowerCase().includes(q)) return true;
    if (qDigits && c.dialCode.replace('+', '').includes(qDigits)) return true;
    return false;
  });
}
