import { Metadata } from "next";

import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLocales } from "@/utils/getLocales";
import { PrismicNextLink } from "@prismicio/next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.


export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");
  const locales = await getLocales(home, client);

  return (
    <>
      <Header locales={{ locales: locales }} currentLang={lang} />
      <main>
        <SliceZone slices={home.data.slices} components={components} context={lang} />
      </main>
      <Footer />
    </>
  );
}
