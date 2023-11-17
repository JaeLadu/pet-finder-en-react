import React, { Suspense } from "react";
import { Header } from "components/header/header";
import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";
import { Home } from "pages/home/home";
import { ChooseLocation } from "pages/choose-location/chooseLocation";
import { Profile } from "pages/profile/profile";
import { PersonalData } from "pages/personalData/personalData";
import { Password } from "pages/password/password";
import { LogIn } from "pages/logIn/logIn";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Header />}>
         <Route index element={<Home />}></Route>
         <Route path="/choose-location" element={<ChooseLocation />}></Route>
         <Route path="/profile" element={<Profile />}></Route>
         <Route path="/personal-data" element={<PersonalData />}></Route>
         <Route path="/password" element={<Password />}></Route>
         <Route path="/login" element={<LogIn />}></Route>
      </Route>
   )
);

export { router };
