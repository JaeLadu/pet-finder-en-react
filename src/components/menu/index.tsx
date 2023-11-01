import React from "react";
import { Link } from "react-router-dom";
import { CloseButton } from "ui/close-button";
import css from "./index.css";
import { Subtitle } from "ui/subtitle";

function Menu() {
   return (
      <div className={css.menu}>
         <div className={css.closebutton}>
            <CloseButton />
         </div>
         <ul className={css.ul}>
            <Link className={css.link} to={"profile"}>
               <Subtitle text="Mis datos" white={true} bold={true}></Subtitle>
            </Link>
            <Link className={css.link} to={"reports"}>
               <Subtitle
                  white={true}
                  bold={true}
                  text="Mis mascotas reportadas"
               ></Subtitle>
            </Link>
            <Link className={css.link} to={"createreport"}>
               <Subtitle
                  white={true}
                  bold={true}
                  text="Reportar mascota"
               ></Subtitle>
            </Link>
            <Link className={css.link} to={"choose-location"}>
               <Subtitle
                  white={true}
                  bold={true}
                  text="Dar mi ubicación actual"
               ></Subtitle>
            </Link>
         </ul>
      </div>
   );
}

export { Menu };
