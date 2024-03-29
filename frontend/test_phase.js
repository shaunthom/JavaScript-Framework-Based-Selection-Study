document.addEventListener('DOMContentLoaded', function() {
    // references to the HTML elements used in the script
    const startButton = document.getElementById('start');
    const recordButton = document.getElementById('record');
    const nextButton = document.getElementById('next');
    const stopButton = document.getElementById('stop');
    const instructionsDiv = document.getElementById('instructions');
    const testContentDiv = document.getElementById('test-content');
    const testImage = document.getElementById('test-image');
    const recordingStatus = document.getElementById('recording-status');

    // some variables to manage the experiment's state
    let currentImageIndex = 0;
    let mediaRecorder;
    let audioChunks = [];
    // retrieves participant ID from local storage (similiar to comprehension.js script)
    let participantId = localStorage.getItem('participantId');

    let images = [
        { src: 'components/pictures/karve.jpg', label: 'karve'},
        { src: 'components/pictures/kiskis.jpg', label: 'kiskis' },
        { src: 'components/pictures/knyga.jpg', label: 'knyga'},
        { src: 'components/pictures/medis.jpg', label: 'medis' },
        { src: 'components/pictures/meska.jpg', label: 'meska'},
        { src: 'components/pictures/namas.jpg', label: 'namas' },
        { src: 'components/pictures/raktas.jpg', label: 'raktas'},
        { src: 'components/pictures/tigras.jpg', label: 'tigras' },
        { src: 'components/pictures/tortas.jpg', label: 'tortas'},
        { src: 'components/pictures/vista.jpg', label: 'vista' },
        { src: 'components/pictures/voras.jpg', label: 'voras' },
        { src: 'components/pictures/karve.jpg', label: 'karve'},
        { src: 'components/pictures/kiskis.jpg', label: 'kiskis' },
        { src: 'components/pictures/knyga.jpg', label: 'knyga'},
        { src: 'components/pictures/medis.jpg', label: 'medis' },
        { src: 'components/pictures/meska.jpg', label: 'meska'},
        { src: 'components/pictures/namas.jpg', label: 'namas' },
        { src: 'components/pictures/raktas.jpg', label: 'raktas'},
        { src: 'components/pictures/tigras.jpg', label: 'tigras' },
        { src: 'components/pictures/tortas.jpg', label: 'tortas'},
        { src: 'components/pictures/vista.jpg', label: 'vista' },
        { src: 'components/pictures/voras.jpg', label: 'voras' }
    ];

    // Function to shuffle the array of images in a pseudo random order
    function shuffleArray(array) {
        
        let indices = array.map((_, index) => index);       
        let shuffled = [];
    
        while (indices.length > 0) {
            let randomIndex = Math.floor(Math.random() * indices.length);
            let chosenIndex = indices[randomIndex];

            // Avoids consecutive items with the same label to ensure pseudo random order
            if (shuffled.length === 0 || array[chosenIndex].label !== array[shuffled[shuffled.length - 1]].label) {
                shuffled.push(chosenIndex);
                indices.splice(randomIndex, 1);
            } else if (indices.length === 1) {
                [shuffled[shuffled.length - 1], shuffled[shuffled.length - 2]] = [shuffled[shuffled.length - 2], shuffled[shuffled.length - 1]];
                shuffled.push(chosenIndex);
                break;
            }
        }

        return shuffled.map(index => array[index]);
    }

    // Function to start the experiment, initialize media recorder and display images
    function startTest() {
        // Requesting access to the user's microphone
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                // initializes the MediaRecorder with the obtained audio stream
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                // actions to take when recording stops
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

                    // Send the audio data to the XAMPP server
                    sendAudioToServer(audioBlob, currentImageIndex + 1);
                    audioChunks = []; // Resetting chunks for the next recording
                
                     // If we've reached the end of the images array, conclude the audio phase
                    if (currentImageIndex >= images.length - 1) {
                        concludeAudioPhase();
                    } else {
                        nextButton.style.display = 'block';
                    }
                };

                // Hide instructions and display the test content
                instructionsDiv.style.display = 'none';
                testContentDiv.style.display = 'block';
                images = shuffleArray(images);
                displayImage();
            })
            // Error-handling mechanisms
            .catch(error => console.error('Error accessing media devices:', error));
    }

    // Function to display the current image in the test sequence
    function displayImage() {
        if (currentImageIndex < images.length) { 
            const image = images[currentImageIndex];
            testImage.src = image.src;
            testImage.alt = `Image: ${image.label}`;
            recordButton.style.display = 'inline';
            recordingStatus.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            concludeAudioPhase();
        }
    }

    // Function to conclude the audio recording phase and move to the next phase
    function concludeAudioPhase() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.onstop = redirectToComprehension;
            mediaRecorder.stop();
        } else {
            redirectToComprehension();
        }
    }

    // Function to redirect to the comprehension phase after completing the audio phase
    function redirectToComprehension() {
        testContentDiv.innerHTML = '<p>Audio Phase completed!</p>';
        console.log("Redirecting to comprehension.html");
        setTimeout(() => {
            window.location.href = 'comprehension.html';
        }, 2000); // Wait 2 seconds to allow user to see the completion message
    }

    // Event listeners for button clicks to start recording, stop recording, and move through the experiment
    startButton.addEventListener('click', startTest);

    recordButton.addEventListener('click', function() {
        startRecording();
        stopButton.style.display = 'inline';
    });

    stopButton.addEventListener('click', function() {
        stopRecording();
        stopButton.style.display = 'none';
    });

    nextButton.addEventListener('click', function() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
            concludeAudioPhase();
        } else {
            displayImage();
        }
    });

    // Function to handle the start of recording
    function startRecording() {
        if (mediaRecorder && mediaRecorder.state === "inactive") {
            mediaRecorder.start();
            recordingStatus.style.display = 'block';
            console.log('Recording started for ' + images[currentImageIndex].label);
            recordButton.style.display = 'none';
        }
    }

    // Function to handle the stop of recording
    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            recordingStatus.style.display = 'none';
            recordButton.style.display = 'inline';
            stopButton.style.display = 'none';
        }
    }

    // Function to send the audio recording to the XAMPP server for storage
    function sendAudioToServer(audioBlob, trialId) {
        
        const formData = new FormData();
        formData.append('audio_data', audioBlob);
        formData.append('participant_id', participantId);
        formData.append('trial_id', trialId.toString());
        const imageLabel = images[currentImageIndex].label;
        formData.append('trial_name', imageLabel);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        fetch('http://localhost/my_project/handle_audio_upload.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error uploading audio:', error));
    }

    // Once recording stops, process the recorded audio blob, reset audio chunks, and either conclude 
    //the audio phase or prepare for the next recording

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const trialId = currentImageIndex + 1;
        sendAudioToServer(audioBlob, trialId);
        audioChunks = []; // Resetting chunks for the next recording

        if (currentImageIndex >= images.length - 1) {
            concludeAudioPhase();
        } else {
            nextButton.style.display = 'block';
        }
    };

    // function to conclude the audio phase
    function concludeAudioPhase() {
        testContentDiv.innerHTML = '<p>Audio Phase completed!</p>';
        console.log("Attempting to redirect...");
        setTimeout(() => {
            window.location.href = 'comprehension.html';
        }, 2000); // Delay before redirection to ensure user sees the message "Audio Phase completed!"
    }

    // Event listener for navigating to the next image (or concluding the experiment)
    nextButton.addEventListener('click', function() {
        currentImageIndex++;
        if (currentImageIndex < images.length) {
            displayImage();
        } else {
            stopRecording();
        }
    });
});