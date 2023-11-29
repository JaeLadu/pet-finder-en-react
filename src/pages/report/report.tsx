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
import { Link } from "react-router-dom";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002";

export function CreateReport() {
   useCheckActiveUser(); //redirects to /login if there is no user token info
   const [location, setLocation] = useState({ lat: "", lng: "" });
   const token = useRecoilValue(userTokenState);
   const [imageURL, setImageURL] = useState("");
   const [reportObject, setReportObject] = useState({});
   const [backendResponse, setBackendResponse] = useState({});
   let readyToSendFlag = false;
   let inputString = "";

   //map neccesary hooks, searching locations and clicks moving marker
   const setSearch = useSetRecoilState(userSearchLocationState);
   const searchCoords = useRecoilValue(userSearchCoordinatesState);
   const [mapboxProps, setMapboxProps] = useState([]);
   useEffect(() => {
      if (searchCoords.lat) {
         setMapboxProps([searchCoords.lat, searchCoords.lng]);
      }
   }, [searchCoords]);

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

   //modificar mostrar mensaje con la respuesta del back
   useEffect(() => {
      console.log(backendResponse);
   }, [backendResponse]);

   return (
      <div className={css.root}>
         <Link to={"/createreport/1"}>R1</Link>

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
            <MapBox handleClick={(e) => setLocation(e)} center={mapboxProps} />
            <div className={css.button}>
               <Button color="green" text="Reportar mascota" />
            </div>
         </form>
      </div>
   );
}
