let mediaRecorder;
let audioChunks = [];

document.getElementById('recordButton').addEventListener('click', startRecording);
document.getElementById('stopButton').addEventListener('click', stopRecording);

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = function (e) {
                if (e.data.size > 0) {
                    audioChunks.push(e.data);
                }
            };

            mediaRecorder.onstop = function () {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                document.getElementById('audioPlayer').src = audioUrl;

                // Enable file input for uploading
                document.getElementById('fileInput').disabled = false;
            };

            mediaRecorder.start();
            document.getElementById('recordButton').disabled = true;
            document.getElementById('stopButton').disabled = false;
        })
        .catch(function (err) {
            console.error('Error accessing microphone:', err);
        });
}

function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('recordButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}
