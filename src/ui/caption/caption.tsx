import React from "react";
import css from "./caption.css";

function Caption(props: { text?: string; white?: boolean }) {
   let classNameArr = [css.caption];
   if (props.white == true) {
      classNameArr.push(css.white);
   }

   const finalName = classNameArr.join(" ");
   return <h3 className={finalName}>{props.text || "Caption"}</h3>;
}

export { Caption };
