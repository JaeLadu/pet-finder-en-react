import { Button } from "components/button/button/button";
import { TextInput } from "components/textInput/textInput";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "ui/title/title";
import css from "./personalData.css";
import { useCheckActiveUser, userTokenState } from "hooks";
import { useRecoilValue } from "recoil";
import { Caption } from "ui/caption/caption";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002/";

export function PersonalData() {
   useCheckActiveUser();
   const navigate = useNavigate();
   const token = useRecoilValue(userTokenState);
   const [userData, setUserData] = useState(
      {} as { name: string; city: string }
   );
   const [doneFlag, setDoneFlag] = useState(false);
   const [backendResponse, setBackendResponse] = useState(
      {} as { response: boolean; ok: boolean }
   );
   const [errorMessage, setErrorMessage] = useState("");
   const [messageClass, setMessageClass] = useState(css.message);

   let currentName;
   let currentCity;

   useEffect(() => {
      //gets the user data to dispplay in placeholders
      async function getUserData() {
         const response = await fetch(`${backendURL}user`, {
            method: "GET",
            headers: {
               Authorization: `bearer ${token}`,
            },
         });
         const data = await response.json();
         setUserData(data);
      }
      getUserData();
   }, []);

   useEffect(() => {
      //sends new user data to backend
      async function updateUserData() {
         const response = await fetch(`${backendURL}user`, {
            method: "PATCH",
            headers: {
               "Content-type": "application/json",
               Authorization: `bearer ${token}`,
            },
            body: JSON.stringify(userData),
         });
         if (response.ok) setBackendResponse({ response: true, ok: true });
         else setBackendResponse({ response: true, ok: false });
      }
      if (doneFlag) {
         updateUserData();
      }
   }, [userData, doneFlag]);

   useEffect(() => {
      if (backendResponse.response && backendResponse.ok) {
         setErrorMessage("Datos actualizados");
         setMessageClass(css.messageok);
         setTimeout(() => {
            navigate("/profile");
         }, 1000);
      }
      if (backendResponse.response && !backendResponse.ok) {
         setErrorMessage("Algo salió mal");
         setMessageClass(css.messageerror);
      }
   }, [backendResponse]);

   return (
      <div className={css.root}>
         {/* terminar conectar con el backend */}
         <Title text="Datos personales" />
         <form
            className={css.form}
            onSubmit={(e) => {
               e.preventDefault();
               //Check in case info is empty
               let newData = userData;
               if (currentName) newData = { ...newData, name: currentName };
               if (currentCity) newData = { ...newData, city: currentCity };

               setUserData(newData);
               setDoneFlag(true);
            }}
         >
            <div className={css.inputscontainer}>
               <TextInput
                  name="name"
                  text="Nombre"
                  placeholder={userData.name}
                  handleInput={(input) => {
                     currentName = (input.target as HTMLInputElement).value;
                  }}
               />
               <TextInput
                  name="location"
                  text="Localidad"
                  placeholder={userData.city}
                  handleInput={(input) => {
                     currentCity = (input.target as HTMLInputElement).value;
                  }}
               />
            </div>
            <span className={messageClass}>
               <Caption text={errorMessage} />
            </span>
            <Button
               text="Guardar"
               handleClick={() => {
                  // navigate("/profile");
               }}
            />
         </form>
      </div>
   );
}
