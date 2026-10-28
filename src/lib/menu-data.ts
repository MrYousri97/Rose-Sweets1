// Types and initial menu data for Rose Sweets menu editor

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn?: string;
  price: number;
  unit?: string; // e.g. "ج.م", "للقطعة"
  notes?: string; // e.g. "إضافة توبينج بـ ٥ج"
  isInfo?: boolean; // for lines that are just notes (no price)
}

export interface MenuCategory {
  id: string;
  nameAr: string;
  nameEn?: string;
  items: MenuItem[];
}

export interface MenuData {
  restaurantNameAr: string;
  restaurantNameEn: string;
  taglineAr: string;
  taglineEn: string;
  // Social media / contact info shown on the cover page
  facebook?: string;
  instagram?: string;
  whatsapp?: string; // phone number for whatsapp
  phone?: string; // generic phone (kept for backwards compat)
  // Closing-page philosophical quote
  closingQuoteAr?: string;
  closingQuoteEn?: string;
  // Image paths (under /public)
  coverImage?: string;
  closingImage?: string;
  categories: MenuCategory[];
}

// Initial menu parsed from the uploaded PDF "Menu - Rose Sweets.pdf"
export const initialMenu: MenuData = {
  restaurantNameAr: "روز سوييتس",
  restaurantNameEn: "ROSE SWEETS",
  taglineAr: "تناول الطعام ضرورة، لكن تناوله بذكاء فن",
  taglineEn: "TO EAT IS A NECESSITY, BUT TO EAT INTELLIGENTLY IS AN ART",
  facebook: "ROSE SWEETS",
  instagram: "ROSE SWEETS",
  whatsapp: "01278187473",
  phone: "01278187473",
  closingQuoteAr: "تناول الطعام ضرورة، لكن تناوله بذكاء فن",
  closingQuoteEn: "TO EAT IS A NECESSITY, BUT TO EAT INTELLIGENTLY IS AN ART",
  coverImage: "/cover-baker.png",
  closingImage: "/closing-cinnabon.png",
  categories: [
    {
      id: "cat-cheesecake-eclair",
      nameAr: "تشيز كيك و إكلير",
      nameEn: "CHEESE CAKE & ÉCLAIR",
      items: [
        {
          id: "ce-1",
          nameAr: "إكلير ميني (٦ قطع)",
          nameEn: "6 PIECES MINI ÉCLAIR",
          price: 180,
          unit: "ج.م",
        },
        {
          id: "ce-2",
          nameAr: "إكلير ميني (٢٠ قطعة)",
          nameEn: "20 PIECES MINI ÉCLAIR",
          price: 300,
          unit: "ج.م",
        },
        {
          id: "ce-3",
          nameAr: "إكلير ميني مخصّص (٢٠ قطعة)",
          nameEn: "20 PIECES MINI SPECIAL",
          price: 335,
          unit: "ج.م",
        },
        {
          id: "ce-4",
          nameAr: "إضافة توبينج (لوتس / فستق / توت)",
          nameEn: "EXTRA TOPPING (LOTUS / PISTACHIO / BLUEBERRY)",
          price: 5,
          unit: "للقطعة",
          isInfo: true,
        },
      ],
    },
    {
      id: "cat-biscuits",
      nameAr: "بسكويت القهوة",
      nameEn: "COFFEE BISCUITS",
      items: [
        {
          id: "bi-1",
          nameAr: "بسكويت كلاسيك (١ كيلو)",
          nameEn: "1 KG BISCUITS CLASSIC",
          price: 275,
          unit: "ج.م",
        },
      ],
    },
    {
      id: "cat-tart",
      nameAr: "تارت",
      nameEn: "TART",
      items: [
        {
          id: "ta-1",
          nameAr: "تارت ميني (٢٤ قطعة)",
          nameEn: "24 PIECES MINI TART",
          price: 250,
          unit: "ج.م",
        },
        {
          id: "ta-2",
          nameAr: "تارت ميني مخصّص (٢٤ قطعة)",
          nameEn: "24 PIECES MINI SPECIAL TART",
          price: 285,
          unit: "ج.م",
        },
      ],
    },
    {
      id: "cat-cinnabon",
      nameAr: "سينابون و سينامون رول",
      nameEn: "CINNABON & CINNAMON ROLLS",
      items: [
        {
          id: "ci-1",
          nameAr: "سينابون مقاس M",
          nameEn: "CINNABON SIZE M",
          price: 55,
          unit: "ج.م",
        },
        {
          id: "ci-2",
          nameAr: "سينابون مقاس L",
          nameEn: "CINNABON SIZE L",
          price: 65,
          unit: "ج.م",
        },
        {
          id: "ci-3",
          nameAr: "بلوبيري محشي (جوه و بره) - ٩ قطع ميني",
          nameEn: "STUFFED BLUEBERRY - 9 PIECES MINI",
          price: 300,
          unit: "ج.م",
        },
      ],
    },
    {
      id: "cat-donuts",
      nameAr: "دونات",
      nameEn: "DONUTS",
      items: [
        { id: "do-1", nameAr: "دونات كراميل", nameEn: "CARAMEL DONUT", price: 30, unit: "ج.م" },
        { id: "do-2", nameAr: "دونات شوكولاتة", nameEn: "CHOCOLATE DONUT", price: 35, unit: "ج.م" },
        { id: "do-3", nameAr: "بامبوليني شوكولاتة", nameEn: "BAMBOLENY CHOCOLATE", price: 45, unit: "ج.م" },
        { id: "do-4", nameAr: "بامبوليني لوتس", nameEn: "BAMBOLENY LOTUS", price: 50, unit: "ج.م" },
      ],
    },
    {
      id: "cat-honey-cake",
      nameAr: "كيكة العسل",
      nameEn: "HONEY CAKE",
      items: [
        {
          id: "hc-1",
          nameAr: "كيكة العسل ميني",
          nameEn: "MINI HONEY CAKE",
          price: 85,
          unit: "ج.م",
        },
      ],
    },
    {
      id: "cat-cupcake",
      nameAr: "كب كيك",
      nameEn: "CUP-CAKE",
      items: [
        { id: "cu-1", nameAr: "كب كيك", nameEn: "CUPCAKE", price: 30, unit: "ج.م" },
        { id: "cu-2", nameAr: "بامبوليني فستق", nameEn: "BAMBOLENY PISTACHIO", price: 55, unit: "ج.م" },
      ],
    },
    {
      id: "cat-cookies",
      nameAr: "فوندان كوكيز",
      nameEn: "FONDANT COOKIES",
      items: [
        {
          id: "co-1",
          nameAr: "كوكيز فوندان",
          nameEn: "FONDANT COOKIES",
          price: 30,
          unit: "ج.م",
        },
        {
          id: "co-2",
          nameAr: "كوكيز ميني-ميني (١٥ قطعة)",
          nameEn: "15 PIECES MINI-MINI COOKIES",
          price: 300,
          unit: "ج.م",
        },
      ],
    },
    {
      id: "cat-chocolate-bar",
      nameAr: "بار الشوكولاتة",
      nameEn: "CHOCOLATE BAR",
      items: [
        {
          id: "cb-1",
          nameAr: "بار شوكولاتة (١٧٥ جرام)",
          nameEn: "BAR 175 GRAM",
          price: 175,
          unit: "ج.م",
        },
        { id: "cb-2", nameAr: "لوتس", nameEn: "LOTUS", price: 45, unit: "ج.م" },
        {
          id: "cb-3",
          nameAr: "محشو (كنافة لوتس أو كنافة فستق) - ٧ قطع × ٣٠ جرام",
          nameEn: "FILLED (KUNAFA PISTACHIO OR KUNAFA LOTUS) - 7 PCS × 30G",
          price: 220,
          unit: "ج.م",
        },
        { id: "cb-4", nameAr: "تشوكليت بار (٧٥ جرام)", nameEn: "BAR 75 GRAM", price: 75, unit: "ج.م" },
        {
          id: "cb-5",
          nameAr: "إضافة توبينج (فستق / توت)",
          nameEn: "EXTRA TOPPING (PISTACHIO / BLUEBERRY)",
          price: 5,
          unit: "للقطعة",
          isInfo: true,
        },
      ],
    },
  ],
};

export const STORAGE_KEY = "rose-sweets-menu-v1";

export function loadMenu(): MenuData {
  if (typeof window === "undefined") return initialMenu;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialMenu;
    const parsed = JSON.parse(raw) as MenuData;
    // Basic validation
    if (!parsed || !Array.isArray(parsed.categories)) return initialMenu;
    return parsed;
  } catch {
    return initialMenu;
  }
}

export function saveMenu(menu: MenuData) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
  } catch {
    /* ignore quota errors */
  }
}

export function resetMenu(): MenuData {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  return initialMenu;
}

// Generate a unique id
export function genId(prefix = "item"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Convert arabic-indic-looking numerals not needed; we use latin digits.
// Format price for display with thousands separator.
export function formatPrice(price: number): string {
  if (Number.isNaN(price) || price === 0) return "—";
  return new Intl.NumberFormat("en-US").format(price);
}
