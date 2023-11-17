import React, { Suspense } from "react";
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
      <Suspense fallback={<div>Cargando</div>}>
         <header className={css.header}>
            <Logo />
            <Burguer />
            {headerMenuOpen && <Menu />}
         </header>
         <Outlet />
      </Suspense>
   );
}

export { Header };
