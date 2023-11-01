import { atom } from "recoil";

const headerMenuState = atom({
   key: "headerMenuState",
   default: false,
});

export { headerMenuState };
