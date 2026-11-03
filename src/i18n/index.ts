import en from "./dictionaries/en";
import ko from "./dictionaries/ko";
import sk, { type Dictionary } from "./dictionaries/sk";
import type { Locale } from "./config";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { sk, en, ko };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
