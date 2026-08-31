import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { site, serviceCategories } from "@/lib/site";

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
  "@id": `${site.domain}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.domain,
  description:
    "Массаж и косметология в Самаре с 2011 года. Авторские методики, опытные мастера: классический, тайский, спортивный, антицеллюлитный массаж, стоун-терапия, СПА-программы, уход по лицу.",
  telephone: site.phoneHref,
  foundingDate: "2011",
  priceRange: "800–3500 ₽",
  currenciesAccepted: "RUB",
  image: `${site.domain}/hero.jpg`,
  areaServed: { "@type": "City", name: "Самара" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Дыбенко, 95",
    addressLocality: "Самара",
    addressRegion: "Самарская область",
    addressCountry: "RU",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    description: "По предварительной записи",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "9",
    bestRating: "5",
  },
  department: {
    "@type": "HealthAndBeautyBusiness",
    name: `${site.shortName} — Южный город`,
    telephone: site.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: "мкр-н Южный город, ул. Челышевская",
      addressLocality: "Самара",
      addressRegion: "Самарская область",
      addressCountry: "RU",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Услуги мастерской",
    itemListElement: serviceCategories.map((cat) => ({
      "@type": "OfferCatalog",
      name: cat.title,
      itemListElement: cat.items.map((it) => ({
        "@type": "Offer",
        priceCurrency: "RUB",
        price: it.price,
        itemOffered: {
          "@type": "Service",
          name: it.name,
          ...(it.effect ? { description: it.effect } : {}),
        },
      })),
    })),
  },
  sameAs: [
    site.telegramChannel,
    site.vkCommunity,
    site.yandexMaps,
    site.twoGis,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        {/* Hero background is a CSS background — preload it so the first screen
            paints immediately instead of after the stylesheet resolves. */}
        <link
          rel="preload"
          as="image"
          href="/hero.jpg"
          media="(min-width: 641px)"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-mobile.jpg"
          media="(max-width: 640px)"
        />
      </head>
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
