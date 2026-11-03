import type { Localized } from "@/i18n/config";
import type { DishArt } from "./menu";

/**
 * Gallery tiles. Until real photos are added, each tile renders a designed poster panel.
 * To use a photo: put it in /public/images/gallery and set `image`.
 */
export interface GalleryItem {
  id: string;
  caption: Localized;
  hangul: string;
  image?: string;
  art: DishArt | "sign";
  tone: "red" | "ink" | "cream" | "amber";
  /** Spans two columns on wide screens. */
  wide?: boolean;
}

export const gallery: GalleryItem[] = [
  {
    id: "neon-sign",
    hangul: "한쿡",
    art: "sign",
    tone: "ink",
    wide: true,
    caption: { sk: "Neón na Obchodnej", en: "The neon on Obchodná", ko: "오브호드나 거리의 네온" },
  },
  {
    id: "jjigae",
    hangul: "김치찌개",
    art: "stew",
    tone: "red",
    caption: { sk: "Kimchi jjigae", en: "Kimchi jjigae", ko: "김치찌개" },
  },
  {
    id: "corndog",
    hangul: "핫도그",
    art: "corndog",
    tone: "amber",
    caption: { sk: "Chrumkavé corn dogy", en: "Crunchy corn dogs", ko: "바삭한 핫도그" },
  },
  {
    id: "tteok",
    hangul: "떡볶이",
    art: "tteok",
    tone: "cream",
    caption: { sk: "Tteokbokki", en: "Tteokbokki", ko: "떡볶이" },
  },
  {
    id: "chimaek",
    hangul: "치맥",
    art: "chicken",
    tone: "ink",
    wide: true,
    caption: { sk: "Chimaek — chicken & pivo", en: "Chimaek — chicken & beer", ko: "치맥 — 치킨과 맥주" },
  },
  {
    id: "ade",
    hangul: "에이드",
    art: "ade",
    tone: "red",
    caption: { sk: "Kórejské limonády", en: "Korean ades", ko: "에이드" },
  },
];
