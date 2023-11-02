import React from "react";
import css from "./header.css";
import { Outlet } from "react-router-dom";
import { Logo } from "ui/logo";
import { Burguer } from "ui/burguer-menu/burguerMenu";
import { useRecoilValue } from "recoil";
import { headerMenuState } from "hooks";
import { Menu } from "components/menu/menu";

function Header() {
   const headerMenuOpen = useRecoilValue(headerMenuState);
   return (
      <header className={css.header}>
         <Logo />
         <Burguer />
         {headerMenuOpen && <Menu />}
         <Outlet />
      </header>
   );
}

export { Header };
