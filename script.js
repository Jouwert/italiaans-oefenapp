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
      } else {
        console.log("Geen werkwoorden gevonden.");
      }
    })
    .catch((error) => {
      console.error("Error ophalen werkwoorden:", error);
    });
}

// Event listener voor toevoegen werkwoord
document.getElementById('toevoegen').addEventListener('click', function() {
  const nieuwWerkwoord = {
    infinitief: document.getElementById('nieuwWerkwoord').value,
    vervoegingen: {
      io: document.getElementById('io').value,
      tu: document.getElementById('tu').value,
      lui_lei: document.getElementById('lui_lei').value,
      noi: document.getElementById('noi').value,
      voi: document.getElementById('voi').value,
      loro: document.getElementById('loro').value
    }
  };
  voegWerkwoordToe(nieuwWerkwoord);
});

// Haal werkwoorden op bij laden van de pagina
document.addEventListener('DOMContentLoaded', haalWerkwoordenOp);
