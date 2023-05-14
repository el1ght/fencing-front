import { FollowedContextProvider } from "@/components/FollowedContext";
import mongoose from "mongoose";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');
  body{
    padding: 0;
    margin: 0;
    font-family: 'Italiana', serif;
    font-size: 20px;
    background-color: #fff2d4;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <FollowedContextProvider>
        <Component {...pageProps} />
      </FollowedContextProvider>
    </>
  )
}