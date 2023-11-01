import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { router } from "router";

const root = createRoot(document.querySelector(".root")!);
root.render(
   <RecoilRoot>
      <RouterProvider router={router} />
   </RecoilRoot>
);
