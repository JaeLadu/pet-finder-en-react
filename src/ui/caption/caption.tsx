import React from "react";
import css from "./caption.css";

function Caption(props: { text?: string; color?: "white" | "black" }) {
   let classNameArr = [css.caption];
   if (props.color) {
      classNameArr.push(css[props.color]);
   }

   const finalName = classNameArr.join(" ");
   return <span className={finalName}>{props.text || "Caption"}</span>;
}

export { Caption };
