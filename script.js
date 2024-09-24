// Lijst met werkwoorden en vervoegingen voor alle personen
const werkwoorden = [
    {
        infinitief: "parlare",
        type: "zwak",
        vervoegingen: {
            io: "parlo",
            tu: "parli",
            lui_lei: "parla",
            noi: "parliamo",
            voi: "parlate",
            loro: "parlano"
        }
    },
    {
        infinitief: "andare",
        type: "sterk",
        vervoegingen: {
            io: "vado",
            tu: "vai",
            lui_lei: "va",
            noi: "andiamo",
            voi: "andate",
            loro: "vanno"
        }
    },
    {
        infinitief: "mangiare",
        type: "zwak",
        vervoegingen: {
            io: "mangio",
            tu: "mangi",
            lui_lei: "mangia",
            noi: "mangiamo",
            voi: "mangiate",
            loro: "mangiano"
        }
    }
    // Voeg meer werkwoorden toe als je wilt
];

let huidigWerkwoord = null;
let personen = ["io", "tu", "lui_lei", "noi", "voi", "loro"];

// Functie om een willekeurig werkwoord te kiezen en de vraag te stellen
function startOefening() {
    const filter = document.getElementById('filterType').value;
    let gefilterdeWerkwoorden = werkwoorden;

    // Filter werkwoorden op sterk of zwak
    if (filter !== "alle") {
        gefilterdeWerkwoorden = werkwoorden.filter(w => w.type === filter);
    }

    let randomWerkwoordIndex = Math.floor(Math.random() * gefilterdeWerkwoorden.length);
    let randomPersoonIndex = Math.floor(Math.random() * personen.length);

    huidigWerkwoord = gefilterdeWerkwoorden[randomWerkwoordIndex];
    let persoon = personen[randomPersoonIndex];

    // Stel de vraag op basis van de willekeurige persoon en het werkwoord
    document.getElementById('vraag').innerText = `Wat is de vervoeging van "${huidigWerkwoord.infinitief}" voor "${persoon}"?`;
    huidigWerkwoord.correctAntwoord = huidigWerkwoord.vervoegingen[persoon];

    // Reset de feedback
    document.getElementById('feedback').innerText = "";
}

// Functie om het antwoord te controleren
function controleerAntwoord() {
    const antwoord = document.getElementById('antwoord').value;
    const feedback = document.getElementById('feedback');

    if (antwoord === huidigWerkwoord.correctAntwoord) {
        feedback.innerText = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.innerText = `Fout! Het juiste antwoord is: ${huidigWerkwoord.correctAntwoord}`;
        feedback.style.color = "red";
    }

    document.getElementById('antwoord').value = ""; // Leeg het invoerveld
}

// Event Listener voor de knop 'Start Oefening'
document.getElementById('start').addEventListener('click', startOefening);

// Event Listener voor de knop 'Controleer'
document.getElementById('controleer').addEventListener('click', controleerAntwoord);

// Functie om een nieuw werkwoord toe te voegen
document.getElementById('toevoegen').addEventListener('click', function() {
    const nieuwWerkwoord = {
        infinitief: document.getElementById('nieuwWerkwoord').value,
        type: "zwak", // Je kunt hier een extra veld toevoegen om type te kiezen als je wilt
        vervoegingen: {
            io: document.getElementById('io').value,
            tu: document.getElementById('tu').value,
            lui_lei: document.getElementById('lui_lei').value,
            noi: document.getElementById('noi').value,
            voi: document.getElementById('voi').value,
            loro: document.getElementById('loro').value
        }
    };

    // Voeg het nieuwe werkwoord toe aan de lijst
    werkwoorden.push(nieuwWerkwoord);

    // Leeg de invoervelden
    document.getElementById('nieuwWerkwoord').value = "";
    document.getElementById('io').value = "";
    document.getElementById('tu').value = "";
    document.getElementById('lui_lei').value = "";
    document.getElementById('noi').value = "";
    document.getElementById('voi').value = "";
    document.getElementById('loro').value = "";

    alert("Werkwoord toegevoegd!");
});
