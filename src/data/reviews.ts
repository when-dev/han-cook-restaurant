import type { Localized } from "@/i18n/config";

/**
 * Review cards. These are SAMPLE entries for the proposal (`sample: true` shows a small
 * "sample" label in the section). Replace with real Google reviews — quote them verbatim,
 * keep the original language in `text` for all locales if no translation is wanted —
 * or wire this up to the Google Places API later.
 */
export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: Localized;
  /** Dish the review mentions — rendered as a small chip. */
  dish?: string;
  source: "google";
  sample?: boolean;
}

export const reviews: Review[] = [
  {
    id: "r1",
    author: "M. K.",
    rating: 5,
    dish: "Kimchi Jjigae",
    source: "google",
    sample: true,
    text: {
      sk: "Kimchi jjigae chutí presne ako v Soule. Poctivá porcia, rýchla obsluha a príjemná atmosféra.",
      en: "The kimchi jjigae tastes exactly like in Seoul. Honest portion, quick service and a great vibe.",
      ko: "김치찌개가 서울에서 먹던 맛 그대로예요. 양도 넉넉하고 서비스도 빨라요.",
    },
  },
  {
    id: "r2",
    author: "L. S.",
    rating: 5,
    dish: "Crunchy Corndog",
    source: "google",
    sample: true,
    text: {
      sk: "Najlepší corn dog v Bratislave. Chrumkavý, so syrom, ktorý sa naťahuje — vraciame sa každý týždeň.",
      en: "Best corn dog in Bratislava. Crunchy, with proper cheese pull — we come back every week.",
      ko: "브라티슬라바 최고의 핫도그! 바삭하고 치즈가 쭉 늘어나요. 매주 와요.",
    },
  },
  {
    id: "r3",
    author: "J. P.",
    rating: 5,
    dish: "Rose Tteokbokki",
    source: "google",
    sample: true,
    text: {
      sk: "Rose tteokbokki je návykové. Skvelé miesto na rýchly obed v centre, ceny férové.",
      en: "The rose tteokbokki is addictive. A great spot for a quick lunch in the centre, fair prices.",
      ko: "로제 떡볶이 중독돼요. 시내에서 점심 먹기 딱 좋고 가격도 착해요.",
    },
  },
  {
    id: "r4",
    author: "A. H.",
    rating: 4,
    dish: "Yangnyeom Chicken",
    source: "google",
    sample: true,
    text: {
      sk: "Yangnyeom chicken s pivom — dokonalý piatkový večer. Neónový interiér má super atmosféru.",
      en: "Yangnyeom chicken with a beer — the perfect Friday night. Love the neon interior.",
      ko: "양념치킨에 맥주 한 잔, 완벽한 금요일 밤. 네온 인테리어 분위기 최고예요.",
    },
  },
];
