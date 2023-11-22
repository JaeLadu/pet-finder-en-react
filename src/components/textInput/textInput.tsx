import React from "react";
import { Caption } from "ui/caption/caption";
import css from "./textInput.css";

type props = {
   text?: string;
   name: string;
   placeholder?: string;
   handleInput?: (input: React.FormEvent<HTMLInputElement>) => any;
};

export function TextInput({
   text,
   name,
   placeholder,
   handleInput = () => {},
}: props) {
   return (
      <label className={css.label}>
         {text && <Caption text={text} />}
         <input
            onInput={(input) => handleInput(input)}
            className={css.input}
            type="text"
            name={name}
            placeholder={placeholder && placeholder}
         />
      </label>
   );
}
