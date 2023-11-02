import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./button.css";

type buttonProps = {
   text?: string;
   color?: "red" | "green" | "black";
   target: string;
};

export function Button({ text, color, target }: buttonProps) {
   const navigate = useNavigate();

   const basicClass = [css.button];
   if (color) {
      basicClass.push(css[color]);
   }
   const finalClass = basicClass.join(" ");

   return (
      <button className={finalClass} onClick={() => navigate(target)}>
         {text || "Enviar"}
      </button>
   );
}
