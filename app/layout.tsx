import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default:
      "Мастерская массажа и косметологии Натальи Хасаншиной — Самара",
    template: "%s · Мастерская Натальи Хасаншиной",
  },
  description:
    "Премиальный массаж и косметология в Самаре с 2011 года. Авторские методики, опытные мастера, атмосфера уюта: классический, тайский, СПА, стоун-терапия, уход по лицу, массаж для двоих. Запись онлайн.",
  keywords: [
    "массаж Самара",
    "массажный салон Самара",
    "спа Самара",
    "тайский массаж Самара",
    "антицеллюлитный массаж Самара",
    "массаж лица Самара",
    "косметология Самара",
    "Наталья Хасаншина",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Мастерская массажа и косметологии Натальи Хасаншиной — Самара",
    description:
      "Премиальный массаж и косметология в Самаре с 2011 года. Авторские методики, опытные мастера, атмосфера уюта.",
    siteName: site.shortName,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: site.name,
  description:
    "Массаж и косметология в Самаре с 2011 года. Авторские методики, опытные мастера.",
  telephone: site.phoneHref,
  foundingDate: "2011",
  priceRange: "₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Дыбенко, 95",
    addressLocality: "Самара",
    addressCountry: "RU",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "9",
  },
  sameAs: [site.telegramChannel, site.vkCommunity],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
