import React, { FormEvent, useEffect, useState } from "react";
import { TextInput } from "components/textInput/textInput";
import { Button } from "components/button/button/button";
import { Title } from "ui/title/title";
import { Caption } from "ui/caption/caption";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPet, reportFormState } from "hooks";
import css from "./reportForm.css";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002/";

export function ReportForm() {
   const [show, setShow] = useRecoilState(reportFormState); //global state used to show or hide the component
   const [cssClass, setCssClass] = useState(css.container); //local state, used to change components css display from none to flex and back
   const pet = useRecoilValue(currentPet); //global state used to know wich pet is being reported and all its data

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const name = (
         e.currentTarget.elements.namedItem("name") as HTMLInputElement
      ).value;
      const phone = (
         e.currentTarget.elements.namedItem("phone") as HTMLInputElement
      ).value;
      const message = (
         e.currentTarget.elements.namedItem("message") as HTMLInputElement
      ).value;
      const data = {
         name: name,
         phone: phone,
         message: message,
         id: pet?.id,
      };

      const response = await fetch(`${backendURL}report/${data.id}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });
      console.log(response);
   }

   useEffect(() => {
      if (show) {
         const newClass = `${css.container} ${css.showcontainer}`;
         setCssClass(newClass);
      } else {
         setCssClass(css.container);
      }
   }, [show]);

   return (
      <div className={cssClass}>
         <span //close button
            onClick={() => setShow(false)}
            className="material-symbols-outlined"
         >
            close
         </span>
         <form className={css.form} onSubmit={(e) => handleSubmit(e)}>
            <Title text={"Reportar info de " + pet?.name} />
            <TextInput text="Nombre" name="name" />
            <TextInput text="Teléfono" name="phone" />
            <label>
               <Caption text="Donde lo viste" />
               <textarea
                  className={css.textarea}
                  name="message"
                  cols={30}
                  rows={10}
               />
            </label>
            <Button handleClick={() => setCssClass(css.container)} />
         </form>
      </div>
   );
}
