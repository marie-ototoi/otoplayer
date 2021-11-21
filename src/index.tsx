import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Player from "./components/Player";
import reportWebVitals from "./reportWebVitals";
const tracks = [
  {
    duration: 30,
    url: "/tracks/texte_30.mp3",
  },
  {
    duration: 90,
    url: "/tracks/texte_60.mp3",
  },
  {
    duration: 65,
    url: "/tracks/texte_30.mp3",
  },
];

ReactDOM.render(
  <React.StrictMode>
    <Player tracks={tracks} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
