import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./button.css";

type buttonProps = {
   text?: string;
   color?: "red" | "green" | "black";
   handleClick?: () => any;
   type?: "button" | "submit" | "reset" | undefined;
};

export function Button({
   text,
   color,
   type,
   handleClick = () => {},
}: buttonProps) {
   const basicClass = [css.button];
   if (color) {
      basicClass.push(css[color]);
   }
   const finalClass = basicClass.join(" ");

   return (
      <button
         type={type ? type : "submit"}
         className={finalClass}
         onClick={() => handleClick()}
      >
         {text || "Enviar"}
      </button>
   );
}
