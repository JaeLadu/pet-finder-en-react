import { useEffect, useState } from "react";
import { atom, selector } from "recoil";

const headerMenuState = atom({
   key: "headerMenuState",
   default: false,
});
const reportFormState = atom({
   key: "reportFormState",
   default: false,
});

const logInDataState = atom({
   key: "logInDataState",
   default: { mail: "", password: "" },
});

const userTokenState = selector({
   key: "userTokenState",
   get: async ({ get }) => {
      const userData = get(logInDataState);
      let response = "";
      if (!userData.mail) return response;
      else {
         const result = await fetch(`http://localhost:3002/auth/signin`, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
         });

         const data = await result.json();
         response = data;
      }
      return response;
   },
});
const userLocationState = atom({
   key: "userLocationState",
   default: {
      lat: "",
      lng: "",
   },
});

const petsInAreaState = selector({
   key: "petsInAreaState",
   get: async ({ get }) => {
      const location = get(userLocationState);
      if (!location.lat) return [];
      else {
         const response = await fetch(
            `http://localhost:3002/reports/location?lat=${location.lat}&lng=${location.lng}`
         );
         const data = await response.json();
         const parsedPets = await Promise.all(
            data.map(async (pet) => {
               const areaResponse = await fetch(
                  //usa la API de mapbox para obtener el nombre del area usando coordenadas
                  `https://api.mapbox.com/geocoding/v5/mapbox.places/${pet.lng},${pet.lat}.json?access_token=pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A`
               );
               const areaData = await areaResponse.json();

               return {
                  id: pet.id,
                  name: pet.name,
                  img: pet.imageUrl,
                  location: areaData.features[2]?.place_name,
                  own: false,
               };
            })
         );
         return parsedPets;
      }
   },
});

const selectedPetId = atom({
   key: "selectedPetId",
   default: 0,
});

const currentPet = selector({
   key: "currentPet",
   get: ({ get }) => {
      const id = get(selectedPetId);
      const pets = get(petsInAreaState);

      const wantedPet = pets.find((pet) => pet.id == id);

      return wantedPet;
   },
});

export {
   headerMenuState,
   logInDataState,
   userTokenState,
   userLocationState,
   petsInAreaState,
   reportFormState,
   selectedPetId,
   currentPet,
};
