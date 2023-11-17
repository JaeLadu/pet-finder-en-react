import { atom, selector } from "recoil";

export const headerMenuState = atom({
   key: "headerMenuState",
   default: false,
});

export const reportFormState = atom({
   key: "reportFormState",
   default: false,
});

export const logInDataState = atom({
   key: "logInDataState",
   default: { mail: "", password: "" },
});

export const newUserState = atom({
   key: "newUserState",
   default: false,
});

export const userTokenState = selector({
   key: "userTokenState",
   get: async ({ get }) => {
      const userData = get(logInDataState);
      const newUser = get(newUserState);

      let response = "";

      if (!userData.mail) return response;
      if (newUser) {
         const result = await fetch(`http://localhost:3002/auth/signup`, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
         });

         const data = await result.json();
         // eliminar
         response = data.token || "token de mentira";
      } else {
         const result = await fetch(`http://localhost:3002/auth/signin`, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
         });

         const data = await result.json();
         response = data.token;
      }
      console.log(response);

      return response;
   },
});
export const userLocationState = atom({
   key: "userLocationState",
   default: {
      lat: "",
      lng: "",
   },
});

type rawPet = {
   id: number;
   name: string;
   imageUrl: string;
   lat: string;
   lng: string;
};
export const petsInAreaState = selector({
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
            data.map(async (pet: rawPet) => {
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

export const selectedPetId = atom({
   key: "selectedPetId",
   default: 0,
});

export const currentPet = selector({
   key: "currentPet",
   get: ({ get }) => {
      const id = get(selectedPetId);
      const pets = get(petsInAreaState);

      const wantedPet = pets.find((pet) => pet.id == id);

      return wantedPet;
   },
});
