const horses = [
  {
    name: "Nehéz ló",
    maxWeight: 150,
    weight: 800,
    description: "Robosztus, lassú, nagy teherbírású",
    examples: "Clydesdale, Shire, Percheron"
  },
  {
    name: "Közepes ló",
    maxWeight: 120,
    weight: 600,
    description: "Erős, gyorsabb, általános célú",
    examples: "Hanoveri, Trakehner, Holsteini"
  },
  {
    name: "Könnyű ló",
    maxWeight: 90,
    weight: 450,
    description: "Gyors, mozgékony, elegendő kitartás",
    examples: "Arab, Thoroughbred, Quarter horse"
  },
  {
    name: "Mini/póni",
    maxWeight: 50,
    weight: 250,
    description: "Kicsi, könnyű, gyengébb fizikai erő",
    examples: "Shetlandi póni, Falabella"
  },
];

function getHorseCategory(weight) {
  if (weight >= 700) return "Nehéz terhelésű";
  if (weight >= 500) return "Közepes terhelésű";
  if (weight >= 350) return "Könnyű terhelésű";
  if (weight >= 250) return "Könnyű terhelésű";
  else return "Nem létezik"
}

function calculate() {
  const horseWeightInput = parseFloat(document.getElementById("horseWeight").value);
  const riderWeight = parseFloat(document.getElementById("riderWeight").value);
  const result = document.getElementById("result");
  const resultDiv = document.getElementById("horseResults");

  result.textContent = "";
  resultDiv.innerHTML = "";

  if (!riderWeight || riderWeight <= 0) {
    result.textContent = "Kérlek, adj meg egy érvényes lovas testsúlyt!";
    return;
  }

  // Ha a ló testsúlya meg van adva, számítja a ratio-t
  if (horseWeightInput && horseWeightInput > 0) {
    const ratio = (riderWeight / horseWeightInput) * 100;
    result.textContent = `A lovas a ló testsúlyának ${ratio.toFixed(1)}%-a. `;

    if (ratio > 20) {
      result.textContent += "⚠️ Ez már túl sok lehet a lónak!";
    } else if (ratio > 15) {
      result.textContent += "🙂 Ez a felső határ körül van.";
    } else {
      result.textContent += "✅ Ez biztonságos arány.";
    }

    const category = getHorseCategory(horseWeightInput);
    result.textContent += ` A ló kategóriája: ${category}.`;
  }

  // Lovak ajánlása a megadott lovas testsúly alapján
  horses.forEach(horseObj => {
    const p = document.createElement("p");
    const category = getHorseCategory(horseObj.weight);

    if (riderWeight <= horseObj.maxWeight) {
      p.textContent = `${horseObj.name} (${category}) - ${horseObj.description}. Példák: ${horseObj.examples} ✅`;
      p.style.color = "green";
    } else {
      p.textContent = `${horseObj.name} (${category}) - ${horseObj.description}. Példák: ${horseObj.examples} ⚠️`;
      p.style.color = "red";
    }
    resultDiv.appendChild(p);
  });
}
