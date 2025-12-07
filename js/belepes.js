window.addEventListener("DOMContentLoaded", () => {
    const regForm = document.getElementById("regForm");

    if (!regForm) {
        console.error("Hiba: A regisztrációs form (id='regForm') nem található!");
        return;
    }

    // Ellenőrizzük, van-e már mentett adat
    const teljesNev = sessionStorage.getItem("teljesNev");
    const becenev = sessionStorage.getItem("becenev");
    const karakterNev = sessionStorage.getItem("karakterNev");

    if (teljesNev && becenev && karakterNev) {
        const regDiv = document.getElementById("regisztracio");
        if (regDiv) regDiv.style.display = "none";

        displayNames(teljesNev, becenev, karakterNev);
    }

    regForm.addEventListener("submit", saveName);
});

function saveName(e) {
    e.preventDefault();

    const errorMsg = document.getElementById("errorMsg");
    if (errorMsg) errorMsg.textContent = "";

    const teljesNev = getValue("teljesNev");
    const becenev = getValue("becenev");
    const karakterNev = getValue("karakterNev");
    const szulDatum = getValue("szulDatum");
    const email = getValue("email");
    const jelszo = getValue("jelszo");
    const jelszo2 = getValue("jelszo2");

    // --- Validáció ---
    if (teljesNev.length < 3) return showError("A teljes név legalább 3 karakter legyen!");
    if (becenev.length < 2) return showError("A becenév legalább 2 karakter legyen!");
    if (karakterNev.length < 2) return showError("A karakternév legalább 2 karakter legyen!");
    if (!szulDatum || new Date(szulDatum) > new Date()) return showError("Érvényes születési dátumot adj meg!");
    if (!validateEmail(email)) return showError("Érvényes email címet adj meg!");
    if (jelszo.length < 6) return showError("A jelszó legalább 6 karakter legyen!");
    if (jelszo !== jelszo2) return showError("A jelszavak nem egyeznek!");

    // --- Mentés ---
    sessionStorage.setItem("teljesNev", teljesNev);
    sessionStorage.setItem("becenev", becenev);
    sessionStorage.setItem("karakterNev", karakterNev);

    const regDiv = document.getElementById("regisztracio");
    if (regDiv) regDiv.style.display = "none";

    displayNames(teljesNev, becenev, karakterNev);

    // --- Redirect ---
    window.location.href = "../html/mainpage.html";
}

// --- Segédfüggvények ---
function getValue(id) {
    const elem = document.getElementById(id);
    return elem ? elem.value.trim() : "";
}

function showError(msg) {
    const error = document.getElementById("errorMsg");
    if (error) error.textContent = msg;
    return false;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function displayNames(teljesNev, becenev, karakterNev) {
    document.querySelectorAll(".nev").forEach(e => e.textContent = teljesNev);
    document.querySelectorAll(".becenev-display").forEach(e => e.textContent = becenev);
    document.querySelectorAll(".karakternev-display").forEach(e => e.textContent = karakterNev);
}
