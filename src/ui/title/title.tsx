import React from "react";
import css from "./title.css";

function Title(props: { text?: string; color?: "white" | "black" | "red" }) {
   const { text, color } = props;

   let classNameArr = [css.title];
   if (color) {
      classNameArr.push(css[color]);
   }

   const finalName = classNameArr.join(" ");
   return <h3 className={finalName}>{text || "Título"}</h3>;
}

export { Title };
