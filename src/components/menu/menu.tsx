import React from "react";
import { Link } from "react-router-dom";
import { CloseButton } from "ui/close-button/closeButton";
import css from "./menu.css";
import { Subtitle } from "ui/subtitle/subtitle";
import { SessionToggle } from "components/sessionToggle/sessionToggle";
import { useSetRecoilState } from "recoil";
import { headerMenuState } from "hooks";

function Menu() {
   const setMenuValue = useSetRecoilState(headerMenuState);

   const links = [
      { to: "profile", text: "Mis datos" },
      { to: "reports", text: "Mis mascotas reportadas" },
      { to: "createreport", text: "Reportar mascota" },
      { to: "choose-location", text: "Dar mi ubicación actual" },
   ];
   return (
      <div className={css.menu}>
         <div className={css.closebutton}>
            <CloseButton />
         </div>
         <ul className={css.ul}>
            {links.map((link) => {
               return (
                  <Link
                     onClick={() => setMenuValue(false)}
                     className={css.link}
                     to={link.to}
                     key={link.to}
                  >
                     <Subtitle text={link.text} color="white" bold={true} />
                  </Link>
               );
            })}
         </ul>

         <div className={css.sessioncontainer}>
            <SessionToggle />
         </div>
      </div>
   );
}

export { Menu };
