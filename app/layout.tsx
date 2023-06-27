import "@/styles/tailwind.css";
import {
  Container,
  Footer,
  Grid,
  Header,
  Main,
  TwIndicator,
  Wrapper,
} from "@/components/layout";
import { metaData } from "@/config/meta";
import { cn, getOgImageUrl } from "@/lib/utils";
import supabase from "@/utils/supabase-server";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";

interface RootLayoutProps {
  children: React.ReactNode;
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dictionary",
    default: metaData.title,
    absolute: metaData.title,
  },
  generator: metaData.author.name,
  applicationName: metaData.title,
  description: metaData.description,
  referrer: "origin-when-cross-origin",
  keywords: metaData.keywords,
  authors: [
    {
      name: metaData.author.name,
      url: metaData.author.twitterUrl,
    },
  ],
  creator: metaData.author.name,
  publisher: metaData.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: ["/favicons/favicon-32x32.png"],
    apple: [
      { url: "/favicons/apple-icon.png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicons/apple-icon-precomposed.png",
      },
    ],
  },

  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/favicons/manifest.json`,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [
      {
        url: getOgImageUrl(
          metaData.title,
          metaData.subTitle,
          metaData.tags,
          "/"
        ),
        width: 1200,
        height: 630,
        alt: metaData.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.ogTitle,
    description: metaData.description,
    images: [
      getOgImageUrl(metaData.title, metaData.subTitle, metaData.tags, "/"),
    ],
    creator: metaData.author.twitterAddress,
  },
  appleWebApp: {
    capable: true,
    title: metaData.title,
    statusBarStyle: "black-translucent",
  },
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const profileImageUrl =
    session?.user?.user_metadata.picture ||
    session?.user?.user_metadata.avatar_url;
  return (
    <html lang="en" className="layout" suppressHydrationWarning>
      <body
        className={cn("layout h-full scroll-smooth", fontSans.variable)}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <Wrapper>
          <Header
            session={session || undefined}
            profileImageUrl={profileImageUrl}
          />
          <Container>
            <Grid>
              <Main>{children}</Main>
            </Grid>
          </Container>
          <VercelAnalytics />
          <Toaster />
          <TwIndicator />
        </Wrapper>
        <Footer />
      </body>
    </html>
  );
}
