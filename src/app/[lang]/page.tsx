import { Metadata } from "next";
import { notFound } from "next/navigation";

import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLocales } from "@/utils/getLocales";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Params = { uid: string, lang: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid, lang } = await params;
  const client = createClient();
  const page = await client.getByUID("page", "home", { lang: lang }).catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params, locale }: { params: Promise<Params>, locale: string }) {
  const { uid, lang } = await params;
  const client = createClient();

  const page = await client.getByUID("page", "home", { lang: lang }).catch(() => notFound());

  const locales = await getLocales(page, client)

  return (
    <>
      <Header locales={{ locales: locales }} currentLang={lang} />
      <main>
        <SliceZone slices={page.data.slices} components={components} context={lang} />
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();



  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
    lang: "*"
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { params: { uid: page.uid }, lang: page.lang };
  });
}
