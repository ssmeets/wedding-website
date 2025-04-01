
"use client"
import { createClient } from "@/prismicio";
import { LanguageSwitcher, LanguageSwitcherProps } from "./LanguageSwitcher";
import NavBar from "./NavBar";
import { createContext } from "vm";
import { useContext, useEffect, useState } from "react";
import { HeaderRefContext } from "./HeaderRefProvider";
import { MenuDocument } from "../../prismicio-types";


export default function Header({
  locales,
  currentLang,
}: {
  locales: LanguageSwitcherProps;
  currentLang?: string | string[] | undefined;
}) {
  const client = createClient();
  const [menu, setMenu] = useState<MenuDocument<string> | null>(null);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const context = useContext(HeaderRefContext);

  if (!context) {
    throw new Error("HeaderComponent must be used within a HeaderRefProvider");
  }

  const { headerRef } = context;

  useEffect(() => {
    // Fetch the menu data when the component mounts
    const fetchMenu = async () => {
      const menuData = await client.getSingle("menu", {
        lang: Array.isArray(currentLang) ? currentLang[0] : currentLang,
      });
      setMenu(menuData);
      setMenuLoaded(true)
    };

    fetchMenu();

    if (headerRef.current) {
      // Perform operations with the headerRef, e.g., measure its height
    }
  }, [menuLoaded, headerRef]);

  if (!menu) {
    // Optionally render a loading state while fetching the menu
    return <div></div>;
  }

  return (
    <header
      ref={headerRef}
      className="top-0 left-0 right-0 z-50 sticky bg-white md:bg-transparent"
    >
      <div className="flex">
        <NavBar menu={menu} locales={locales} currentLang={currentLang} />
      </div>
    </header>
  );
}
