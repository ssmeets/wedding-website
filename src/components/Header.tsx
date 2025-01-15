import { createClient } from "@/prismicio";
import { LanguageSwitcher, LanguageSwitcherProps } from "./LanguageSwitcher";

export default async function Header({ locales, currentLang }: { locales: LanguageSwitcherProps, currentLang?: string | string[] | undefined }) {
  const client = createClient();

  const menu = await client.getSingle("menu", { lang: Array.isArray(currentLang) ? currentLang[0] : currentLang });

  return (
    <header className="bg-white fixed w-full z-50 block">
      <div className="flex">
        <ul className="m-auto items-center w11/12">
          {menu.data.navigation.map((item) => (
            <li className="font-menu uppercase inline-block pt-4 pb-4 pl-10 pr-10 items-center text-center" key={item.link}>
              <a href={"#" + item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="text-right w-32">
          <LanguageSwitcher locales={locales} currentLang={currentLang} />
        </div>
      </div>
    </header>
  );
}
