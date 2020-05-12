const URL = "https://teachablemachine.withgoogle.com/models/h-si-Fp9e/";
      
      async function createModel() {
          const checkpointURL = URL + "model.json";
          const metadataURL = URL + "metadata.json";
  
          const recognizer = speechCommands.create(
              "BROWSER_FFT",
              undefined,
              checkpointURL,
              metadataURL);
  
          await recognizer.ensureModelLoaded();
  
          return recognizer;
      }

      init();
    
      async function init() {
          const recognizer = createModel();
          const recognizer = await createModel();
          const classLabels = recognizer.wordLabels();
          const labelContainer = document.getElementById("label-container");
          for (let i = 0; i < classLabels.length; i++) {
              labelContainer.appendChild(document.createElement("div"));
          }
      }

      async function record(){
        recognizer.listen(result => {
              const scores = result.scores; 
              for (let i = 1; i < classLabels.length; i++) {
                  const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
                  labelContainer.childNodes[i].innerHTML = classPrediction;
              }
          }, {
              includeSpectrogram: true,
              probabilityThreshold: 0.75,
              invokeCallbackOnNoiseAndUnknown: true,
              overlapFactor: 0.50
          });
      }
  
          
          // setTimeout(() => recognizer.stopListening(), 5000);

      async function stop(){
        recognizer.stopListening();
      }