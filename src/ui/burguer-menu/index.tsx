import React from "react";
import css from "./index.css";
import { headerMenuState } from "hooks";
import { useSetRecoilState } from "recoil";

function Burguer() {
   const setMenuValue = useSetRecoilState(headerMenuState);
   function showMenu() {
      setMenuValue(true);
   }

   return (
      <span
         onClick={showMenu}
         className={"material-symbols-outlined " + css.menu}
      >
         menu
      </span>
   );
}

export { Burguer };
