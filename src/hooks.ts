import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
const backendURL = process.env.BACKEND_URL || "http://localhost:3002/";

//mapbox token
const ACCESS_TOKEN =
   "pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A";

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
         const result = await fetch(`${backendURL}auth/signup`, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
         });

         const data = await result.json();
         response = data.token;
      } else {
         const result = await fetch(`${backendURL}auth/signin`, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
         });

         const data = await result.json();
         response = data.token;
      }
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

export const userSearchLocationState = atom({
   key: "userSearchLocationState",
   default: "",
});

export const userSearchCoordinatesState = selector({
   key: "userSearchCoordinatesState",
   get: async ({ get }) => {
      const search = get(userSearchLocationState);
      if (search) {
         const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${ACCESS_TOKEN}`
         );
         const data = await response.json();
         return {
            lng: data.features[0].center[1],
            lat: data.features[0].center[0],
         };
      } else {
         return {
            lng: "",
            lat: "",
         };
      }
   },
});

// modificar borrar si no se usa
// export function useChangeLocationFromString() {
//    const setLocation = useSetRecoilState(userLocationState);
//    const search = useRecoilValue(userSearchLocationState);
//    const coordinates = useRecoilValue(userSearchCoordinatesState);

//    useEffect(() => {
//       setLocation(coordinates);
//    }, [search]);
// }
type rawPet = {
   id: number;
   name: string;
   imageUrl: string;
   lat: string;
   lng: string;
};

async function parsePets(pets: rawPet[]) {
   return await Promise.all(
      pets.map(async (pet) => {
         const areaResponse = await fetch(
            //usa la API de mapbox para obtener el nombre del area usando coordenadas
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${pet.lat},${pet.lng}.json?access_token=pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A`
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
}

export const petsInAreaState = selector({
   key: "petsInAreaState",
   get: async ({ get }) => {
      const location = get(userLocationState);
      if (!location.lat) return [];
      else {
         const response = await fetch(
            `${backendURL}reports/location?lat=${location.lat}&lng=${location.lng}`
         );
         const data = await response.json();
         const parsedPets = parsePets(data);
         return parsedPets;
      }
   },
});

export const userPetsState = selector({
   key: "userPets",
   get: async ({ get }) => {
      const token = get(userTokenState);
      if (!token) return [];
      else {
         const response = await fetch(`${backendURL}reports`, {
            method: "get",
            headers: {
               "Content-Type": "application/json",
               Authorization: `bearer ${token}`,
            },
         });
         const data = await response.json();
         const parsedPets = parsePets(data);
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

export const targetLocationState = atom({
   key: "targetLocation",
   default: "",
});
export function useCheckActiveUser() {
   const setTargetLocation = useSetRecoilState(targetLocationState);
   const location = useLocation();
   const token = useRecoilValue(userTokenState);
   const navigate = useNavigate();
   useEffect(() => {
      setTargetLocation(location.pathname);

      if (!token) {
         navigate("/login");
      }
   }, [token]);
}
