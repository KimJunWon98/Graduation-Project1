// script.js

document.addEventListener('DOMContentLoaded', function () {
    const recordButton = document.getElementById('recordButton');
    const stopButton = document.getElementById('stopButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const fileInput = document.getElementById('fileInput');

    let mediaRecorder;
    let audioChunks = [];

    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = function () {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayer.src = audioUrl;

            // Reset recording-related variables
            audioChunks = [];
            mediaRecorder = null;

            // Enable/disable buttons
            recordButton.disabled = false;
            stopButton.disabled = true;
        };

        mediaRecorder.start();
        recordButton.disabled = true;
        stopButton.disabled = false;
    }

    function stopRecording() {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    }

    // Handle file input change event
    fileInput.addEventListener('change', function (event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            audioPlayer.src = URL.createObjectURL(selectedFile);
        }
    });
});
