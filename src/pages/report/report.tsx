import { TextInput } from "components/textInput/textInput";
import React from "react";
import { Title } from "ui/title/title";
import css from "./report.css";
import { DropzoneComp } from "components/dropzoneComp/dropzoneComp";

export function CreateReport() {
   return (
      <div className={css.root}>
         <Title text="Reportar mascota" />
         <form className={css.form}>
            <TextInput text="Nombre" name="name" />
            <DropzoneComp handleFile={() => {}} />
         </form>
      </div>
   );
}
