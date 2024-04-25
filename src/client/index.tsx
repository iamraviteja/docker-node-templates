import React from "react";

import "./styles/global.css";

import App from "@client/App";
import { BrowserRouter } from "react-router-dom";
import { hydrateRoot } from "react-dom/client";

hydrateRoot(
  document.getElementById("root") as Element,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
