import React from "react";
import { Caption } from "ui/caption/caption";
import css from "./passwordInput.css";

type props = {
   text?: string;
   name?: string;
};

export function PasswordInput({ text, name }: props) {
   return (
      <label className={css.label}>
         {text && <Caption text={text} />}
         <input
            className={css.input}
            type="password"
            name={name || "password"}
         />
      </label>
   );
}
