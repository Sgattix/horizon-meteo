import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horizon Meteo",
  description: "Get the latest weather updates for your city.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#ffffff",
  openGraph: {
    title: "Horizon Meteo",
    description: "Get the latest weather updates for your city.",
    url: "https://horizon-meteo.com",
    siteName: "Horizon Meteo",
    images: [
      {
        url: "https://horizon-meteo.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Horizon Meteo Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Meteo",
    description: "Get the latest weather updates for your city.",
    site: "@horizon_meteo",
    creator: "@horizon_meteo",
    images: [
      {
        url: "https://horizon-meteo.com/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "Horizon Meteo Twitter Image",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    me: "me-verification-code",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Horizon Meteo",
    statusBarStyle: "default",
    startupImage: [
      {
        url: "/apple-touch-startup-image.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  alternates: {
    canonical: "https://horizon-meteo.com",
    types: {
      "application/rss+xml": "https://horizon-meteo.com/feed.xml",
      "application/atom+xml": "https://horizon-meteo.com/atom.xml",
    },
  },
  keywords: [
    "weather",
    "forecast",
    "horizon",
    "meteo",
    "climate",
    "temperature",
    "humidity",
    "precipitation",
    "wind",
    "sunny",
    "cloudy",
    "rain",
    "snow",
    "storm",
    "weather updates",
    "local weather",
    "global weather",
    "weather app",
    "weather forecast",
    "weather alerts",
    "weather news",
    "weather conditions",
    "weather radar",
    "weather maps",
    "weather widgets",
    "weather API",
    "weather data",
    "weather information",
    "weather trends",
    "weather statistics",
    "weather patterns",
    "weather analysis",
    "weather insights",
    "weather tips",
    "weather advice",
    "weather safety",
    "weather preparedness",
    "weather education",
    "weather resources",
    "weather community",
    "weather blog",
    "weather articles",
    "weather videos",
    "weather podcasts",
    "weather photography",
    "weather illustrations",
    "weather infographics",
    "weather animations",
    "weather simulations",
    "weather tools",
    "weather calculators",
    "weather widgets",
    "weather extensions",
    "weather plugins",
    "weather integrations",
    "weather services",
    "weather platforms",
    "weather technologies",
    "weather innovations",
    "weather startups",
    "weather companies",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
