import NavBar from "@/components//NavBar";
import { createClient } from "@/prismicio";
import { LanguageSwitcher, LanguageSwitcherProps } from "./LanguageSwitcher";
import { getLocales } from "@/utils/getLocales";
import { PageDocument } from "../../prismicio-types";

export default async function Header({ locales, currentLang }: { locales: LanguageSwitcherProps, currentLang?: string }) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header>
      <LanguageSwitcher locales={locales} currentLang={currentLang} />
      <NavBar settings={settings}></NavBar>
    </header>
  );
}
