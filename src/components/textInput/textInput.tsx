import React from "react";
import { Caption } from "ui/caption/caption";
import css from "./textInput.css";

type props = {
   text?: string;
   name: string;
   placeholder?: string;
};

export function TextInput({ text, name, placeholder }: props) {
   return (
      <label className={css.label}>
         {text && <Caption text={text} />}
         <input
            className={css.input}
            type="text"
            name={name}
            placeholder={placeholder && placeholder}
         />
      </label>
   );
}
