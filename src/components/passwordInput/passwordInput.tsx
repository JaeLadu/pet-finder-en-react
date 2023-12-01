import React from "react";
import { Caption } from "ui/caption/caption";
import css from "./passwordInput.css";

type props = {
   text?: string;
   name?: string;
   handleInput?: (input: React.FormEvent<HTMLInputElement>) => any;
};

export function PasswordInput({ text, name, handleInput = () => {} }: props) {
   return (
      <label className={css.label}>
         {text && <Caption text={text} />}
         <input
            onChange={(input) => handleInput(input)}
            className={css.input}
            type="password"
            name={name || "password"}
         />
      </label>
   );
}
