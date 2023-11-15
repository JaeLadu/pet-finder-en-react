import { atom, selector } from "recoil";

const headerMenuState = atom({
   key: "headerMenuState",
   default: false,
});
const reportFormState = atom({
   key: "reportFormState",
   default: false,
});

const userEmailState = atom({
   key: "userEmailState",
   default: "",
});

const userTokenState = atom({
   key: "userTokenState",
   default: "",
});
const userLocationState = atom({
   key: "userLocationState",
   // modificar volver a valores en blanco por defecto
   default: {
      lat: "-31.4206811324999",
      lng: "-64.52184666111962",
   },
});

const petsInAreaState = atom({
   key: "petsInAreaState",
   default: [
      {
         id: 0,
         name: "",
         imageUrl: "",
         lat: "",
         lng: "",
         UserId: "",
      },
   ],
});

const parsedPetsState = atom({
   key: "parsedPetsState",
   default: [
      {
         id: 0,
         name: "",
         img: "",
         location: "",
         own: false,
      },
   ],
});

const selectedPetId = atom({
   key: "selectedPetId",
   default: 0,
});

const currentPet = selector({
   key: "currentPet",
   get: ({ get }) => {
      const id = get(selectedPetId);
      const pets = get(parsedPetsState);

      const wantedPet = pets.find((pet) => pet.id == id);

      return wantedPet;
   },
});

export {
   headerMenuState,
   userEmailState,
   userTokenState,
   userLocationState,
   petsInAreaState,
   parsedPetsState,
   reportFormState,
   selectedPetId,
   currentPet,
};
