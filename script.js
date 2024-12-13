// Get elements for the background menu and video control
const openMenuButton = document.getElementById('openMenuButton');
const backgroundMenu = document.getElementById('backgroundMenu');
const closeMenuButton = document.getElementById('closeMenuButton');
const backgroundVideo = document.getElementById('backgroundVideo');
const card = document.getElementById('card'); // Get the card element
const audioElement = document.getElementById("audioPlayer");
const playPauseButton = document.getElementById("playPauseButton");

// Open the background menu when the button is clicked
openMenuButton.addEventListener('click', () => {
    card.style.display = 'block';  // Show the card (which contains the menu)
    card.style.position = 'absolute';
    card.style.top = '75px';
    card.style.right = '35px';
});

// Close the background menu when the close button is clicked
closeMenuButton.addEventListener('click', () => {
    card.style.display = 'none';  // Hide the card (which contains the menu)
});

// Apply the selected background video
const backgroundOptions = document.querySelectorAll('.background-option');
backgroundOptions.forEach(option => {
    option.addEventListener('click', () => {
        const newBackground = option.getAttribute('data-background');
        backgroundVideo.src = newBackground; // Change the background video source
        backgroundVideo.load(); // Reload the video
        backgroundVideo.play(); // Play the new video
        // Do not close the menu, allowing further selections
    });
});

// Number of MP3 files in the folder (in your case, 440)
const totalSongs = 440; 

// Path for the MP3 files (adjust the folder path if necessary)
const folderPath = "assets/music/";

// Generate a list of song file paths based on the numbered files
const songs = [];
for (let i = 1; i <= totalSongs; i++) {
  songs.push(`${folderPath}${i}.mp3`);
}

// Function to select and play a random song
function playRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length); // Generate random index
  audioElement.src = songs[randomIndex]; // Select the random song
  audioElement.load(); // Reload the audio element with the new song
  audioElement.play().catch(error => {
    console.error("Error playing audio:", error);
  }); // Play the song and catch any errors
}

// Play the first random song when the page loads
window.addEventListener("load", playRandomSong);

// Function to play the next random song
function playNextRandomSong() {
  playRandomSong(); // Call the random song function again
}

function togglePlayPause() {
    // Check if the audio is currently paused or playing
    if (audioElement.paused) {
      audioElement.play(); // Play the audio
      playPauseButton.innerText = "Pause"; // Change button text to "Pause"
    } else {
      audioElement.pause(); // Pause the audio
      playPauseButton.innerText = "Play"; // Change button text to "Play"
    }
  }
  
  // Add an event listener to the button to toggle play/pause on click
  playPauseButton.addEventListener("click", togglePlayPause);

// Event listener to automatically play the next random song when the current one ends
audioElement.addEventListener("ended", playRandomSong);

// Event listener to play next random song on button click
document.querySelector('button[onclick="playNextRandomSong()"]').addEventListener('click', playNextRandomSong);
