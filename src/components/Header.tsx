
import { createClient } from "@/prismicio";
import { LanguageSwitcher, LanguageSwitcherProps } from "./LanguageSwitcher";
import NavBar from "./NavBar";


export default async function Header({ locales, currentLang }: { locales: LanguageSwitcherProps, currentLang?: string | string[] | undefined }) {
  const client = createClient();

  const menu = await client.getSingle("menu", { lang: Array.isArray(currentLang) ? currentLang[0] : currentLang });

  return (
    <header className="bg-white fixed w-full z-50 block">
      <div className="flex">
        <NavBar menu={menu} locales={locales} currentLang={currentLang} />
      </div>
    </header>
  );
}
