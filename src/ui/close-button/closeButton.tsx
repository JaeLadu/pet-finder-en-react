import React from "react";
import css from "./closeButton.css";
import { headerMenuState } from "hooks";
import { useSetRecoilState } from "recoil";

function CloseButton() {
   const setMenuValue = useSetRecoilState(headerMenuState);
   function hideMenu() {
      setMenuValue(false);
   }

   return (
      <span
         onClick={hideMenu}
         className={"material-symbols-outlined " + css.close}
      >
         close
      </span>
   );
}

export { CloseButton };
