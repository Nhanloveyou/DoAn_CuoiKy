import './App.css';
import React, {useEffect, useRef} from 'react';
// import {Howl} from 'howler';
const mobilenet = require('@tensorflow-models/mobilenet');
const tf = require('@tensorflow/tfjs');
const knnClassifier = require('@tensorflow-models/knn-classifier');


/*Buoc1
*Buoc2 
*@param {*} label
*Run
*/

const NOT_LEFT_LABEL = 'not_left';
const LEFT_LABEL = 'left'
const TIMES = 50;
const LEFT_CONFIDENCES = 0.66;

function App() {
  const video = useRef();
  const classifier = useRef();
  const mobilenetModule = useRef();


  const init = async () => {
    console.log('init...');
    await setupCamera();
    console.log('Setup thành công');

    classifier.current = knnClassifier.create();

    mobilenetModule.current = await mobilenet.load();

    console.log('Setup OK');
    console.log('Dont leave the screen and press train 1');
  }

  const setupCamera = () => {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      if(navigator.getUserMedia){
        navigator.getUserMedia(
          { video: true},
          stream => {
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata', resolve);
          },
          error => reject(error)
        );
      } else{
        reject()
      }
    });  
  }

  const train = async label => {
    // console.log(label);
    console.log(`[${label} Training for model ]`)
    for(let i = 0; i< TIMES; ++i){
      console.log(`Progress ${parseInt((i+1)/TIMES * 100)}%`);

      await training(label);
    }
  }

  const training = label => {
    return new Promise(async resolve => {
      const embedding = mobilenetModule.current.infer(
        video.current,
        true
      );
      classifier.current.addExample(embedding, label);
      await sleep(100);
      resolve();
    }) ;
  }

  const run = async () => {
    const embedding = mobilenetModule.current.infer(
      video.current,
      true
    );
    const result = await classifier.current.predictClass(embedding);

    // console.log('Label: ', result.label);
    // console.log('Confidences: ', result.confidences);

    if(
      result.label === LEFT_LABEL &&
      result.confidences[result.label] > LEFT_CONFIDENCES
      ){
        console.log('LEFT');
    } else{
      console.log('NOT LEFT');
    }

    await sleep(200);

    run();
  }

  const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    init();


    return () => {

    }
  }, [])

  return (
    <div className="main">
      <h1>Machine Learning For Web</h1>
      <video 
        ref={video}
        className="video"
        autoPlay
      />

      <div className="control">
        <button className="btn" onClick={() => train(NOT_LEFT_LABEL)}>Train 1</button>
        <button className="btn" onClick={() => train(LEFT_LABEL)}>Train 2</button>
        <button className="btn" onClick={() => run()}>Run </button>
      </div>
    </div>
  );
}

export default App;
