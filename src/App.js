import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '../node_modules/@tensorflow/tfjs';
import jsonData from './word2vec.json';
const loadJsonData = () => JSON.parse(JSON.stringify(jsonData));
let word2index = loadJsonData();

const loadModel = () => {
  return tf.loadLayersModel(
    'http://localhost:3000/tensorflowjs_converted/model.json',
  );
};
const sentenceToArray = sentence => {
  let array = Array(2000).fill(0);
  for (let word of sentence.split()) {
    if (word.toLowerCase() in word2index) {
      array[word2index[word.toLowerCase()]]++;
    }
  }
  return array;
};
tf.tidy(() => {
  loadModel().then(model => {
    console.log(model);
    const tfArray = sentenceToArray('sexual sex gay fake crimes');
    console.log(tf.tensor(tfArray).expandDims(0));
    model
      .predict(tf.tensor(tfArray).expandDims(0))
      .data()
      .then(predictions => {
        const resultIdx = tf.argMax(predictions).dataSync()[0];
        console.log(predictions, resultIdx);
      });
  });
});

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
