import React from "react";
import css from "./index.css";

function Subtitle(props: { text?: string; white?: boolean; bold?: boolean }) {
   let classNameArr = [css.subtitle];
   if (props.white == true) {
      classNameArr.push(css.white);
   }
   if (props.bold == true) {
      classNameArr.push(css.bold);
   }

   const finalName = classNameArr.join(" ");
   return <h3 className={finalName}>{props.text || "Subtítulo"}</h3>;
}

export { Subtitle };
