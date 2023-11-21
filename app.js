let recorder;
let audioPlayer = document.getElementById("audio-player");

function handleFileSelect(input) {
  const file = input.files[0];
  if (file) {
    stopRecording();
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.style.display = "block";
  }
}

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        audioPlayer.src = URL.createObjectURL(audioBlob);
        audioPlayer.style.display = "block";
      };

      recorder.start();
    })
    .catch(error => console.error("Error accessing microphone:", error));
}

function stopRecording() {
  if (recorder && recorder.state === 'recording') {
    recorder.stop();
  }
}

function playRecording() {
  if (audioPlayer.src) {
    audioPlayer.play();
  }
}
