import type { Localized } from "@/i18n/config";

/**
 * HanCook menu — initial dataset built only from the dishes visible on the restaurant's
 * menu boards. To add a dish, append an object to `menuItems`; to show a photo, drop the
 * file into /public/images/dishes and set `image`. Prices are in EUR.
 *
 * TODO(owner): confirm every price against the current menu board before going live.
 */

export const categoryIds = [
  "soups",
  "cupbab",
  "corndog",
  "tteokbokki",
  "chicken",
  "snacks",
  "drinks",
  "alcohol",
] as const;
export type CategoryId = (typeof categoryIds)[number];

export type MenuTag = "bestseller" | "new" | "vegetarian";

/** Picks the illustration used until a real photo is added. */
export type DishArt =
  | "stew"
  | "cup"
  | "corndog"
  | "tteok"
  | "chicken"
  | "dumpling"
  | "roll"
  | "can"
  | "ade"
  | "coffee"
  | "beer"
  | "soju";

export interface MenuItem {
  id: string;
  category: CategoryId;
  /** Romanised Korean name, used as the headline in SK/EN. */
  romanized: string;
  /** Name per language — `ko` is the Hangul name. */
  name: Localized;
  description: Localized;
  price: number;
  /** Optional delivery-platform price if it differs from dine-in. */
  deliveryPrice?: number;
  /** e.g. "/images/dishes/kimchi-jjigae.jpg" */
  image?: string;
  /** 0 = not spicy … 3 = very spicy */
  spicy?: 0 | 1 | 2 | 3;
  tags?: MenuTag[];
  /** Highlighted in the Signature section. */
  signature?: boolean;
  art: DishArt;
}

export const categoryLabels: Record<CategoryId, Localized & { hangul: string }> = {
  soups: { sk: "Polievky", en: "Soups", ko: "찌개", hangul: "찌개" },
  cupbab: { sk: "Cup-Bab", en: "Cup-Bab", ko: "컵밥", hangul: "컵밥" },
  corndog: { sk: "Corn dog", en: "Corn dog", ko: "핫도그", hangul: "핫도그" },
  tteokbokki: { sk: "Tteokbokki", en: "Tteokbokki", ko: "떡볶이", hangul: "떡볶이" },
  chicken: { sk: "Vyprážané kura", en: "Fried chicken", ko: "치킨", hangul: "치킨" },
  snacks: { sk: "Snacky", en: "Snacks", ko: "분식", hangul: "분식" },
  drinks: { sk: "Nápoje", en: "Drinks", ko: "음료", hangul: "음료" },
  alcohol: { sk: "Pivo & Soju", en: "Beer & Soju", ko: "주류", hangul: "주류" },
};

export const menuItems: MenuItem[] = [
  // ── Soups ────────────────────────────────────────────────
  {
    id: "kimchi-jjigae",
    category: "soups",
    romanized: "Kimchi Jjigae",
    name: { sk: "Kimchi guláš", en: "Kimchi stew", ko: "김치찌개" },
    description: {
      sk: "Bublajúci guláš z vyzretého kimchi s bravčovým, tofu a jarnou cibuľkou. Podávame s ryžou.",
      en: "Bubbling stew of aged kimchi with pork, tofu and spring onion. Served with rice.",
      ko: "잘 익은 김치에 돼지고기, 두부, 대파를 넣고 보글보글 끓인 찌개. 공기밥과 함께 제공됩니다.",
    },
    price: 10.9,
    spicy: 2,
    tags: ["bestseller"],
    signature: true,
    art: "stew",
  },

  // ── Cup-Bab ──────────────────────────────────────────────
  {
    id: "jeyuk-cupbab",
    category: "cupbab",
    romanized: "Jeyuk Cup-Bab",
    name: { sk: "Pikantné bravčové na ryži", en: "Spicy pork rice cup", ko: "제육 컵밥" },
    description: {
      sk: "Bravčové marinované v gochujang pálivej paste, opečené s cibuľou, na ryži s vajíčkom.",
      en: "Pork marinated in gochujang chilli paste, stir-fried with onion, over rice with egg.",
      ko: "고추장 양념에 재운 돼지고기를 양파와 함께 볶아 밥과 계란 위에 올렸습니다.",
    },
    price: 9.5,
    spicy: 2,
    tags: ["bestseller"],
    signature: true,
    art: "cup",
  },
  {
    id: "bulgogi-cupbab",
    category: "cupbab",
    romanized: "Bulgogi Cup-Bab",
    name: { sk: "Bulgogi hovädzie na ryži", en: "Bulgogi beef rice cup", ko: "불고기 컵밥" },
    description: {
      sk: "Tenké plátky hovädzieho v sladkej sójovo-cesnakovej marináde, na ryži so zeleninou.",
      en: "Thin-sliced beef in a sweet soy and garlic marinade, over rice with vegetables.",
      ko: "달콤한 간장 마늘 양념의 얇은 소불고기를 채소와 함께 밥 위에 올렸습니다.",
    },
    price: 9.9,
    spicy: 0,
    art: "cup",
  },
  {
    id: "bibim-cupbab",
    category: "cupbab",
    romanized: "Bibim Cup-Bab",
    name: { sk: "Bibimbap v pohári", en: "Bibimbap rice cup", ko: "비빔 컵밥" },
    description: {
      sk: "Ryža s pestrou zeleninou, vajíčkom a gochujang omáčkou — pred jedlím poriadne premiešaj.",
      en: "Rice with colourful vegetables, egg and gochujang sauce — mix it all up before eating.",
      ko: "알록달록한 나물과 계란, 고추장 소스를 올린 밥. 잘 비벼서 드세요.",
    },
    price: 8.9,
    spicy: 1,
    art: "cup",
  },
  {
    id: "japchae-cupbab",
    category: "cupbab",
    romanized: "Japchae Cup-Bab",
    name: { sk: "Japchae rezance na ryži", en: "Japchae noodle rice cup", ko: "잡채 컵밥" },
    description: {
      sk: "Sklenené rezance zo sladkých zemiakov so zeleninou a sezamom, na ryži.",
      en: "Sweet-potato glass noodles stir-fried with vegetables and sesame, over rice.",
      ko: "당면을 채소, 참기름과 함께 볶아 밥 위에 올린 잡채 컵밥.",
    },
    price: 8.9,
    spicy: 0,
    art: "cup",
  },

  // ── Corn dogs ────────────────────────────────────────────
  {
    id: "crunchy-corndog",
    category: "corndog",
    romanized: "Crunchy Corndog",
    name: { sk: "Chrumkavý corn dog", en: "Crunchy corn dog", ko: "크런치 핫도그" },
    description: {
      sk: "Kórejský corn dog obalený v chrumkavej strúhanke, posypaný cukrom a s omáčkou podľa výberu.",
      en: "Korean corn dog in an extra-crunchy crumb, dusted with sugar, with your choice of sauce.",
      ko: "바삭한 빵가루 옷을 입혀 튀기고 설탕을 뿌린 핫도그. 소스는 취향대로.",
    },
    price: 4.9,
    spicy: 0,
    tags: ["bestseller"],
    signature: true,
    art: "corndog",
  },
  {
    id: "potato-corndog",
    category: "corndog",
    romanized: "Potato Corndog",
    name: { sk: "Zemiakový corn dog", en: "Potato corn dog", ko: "감자 핫도그" },
    description: {
      sk: "Obalený v kockách zemiakov a vysmážaný dozlatista — chrumkavý zvonku, šťavnatý vnútri.",
      en: "Coated in diced potato and fried golden — crisp outside, juicy inside.",
      ko: "깍둑 썬 감자를 입혀 노릇하게 튀긴 핫도그. 겉은 바삭, 속은 촉촉.",
    },
    price: 5.5,
    spicy: 0,
    art: "corndog",
  },
  {
    id: "basic-corndog",
    category: "corndog",
    romanized: "Basic Corndog",
    name: { sk: "Klasický corn dog", en: "Classic corn dog", ko: "기본 핫도그" },
    description: {
      sk: "Klasika z kórejských ulíc — nadýchané cesto, párok alebo mozzarella, kečup a horčica.",
      en: "The Seoul street classic — fluffy batter, sausage or mozzarella, ketchup and mustard.",
      ko: "서울 길거리 그 맛. 폭신한 반죽에 소시지 또는 모짜렐라, 케첩과 머스터드.",
    },
    price: 4.5,
    spicy: 0,
    art: "corndog",
  },

  // ── Tteokbokki ───────────────────────────────────────────
  {
    id: "tteokbokki",
    category: "tteokbokki",
    romanized: "Tteokbokki",
    name: { sk: "Ryžové koláčiky v pálivej omáčke", en: "Spicy rice cakes", ko: "떡볶이" },
    description: {
      sk: "Žuvacie ryžové koláčiky a rybie placky v sladko-pálivej gochujang omáčke.",
      en: "Chewy rice cakes and fish cakes simmered in a sweet and fiery gochujang sauce.",
      ko: "쫄깃한 떡과 어묵을 매콤달콤한 고추장 소스에 졸였습니다.",
    },
    price: 7.9,
    spicy: 3,
    tags: ["bestseller"],
    signature: true,
    art: "tteok",
  },
  {
    id: "rose-tteokbokki",
    category: "tteokbokki",
    romanized: "Rose Tteokbokki",
    name: { sk: "Rose tteokbokki", en: "Rose tteokbokki", ko: "로제 떡볶이" },
    description: {
      sk: "Krémová verzia s mliekom a syrom — jemnejšia pálivosť, plná chuť. Hit z kaviarní v Soule.",
      en: "The creamy version with milk and cheese — milder heat, rich flavour. A Seoul café hit.",
      ko: "우유와 치즈를 더한 크리미한 로제 떡볶이. 순한 매운맛에 진한 풍미.",
    },
    price: 8.9,
    spicy: 1,
    tags: ["new"],
    art: "tteok",
  },

  // ── Fried chicken ────────────────────────────────────────
  // TODO(owner): confirm which chicken variants and portion sizes are on the board.
  {
    id: "fried-chicken-original",
    category: "chicken",
    romanized: "Huraideu Chicken",
    name: { sk: "Kórejské vyprážané kura", en: "Korean fried chicken", ko: "후라이드 치킨" },
    description: {
      sk: "Dvakrát vyprážané pre extra chrumkavú kôrku. S nakladanou reďkovkou.",
      en: "Double-fried for an extra-crackly crust. Served with pickled radish.",
      ko: "두 번 튀겨 더 바삭한 후라이드 치킨. 치킨무와 함께.",
    },
    price: 9.9,
    spicy: 0,
    signature: true,
    art: "chicken",
  },
  {
    id: "fried-chicken-yangnyeom",
    category: "chicken",
    romanized: "Yangnyeom Chicken",
    name: { sk: "Kura v sladko-pálivej glazúre", en: "Sweet & spicy glazed chicken", ko: "양념 치킨" },
    description: {
      sk: "Chrumkavé kura obalené v lepkavej sladko-pálivej omáčke, posypané sezamom.",
      en: "Crispy chicken tossed in a sticky sweet-and-spicy sauce, finished with sesame.",
      ko: "바삭한 치킨에 달콤 매콤한 양념 소스를 버무리고 참깨를 뿌렸습니다.",
    },
    price: 10.9,
    spicy: 2,
    tags: ["bestseller"],
    art: "chicken",
  },
  {
    id: "fried-chicken-soy-garlic",
    category: "chicken",
    romanized: "Ganjang Chicken",
    name: { sk: "Kura so sójou a cesnakom", en: "Soy garlic chicken", ko: "간장 치킨" },
    description: {
      sk: "Glazované sójovou omáčkou s cesnakom — slané, sladké a návykové.",
      en: "Glazed with soy sauce and garlic — savoury, sweet and dangerously moreish.",
      ko: "간장과 마늘로 윤기 나게 졸인 단짠 치킨.",
    },
    price: 10.9,
    spicy: 0,
    art: "chicken",
  },

  // ── Snacks ───────────────────────────────────────────────
  {
    id: "mandu",
    category: "snacks",
    romanized: "Mandu",
    name: { sk: "Kórejské knedlíčky", en: "Korean dumplings", ko: "만두" },
    description: {
      sk: "Opekané knedlíčky plnené mäsom a zeleninou, so sójovým dipom.",
      en: "Pan-fried dumplings filled with meat and vegetables, with a soy dipping sauce.",
      ko: "고기와 채소로 속을 채워 노릇하게 구운 만두. 간장 소스와 함께.",
    },
    price: 5.9,
    spicy: 0,
    art: "dumpling",
  },
  {
    id: "kimmari",
    category: "snacks",
    romanized: "Kimmari",
    name: { sk: "Vyprážané rolky z morských rias", en: "Fried seaweed rolls", ko: "김말이" },
    description: {
      sk: "Sklenené rezance zabalené v riasach nori, v chrumkavom cestíčku. Skvelé namáčané v tteokbokki omáčke.",
      en: "Glass noodles wrapped in seaweed and fried in a light batter. Best dipped in tteokbokki sauce.",
      ko: "당면을 김으로 말아 바삭하게 튀긴 김말이. 떡볶이 소스에 찍어 드세요.",
    },
    price: 4.9,
    spicy: 0,
    // TODO(owner): confirm the batter/filling is fully vegetarian.
    tags: ["vegetarian"],
    art: "roll",
  },

  // ── Drinks ───────────────────────────────────────────────
  {
    id: "green-grape-ade",
    category: "drinks",
    romanized: "Cheongpodo Ade",
    name: { sk: "Kórejská limonáda zo zeleného hrozna", en: "Korean green grape ade", ko: "청포도 에이드" },
    description: {
      sk: "Osviežujúca perlivá limonáda so zeleným hroznom.",
      en: "Refreshing sparkling green grape ade.",
      ko: "상큼한 청포도 탄산 에이드.",
    },
    price: 4.5,
    tags: ["bestseller"],
    art: "ade",
  },
  {
    id: "mango-ade",
    category: "drinks",
    romanized: "Mango Ade",
    name: { sk: "Mangová limonáda", en: "Mango ade", ko: "망고 에이드" },
    description: {
      sk: "Perlivá limonáda so zrelým mangom.",
      en: "Sparkling ade with ripe mango.",
      ko: "잘 익은 망고로 만든 탄산 에이드.",
    },
    price: 4.5,
    art: "ade",
  },
  {
    id: "strawberry-ade",
    category: "drinks",
    romanized: "Ttalgi Ade",
    name: { sk: "Jahodová limonáda", en: "Strawberry ade", ko: "딸기 에이드" },
    description: {
      sk: "Perlivá limonáda s jahodovým pyré.",
      en: "Sparkling ade with strawberry purée.",
      ko: "딸기청을 넣은 탄산 에이드.",
    },
    price: 4.5,
    art: "ade",
  },
  {
    id: "blue-lemonade",
    category: "drinks",
    romanized: "Blue Lemonade",
    name: { sk: "Modrá limonáda", en: "Blue lemonade", ko: "블루 레모네이드" },
    description: {
      sk: "Žiarivo modrá citrónová limonáda — presne ako z nočného Soulu.",
      en: "Electric-blue lemonade — straight out of a Seoul night.",
      ko: "서울의 밤처럼 푸른 블루 레모네이드.",
    },
    price: 4.5,
    art: "ade",
  },
  {
    id: "korean-iced-coffee",
    category: "drinks",
    romanized: "Korean Ice Coffee",
    name: { sk: "Kórejská ľadová káva", en: "Korean iced coffee", ko: "아이스 커피" },
    description: {
      sk: "Sladká ľadová káva v kórejskom štýle.",
      en: "Sweet Korean-style iced coffee.",
      ko: "달달한 한국식 아이스 커피.",
    },
    price: 3.9,
    art: "coffee",
  },
  {
    id: "pepsi",
    category: "drinks",
    romanized: "Pepsi",
    name: { sk: "Pepsi", en: "Pepsi", ko: "펩시" },
    description: { sk: "0,33 l plechovka.", en: "0.33 l can.", ko: "0.33L 캔." },
    price: 2.5,
    art: "can",
  },
  {
    id: "pepsi-max",
    category: "drinks",
    romanized: "Pepsi Max",
    name: { sk: "Pepsi Max", en: "Pepsi Max", ko: "펩시 맥스" },
    description: { sk: "0,33 l plechovka, bez cukru.", en: "0.33 l can, zero sugar.", ko: "0.33L 캔, 제로 슈거." },
    price: 2.5,
    art: "can",
  },

  // ── Beer & Soju ──────────────────────────────────────────
  {
    id: "soju",
    category: "alcohol",
    romanized: "Soju",
    name: { sk: "Soju", en: "Soju", ko: "소주" },
    description: {
      sk: "Kórejská klasika vo fľaši — ideálne s chicken a tteokbokki. Opýtaj sa na príchute.",
      en: "The Korean classic by the bottle — made for chicken and tteokbokki. Ask about flavours.",
      ko: "치킨, 떡볶이와 찰떡궁합인 소주 한 병. 맛은 직원에게 문의하세요.",
    },
    price: 8.9,
    tags: ["bestseller"],
    art: "soju",
  },
  {
    id: "pink-soju-cocktail",
    category: "alcohol",
    romanized: "Pink Soju Cocktail",
    name: { sk: "Ružový soju kokteil", en: "Pink soju cocktail", ko: "핑크 소주 칵테일" },
    description: {
      sk: "Ovocný ružový kokteil na báze soju.",
      en: "A fruity pink soju-based cocktail.",
      ko: "과일 향 가득한 핑크빛 소주 칵테일.",
    },
    price: 6.9,
    art: "soju",
  },
  {
    id: "melon-soju-cocktail",
    category: "alcohol",
    romanized: "Melon Soju Cocktail",
    name: { sk: "Melónový soju kokteil", en: "Melon soju cocktail", ko: "멜론 소주 칵테일" },
    description: {
      sk: "Sladký melónový kokteil so soju — obľúbený v Kórei.",
      en: "Sweet melon cocktail with soju — a Korean favourite.",
      ko: "한국에서 사랑받는 달콤한 멜론 소주 칵테일.",
    },
    price: 6.9,
    art: "soju",
  },
  {
    id: "pilsner",
    category: "alcohol",
    romanized: "Pilsner Beer",
    name: { sk: "Pivo Pilsner", en: "Pilsner beer", ko: "필스너 맥주" },
    description: {
      sk: "Vychladené — pre pravé kórejské chimaek (chicken + pivo).",
      en: "Ice-cold — for a proper Korean chimaek (chicken + beer).",
      ko: "시원한 필스너 한 잔으로 완성하는 치맥.",
    },
    price: 3.2,
    art: "beer",
  },
];

export function itemsByCategory(category: CategoryId): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export const signatureItems = menuItems.filter((item) => item.signature);
