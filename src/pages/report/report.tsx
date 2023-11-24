import { TextInput } from "components/textInput/textInput";
import React, {
   FormEvent,
   ReactEventHandler,
   useEffect,
   useState,
} from "react";
import { Title } from "ui/title/title";
import css from "./report.css";
import { DropzoneComp } from "components/dropzoneComp/dropzoneComp";
import { Button } from "components/button/button/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
   useChangeLocationFromString,
   userLocationState,
   userSearchLocationState,
   userTokenState,
} from "hooks";
import { MapBox } from "components/mapbpx/Mapbox";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002";

export function CreateReport() {
   const location = useRecoilValue(userLocationState);
   const token = useRecoilValue(userTokenState);
   const [imageURL, setImageURL] = useState("");
   const [reportObject, setReportObject] = useState({});
   const [backendResponse, setBackendResponse] = useState({});
   let readyToSendFlag = false;
   let inputString = "";
   const setSearch = useSetRecoilState(userSearchLocationState);
   useChangeLocationFromString();

   async function sendReport() {
      try {
         const response = await fetch(`${backendURL}/report`, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
               Authorization: `bearer ${token}`,
            },
            body: JSON.stringify(reportObject),
         });
         const data = await response.json();
         setBackendResponse(data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if (readyToSendFlag) {
         sendReport();
      }
   }, [reportObject]);

   useEffect(() => {
      console.log(backendResponse);
   }, [backendResponse]);
   return (
      <div className={css.root}>
         <Title text="Reportar mascota" />
         <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
               e.preventDefault();
               const name = (
                  e.currentTarget.elements.namedItem("name") as HTMLInputElement
               ).value;

               if (location.lat && imageURL && name) {
                  (readyToSendFlag = true),
                     setReportObject({
                        ...location,
                        dataURL: imageURL,
                        name: name,
                     });
               } else {
                  console.log("falta algo");
               }
            }}
            className={css.form}
         >
            <TextInput text="Nombre" name="name" />
            <DropzoneComp
               handleFile={(file) => {
                  setImageURL(file.dataURL);
               }}
            />
            <TextInput
               handleInput={(input) => {
                  inputString = (input.target as HTMLInputElement).value;
               }}
               name="search"
            />
            <div className={css.button}>
               <Button
                  text="Buscar"
                  type="button"
                  handleClick={() => {
                     setSearch(inputString);
                  }}
               />
            </div>
            <MapBox />
            <div className={css.button}>
               <Button color="green" text="Reportar mascota" />
            </div>
         </form>
      </div>
   );
}
