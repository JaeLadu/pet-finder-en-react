import React from "react";
import css from "./index.css";
import { Outlet } from "react-router-dom";
import { Logo } from "ui/logo";
import { Burguer } from "ui/burguer-menu";
import { useRecoilValue } from "recoil";
import { headerMenuState } from "hooks";
import { Menu } from "components/menu";

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
