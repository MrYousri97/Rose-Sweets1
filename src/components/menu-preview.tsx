"use client";

import type { MenuData } from "@/lib/menu-data";
import { formatPrice } from "@/lib/menu-data";
import {
  DiamondDivider,
  SectionDivider,
  FooterDivider,
  CakeIcon,
  DonutIcon,
  CookieIcon,
  TartIcon,
  CupcakeIcon,
} from "@/components/menu-icons";

interface MenuPreviewProps {
  menu: MenuData;
}

// Color palette matching the original PDF
const NAVY = "#183244";
const NAVY_DARK = "#0d2137";
const TEXT = "#1c2833";
const BG = "#d8cdb8"; // kraft beige
const BG_LIGHT = "#e6dcc7";
const BG_DARK = "#c4b89e"; // shadow tone

// Paper grain texture as a tiny inline SVG (noise) — adds the vintage paper feel.
const PAPER_TEXTURE = `url("data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
    <feColorMatrix values='0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 0.12 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)'/>
</svg>
`)}")`;

const PAGE_STYLE: React.CSSProperties = {
  width: "210mm",
  height: "297mm",
  padding: "14mm 12mm",
  boxSizing: "border-box",
  fontFamily: "var(--font-cairo), sans-serif",
  margin: "0 auto",
  position: "relative",
  overflow: "hidden",
  pageBreakAfter: "always",
  breakAfter: "page",
};

/**
 * Printable menu — three pages matching the original Rose Sweets PDF:
 *   1. Cover page (baker image + ROSE SWEETS + social media)
 *   2. Menu page(s) (kraft beige background, two columns of categories)
 *   3. Closing page (cinnabon image + philosophical quote)
 *
 * The element has id="printable-menu" which the @media print CSS targets,
 * so when window.print() is called only this element is visible.
 */
export function MenuPreview({ menu }: MenuPreviewProps) {
  return (
    <div id="printable-menu" dir="rtl">
      {/* ===== PAGE 1: COVER ===== */}
      <CoverPage menu={menu} />

      {/* ===== PAGE 2: MENU ===== */}
      <MenuPage menu={menu} />

      {/* ===== PAGE 3 (LAST): CLOSING ===== */}
      <ClosingPage menu={menu} />
    </div>
  );
}

// ---------- PAGE 1: Cover ----------
function CoverPage({ menu }: { menu: MenuData }) {
  return (
    <div
      style={{
        ...PAGE_STYLE,
        padding: 0,
        backgroundImage: `url(${menu.coverImage || "/cover-baker.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0a0a0a",
      }}
    />
  );
}

// ---------- PAGE 2: Menu ----------
function MenuPage({ menu }: { menu: MenuData }) {
  return (
    <div
      style={{
        ...PAGE_STYLE,
        padding: "5mm 9mm",
        background: `linear-gradient(180deg, ${BG} 0%, ${BG_LIGHT} 50%, ${BG_DARK} 100%)`,
        backgroundImage: `${PAPER_TEXTURE}, linear-gradient(180deg, ${BG} 0%, ${BG_LIGHT} 50%, ${BG_DARK} 100%)`,
        backgroundRepeat: "repeat, no-repeat",
        backgroundSize: "200px 200px, 100% 100%",
        color: TEXT,
      }}
    >
      {/* ===== Top decorative divider ===== */}
      <div style={{ color: NAVY, marginBottom: "2px" }}>
        <DiamondDivider />
      </div>

      {/* ===== Header ===== */}
      <header style={{ textAlign: "center", color: NAVY }}>
        {/* Sweet illustrations row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginBottom: "0",
            color: NAVY,
            transform: "scale(0.85)",
            transformOrigin: "center",
          }}
        >
          <TartIcon className="inline-block" />
          <CakeIcon className="inline-block" />
          <CupcakeIcon className="inline-block" />
        </div>

        {/* Main MENU title */}
        <h1
          style={{
            fontFamily: "var(--font-cairo), sans-serif",
            fontSize: "48px",
            fontWeight: 900,
            letterSpacing: "8px",
            margin: "0",
            color: NAVY,
            lineHeight: 1,
            textIndent: "8px",
          }}
        >
          MENU
        </h1>

        <p
          style={{
            fontFamily: "var(--font-amiri), serif",
            fontSize: "16px",
            color: NAVY,
            margin: "0",
            fontWeight: 700,
          }}
        >
          {menu.restaurantNameAr}
        </p>

        {/* divider under title */}
        <div style={{ color: NAVY, marginTop: "3px" }}>
          <DiamondDivider />
        </div>
      </header>

      {/* ===== Categories: two columns ===== */}
      <main style={{ marginTop: "4px" }}>
        {menu.categories.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px 0", color: NAVY, opacity: 0.6 }}>
            لا توجد أصناف — أضف أصنافاً من وضع التحرير.
          </p>
        ) : (
          <div
            style={{
              columnCount: 2,
              columnGap: "20px",
              columnFill: "balance",
            }}
          >
            {menu.categories.map((cat) => (
              <section
                key={cat.id}
                className="print-category"
                style={{
                  breakInside: "avoid",
                  WebkitColumnBreakInside: "avoid",
                  pageBreakInside: "avoid",
                  marginBottom: "6px",
                  color: TEXT,
                }}
              >
                {/* Category title */}
                <div style={{ textAlign: "center", color: NAVY }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-cairo), sans-serif",
                      fontSize: "16px",
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      margin: "0",
                      color: NAVY,
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.nameEn || cat.nameAr}
                  </h2>
                  {cat.nameEn && cat.nameAr !== cat.nameEn ? (
                    <p
                      style={{
                        fontFamily: "var(--font-amiri), serif",
                        fontSize: "12px",
                        color: NAVY,
                        margin: "0",
                        fontWeight: 700,
                      }}
                    >
                      {cat.nameAr}
                    </p>
                  ) : null}
                  <div style={{ color: NAVY, margin: "2px 0 5px" }}>
                    <SectionDivider />
                  </div>
                </div>

                {/* Items list */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {cat.items.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "5px",
                        padding: "1px 0",
                        borderBottom: `1px dotted ${NAVY}44`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: item.isInfo ? "9.5px" : "11px",
                          color: item.isInfo ? `${NAVY}cc` : TEXT,
                          fontWeight: item.isInfo ? 400 : 700,
                          flex: 1,
                          textAlign: "right",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.nameEn && !item.isInfo ? (
                          <>
                            <span style={{ display: "block" }}>{item.nameEn}</span>
                            <span
                              style={{
                                display: "block",
                                fontFamily: "var(--font-amiri), serif",
                                fontSize: "10.5px",
                                color: `${NAVY}cc`,
                                fontWeight: 700,
                                marginTop: "0",
                              }}
                            >
                              {item.nameAr}
                            </span>
                          </>
                        ) : (
                          item.nameAr
                        )}
                        {item.notes ? (
                          <span
                            style={{
                              display: "block",
                              fontSize: "8px",
                              color: `${NAVY}aa`,
                              fontWeight: 400,
                              marginTop: "0",
                            }}
                          >
                            {item.notes}
                          </span>
                        ) : null}
                      </span>

                      <span
                        style={{
                          whiteSpace: "nowrap",
                          fontWeight: 800,
                          color: NAVY,
                          fontSize: item.isInfo ? "9.5px" : "12px",
                          minWidth: "50px",
                          textAlign: "left",
                          fontFamily: "var(--font-cairo), sans-serif",
                        }}
                      >
                        {item.isInfo && item.price === 0 ? (
                          "—"
                        ) : (
                          <>
                            {formatPrice(item.price)}
                            <span
                              style={{
                                fontSize: "8px",
                                fontWeight: 600,
                                marginLeft: "2px",
                                opacity: 0.8,
                                letterSpacing: "0.5px",
                              }}
                            >
                              {item.unit || "L.E"}
                            </span>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* ===== Bottom illustrations ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "3px",
          color: NAVY,
          transform: "scale(0.85)",
          transformOrigin: "center",
        }}
      >
        <CookieIcon />
        <DonutIcon />
        <CakeIcon />
      </div>

      {/* ===== Footer ===== */}
      <footer style={{ marginTop: "2px", textAlign: "center", color: NAVY }}>
        <div style={{ marginBottom: "2px" }}>
          <FooterDivider />
        </div>
        <p
          style={{
            fontFamily: "var(--font-cairo), sans-serif",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "3px",
            color: NAVY,
            margin: "0",
          }}
        >
          {menu.restaurantNameEn || "ROSE SWEETS"}
        </p>
        <p
          style={{
            fontFamily: "var(--font-amiri), serif",
            fontSize: "9px",
            color: `${NAVY}cc`,
            margin: "0",
          }}
        >
          نسألكم الدعاء
        </p>
      </footer>
    </div>
  );
}

// ---------- PAGE 3 (LAST): Closing ----------
function ClosingPage({ menu }: { menu: MenuData }) {
  return (
    <div
      style={{
        ...PAGE_STYLE,
        padding: 0,
        backgroundImage: `url(${menu.closingImage || "/closing-cinnabon.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3a2a20",
      }}
    />
  );
}
