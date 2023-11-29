import {
   useCheckActiveUser,
   userSearchCoordinatesState,
   userSearchLocationState,
} from "hooks";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "ui/title/title";
import { TextInput } from "components/textInput/textInput";
import { DropzoneComp } from "components/dropzoneComp/dropzoneComp";
import { Button } from "components/button/button/button";
import { MapBox } from "components/mapbpx/Mapbox";
import css from "../report/report.css";
import { useSetRecoilState, useRecoilValue } from "recoil";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002";

export function EditReport() {
   useCheckActiveUser();
   const params = useParams();
   const [petData, setPetData] = useState({
      name: "",
      imageUrl: "",
      lat: 0,
      lng: 0,
      id: 0,
   });
   const [doneFlag, setDoneFlag] = useState(false);

   let inputString = ""; //necesary to prevent page from updating on every keypress and using the complete data once te user clicks search/buscar

   useEffect(() => {
      //gets the report number from params and fetches its data, then y sets a state with that data
      async function fetchReport() {
         const response = await fetch(`${backendURL}/report/${params.id}`);
         const data = await response.json();
         setPetData(data.report); //El back devuelve un objeto que adentro tiene otro objeto report, el cual tiene la data que necesito
      }
      fetchReport();
   }, [params]);

   useEffect(() => {
      //sends de new data to de server, once de form is submited
      if (doneFlag) {
         console.log(petData);
      }
   }, [petData]);

   //map neccesary hooks, searching locations and clicks moving marker
   const setSearch = useSetRecoilState(userSearchLocationState);
   const searchCoords = useRecoilValue(userSearchCoordinatesState);
   const [mapboxProps, setMapboxProps] = useState([]);
   useEffect(() => {
      if (searchCoords.lat) {
         setMapboxProps([searchCoords.lat, searchCoords.lng]);
      }
      if (petData.lat) {
         setMapboxProps([petData.lng, petData.lat]);
      }
   }, [searchCoords, petData.lat]);

   return (
      <div className={css.root}>
         <Title text={`Editar reporte de ${petData.name}`} />
         <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
               e.preventDefault();
               const name = (
                  e.currentTarget.elements.namedItem("name") as HTMLInputElement
               ).value;

               if (name) {
                  setPetData({ ...petData, name });
               }

               setDoneFlag(true);
            }}
            className={css.form}
         >
            <TextInput text="Nombre" name="name" placeholder={petData.name} />
            <DropzoneComp
               handleFile={(file) => {
                  setPetData({ ...petData, imageUrl: file.dataURL });
               }}
               preview={petData.imageUrl}
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
            <MapBox
               handleClick={(e) => setPetData({ ...petData, ...e })}
               center={mapboxProps}
            />
            <div className={css.button}>
               <Button
                  color="green"
                  text={`Editar reporte de ${petData.name}`}
               />
            </div>
         </form>
      </div>
   );
}
