import React from "react";
import { Header } from "components/header/header";
import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";
import { Home } from "pages/home/home";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Header />}>
         <Route index element={<Home />}></Route>
      </Route>
   )
);

export { router };
