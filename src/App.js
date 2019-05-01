import React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as tf from "../node_modules/@tensorflow/tfjs";

const loadModel = () => {
  return tf.loadLayersModel(
    "http://localhost:3000/tensorflowjs_converted/model.json"
  );
};
loadModel().then(model => console.log(model));

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
