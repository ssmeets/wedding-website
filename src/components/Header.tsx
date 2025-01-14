import { createClient } from "@/prismicio";
import { LanguageSwitcher, LanguageSwitcherProps } from "./LanguageSwitcher";

export default async function Header({ locales, currentLang }: { locales: LanguageSwitcherProps, currentLang?: string | string[] | undefined }) {
  const client = createClient();

  return (
    <header>
      <LanguageSwitcher locales={locales} currentLang={currentLang} />
    </header>
  );
}
