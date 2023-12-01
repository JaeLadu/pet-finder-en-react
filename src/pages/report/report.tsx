import { TextInput } from "components/textInput/textInput";
import React, { FormEvent, useEffect, useState } from "react";
import { Title } from "ui/title/title";
import css from "./report.css";
import { DropzoneComp } from "components/dropzoneComp/dropzoneComp";
import { Button } from "components/button/button/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
   useCheckActiveUser,
   userSearchCoordinatesState,
   userSearchLocationState,
   userTokenState,
} from "hooks";
import { MapBox } from "components/mapbpx/Mapbox";
import { useNavigate } from "react-router-dom";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002";

export function CreateReport() {
   useCheckActiveUser(); //redirects to /login if there is no user token info
   const navigate = useNavigate();
   const [location, setLocation] = useState({ lat: "", lng: "" });
   const token = useRecoilValue(userTokenState);
   const [imageURL, setImageURL] = useState("");
   const [reportObject, setReportObject] = useState({});
   const [backendResponse, setBackendResponse] = useState(
      {} as { reportId: number; message: string; error: string }
   );
   const [doneMessage, setDoneMessage] = useState("");
   const [doneMessageStyle, setDoneMessageStyle] = useState(css.donemessage);

   let [doneFlag, setDoneFlag] = useState(false);
   let inputString = "";

   //map neccesary hooks, searching locations and clicks moving marker
   const setSearch = useSetRecoilState(userSearchLocationState);
   const searchCoords = useRecoilValue(userSearchCoordinatesState);
   const [mapboxProps, setMapboxProps] = useState({ lat: 0, lng: 0 });
   useEffect(() => {
      if (searchCoords.lat) {
         setMapboxProps({ ...searchCoords });
      }
   }, [searchCoords]);

   useEffect(() => {
      async function sendReport() {
         try {
            const response = await fetch(`${backendURL}report`, {
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
      if (doneFlag) {
         sendReport();
      }
   }, [reportObject]);

   useEffect(() => {
      if (backendResponse.reportId) {
         setDoneMessage(backendResponse.message);
         const finalMessageStyle = [doneMessageStyle];
         finalMessageStyle.push(css.showok);
         setDoneMessageStyle(finalMessageStyle.join(" "));
         setTimeout(() => navigate("/reports"), 1000);
      }
      if (backendResponse.error) {
         setDoneMessage(backendResponse.message);
         const finalMessageStyle = [doneMessageStyle];
         finalMessageStyle.push(css.showerror);
         setDoneMessageStyle(finalMessageStyle.join(" "));
      }
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
                  setReportObject({
                     ...location,
                     dataURL: imageURL,
                     name: name,
                  });
                  setDoneFlag(true);
               } else {
                  setDoneMessage("Falta algo");
                  const finalMessageStyle = [doneMessageStyle];
                  finalMessageStyle.push(css.showerror);
                  setDoneMessageStyle(finalMessageStyle.join(" "));
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
            <MapBox handleClick={(e) => setLocation(e)} center={mapboxProps} />
            <span className={...doneMessageStyle}>{doneMessage}</span>

            <div className={css.button}>
               <Button color="green" text="Reportar mascota" />
            </div>
         </form>
      </div>
   );
}
