import React from "react";
import css from "./caption.css";

function Caption(props: { text?: string; color?: "white" | "black" }) {
   let classNameArr = [css.caption];
   if (props.color) {
      classNameArr.push(css[props.color]);
   }

   const finalName = classNameArr.join(" ");
   return <h3 className={finalName}>{props.text || "Caption"}</h3>;
}

export { Caption };
