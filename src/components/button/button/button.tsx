import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./button.css";

type buttonProps = {
   text?: string;
   color?: "red" | "green" | "black";
   handleClick: () => any;
};

export function Button({ text, color, handleClick }: buttonProps) {
   const basicClass = [css.button];
   if (color) {
      basicClass.push(css[color]);
   }
   const finalClass = basicClass.join(" ");

   return (
      <button className={finalClass} onClick={() => handleClick()}>
         {text || "Enviar"}
      </button>
   );
}
