// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9JQg87ftbYgJx6dj51SDXgBwDWUgENJ8",
  authDomain: "italiaans-oefenapp.firebaseapp.com",
  databaseURL: "https://italiaans-oefenapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "italiaans-oefenapp",
  storageBucket: "italiaans-oefenapp.appspot.com",
  messagingSenderId: "723444937647",
  appId: "1:723444937647:web:6558cd487e4d851f90755a",
  measurementId: "G-22QNVQH9M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Functie om werkwoorden op te slaan
function voegWerkwoordToe(nieuwWerkwoord) {
  const werkwoordRef = ref(db, 'werkwoorden/' + nieuwWerkwoord.infinitief);
  set(werkwoordRef, nieuwWerkwoord)
    .then(() => {
      console.log("Werkwoord toegevoegd:", nieuwWerkwoord);
      haalWerkwoordenOp();  // Herlaad de lijst van werkwoorden
    })
    .catch((error) => {
      console.error("Error toevoegen werkwoord:", error);
    });
}

// Functie om werkwoorden op te halen
function haalWerkwoordenOp() {
  const werkwoordenRef = ref(db, 'werkwoorden/');
  get(werkwoordenRef)
    .then((snapshot) => {
      const lijstElement = document.getElementById('werkwoordenLijst');
      lijstElement.innerHTML = '';  // Maak de lijst leeg
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const key in data) {
          const werkwoord = data[key];
          lijstElement.innerHTML += `<p>${werkwoord.infinitief}: ${werkwoord.vervoegingen.io}, ${werkwoord.vervoegingen.tu}, ${werkwoord.vervoegingen.lui_lei}, ${werkwoord.vervoegingen.noi}, ${werkwoord.vervoegingen.voi}, ${werkwoord.vervoegingen.loro}</p>`;
        }
        beginOefenen(data);  // Begin met oefenen
      } else {
        console.log("Geen werkwoorden gevonden.");
      }
    })
    .catch((error) => {
      console.error("Error ophalen werkwoorden:", error);
    });
}

// Functie om te oefenen met een willekeurig werkwoord
function beginOefenen(werkwoorden) {
  const keys = Object.keys(werkwoorden);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const oefenWerkwoord = werkwoorden[randomKey];

  document.getElementById('oefenWerkwoord').innerText = `Werkwoord: ${oefenWerkwoord.infinitief}`;
  document.getElementById('oefenSectie').style.display = 'block';

  document.getElementById('controleerAntwoorden').onclick = function() {
    controleerAntwoorden(oefenWerkwoord);
  };

  document.getElementById('nieuwOefenWerkwoord').onclick = function() {
    beginOefenen(werkwoorden);
  };
}

// Functie om de antwoorden te controleren
function controleerAntwoorden(oefenWerkwoord) {
  const feedbackElement = document.getElementById('oefenFeedback');
  const io = document.getElementById('oefenIo').value;
  const tu = document.getElementById('oefenTu').value;
  const luiLei = document.getElementById('oefenLuiLei').value;
  const noi = document.getElementById('oefenNoi').value;
  const voi = document.getElementById('oefenVoi').value;
  const loro = document.getElementById('oefenLoro').value;

  let feedback = "Resultaten: ";
  feedback += io === oefenWerkwoord.vervoegingen.io ? "1e pers. enkelv. goed. " : "1e pers. enkelv. fout. ";
  feedback += tu === oefenWerkwoord.vervoegingen.tu ? "2e pers. enkelv. goed. " : "2e pers. enkelv. fout. ";
  feedback += luiLei === oefenWerkwoord.vervoegingen.lui_lei ? "3e pers. enkelv. goed. " : "3e pers. enkelv. fout. ";
  feedback += noi === oefenWerkwoord.vervoegingen.noi ? "1e pers. meerv. goed. " : "1e pers. meerv. fout. ";
  feedback += voi === oefenWerkwoord.vervoegingen.voi ? "2e pers. meerv. goed. " : "2e pers. meerv. fout. ";
  feedback += loro === oefenWerkwoord.vervoegingen.loro ? "3e pers. meerv. goed. " : "3e pers. meerv. fout. ";

  feedbackElement.innerText = feedback;
}

// Event listener voor toevoegen werkwoord
document.getElementById('toevoegen').addEventListener('click', function()
