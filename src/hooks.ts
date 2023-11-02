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

export { headerMenuState, userEmailState, userTokenState };
