import React from "react";
import css from "./subtitle.css";

function Subtitle(props: {
   text?: string;
   color?: "white" | "black";
   bold?: boolean;
}) {
   const { text, color, bold } = props;

   let classNameArr = [css.subtitle];
   if (color) {
      classNameArr.push(css[color]);
   }
   if (bold == true) {
      classNameArr.push(css.bold);
   }

   const finalName = classNameArr.join(" ");
   return <h3 className={finalName}>{text || "Subtítulo"}</h3>;
}

export { Subtitle };
