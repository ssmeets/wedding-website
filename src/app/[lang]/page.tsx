import { Metadata } from "next";

import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLocales } from "@/utils/getLocales";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isFilled } from "@prismicio/client";
import { Params } from "next/dist/server/request/params";

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.


export default async function Page({ params: { lang } }: { params: { lang: string }; }) {
  const client = createClient();
  const page = await client.getSingle("home", { lang: lang });
  const locales = await getLocales(page, client);

  return (<>
    <Header locales={{ locales: locales }} currentLang={lang} />
    <main>
      <SliceZone slices={page.data.slices} components={components} context={lang} />
    </main>
  </>
  );
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home", { lang: lang });

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? (page.data.meta_title as string)
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}

function asImageSrc(meta_image: unknown): string | URL | { url: string | URL; secureUrl?: string | URL | undefined; alt?: string | undefined; type?: string | undefined; width?: string | number | undefined; height?: string | number | undefined; } {
  throw new Error("Function not implemented.");
}
