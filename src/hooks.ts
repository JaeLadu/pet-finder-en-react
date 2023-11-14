import { atom } from "recoil";

const headerMenuState = atom({
   key: "headerMenuState",
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
   default: {
      lat: "",
      lng: "",
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

export {
   headerMenuState,
   userEmailState,
   userTokenState,
   userLocationState,
   petsInAreaState,
   parsedPetsState,
};
