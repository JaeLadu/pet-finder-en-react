import React from "react";
import { Header } from "components/header/header";
import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";
import { Home } from "pages/home/home";
import { ChooseLocation } from "pages/choose-location/chooseLocation";
import { Profile } from "pages/profile/profile";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Header />}>
         <Route index element={<Home />}></Route>
         <Route path="/choose-location" element={<ChooseLocation />}></Route>
         <Route path="/profile" element={<Profile />}></Route>
      </Route>
   )
);

export { router };
