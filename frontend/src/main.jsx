import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createGlobalStyle } from "styled-components";
import { Toaster } from "react-hot-toast";
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <GlobalStyle />
      <Toaster position="top-center" reverseOrder={true} />
      <App />
    </>
  </StrictMode>
);
