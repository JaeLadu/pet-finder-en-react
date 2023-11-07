import { useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
const backendUrl = "http://localhost:3002";

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
      lat: "-31.42018385939361",
      lng: "-64.50775531330464",
   },
});

const petsInAreaState = atom({
   key: "petsInAreaState",
   default: [
      {
         id: "",
         name: "",
         imageUrl: "",
         area: "",
      },
   ],
});

export {
   headerMenuState,
   userEmailState,
   userTokenState,
   userLocationState,
   petsInAreaState,
};
