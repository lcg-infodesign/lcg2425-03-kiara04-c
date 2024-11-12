let riversData;
let dropSize = 200;
let v_padding = 300; //verticale
let o_padding = 20; //orizzontale

function preload() {
  riversData = loadTable("../assets/Data.CSV", "csv", "header");
}

function setup() {
  let totalHeight = dropSize * 20 + v_padding * 7;
  let totalWidth = dropSize * 5 + o_padding * 20;
  createCanvas(totalWidth, totalHeight);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  //funzione goccia
  push();
  translate(50, 0);
  waterDrop();
  pop();
}

function riverNames(){
  //nomi fiumi
  fill("black");
  noStroke();
  textSize(16);
  
  for(let i=0; i<riversData.getRowCount(); i++){
    let riverNames = riversData.getString(n, "name");
    let offset = i * 220;
    text(riverNames[n], 223 + offset, 360 + n * 220);
  }
}

function waterDrop(offsetX, off) {
  fill("lightblue");
  noStroke();
  let curvePerRiga = 5;
  let distanzaTraCurve = 220; //distanza orizzontale
  //numero righe necessarie
  for (let i = 0; i < riversData.getRowCount(); i++) {
    //colonne e righe
    let colonna = i % curvePerRiga;
    let riga = Math.floor(i / curvePerRiga);
    //offset orizzontale e verticale
    let offsetX = colonna * distanzaTraCurve;
    let offsetY = riga * 300;
    //disegna curva
    bezier(223 + offsetX, 60 + offsetY,
           0 + offsetX, 300 + offsetY,
           450 + offsetX, 300 + offsetY,
           223 + offsetX, 60 + offsetY);
  }
  fill("black");
  noStroke();
  textSize(16);
  text("ciao", 20, 20);
  textAlign(CENTER, CENTER);
  let riverNames = riversData.getString(n, "name");
  let offset = i * 220;
  text(riverNames[n], 223 + offset, 380 + n * 220);

  // Disegno dei pallini colorati per continente
  for (let i = 0; i < riversData.getRowCount(); i++) {
    let offsetX = i * 220;
    // Recupero il continente dal CSV
    let continent = riversData.getString(i, "continent").toLowerCase();
    // Ottieni il colore associato al continente
    let circleColor = getContinentColor(continent);
    // Disegna il pallino sopra la curva
    fill(circleColor);
    noStroke();
    ellipse(223 + offsetX, 50, 15, 15);  // Pallino di 15px di diametro
  }
}

// Funzione per mappare i continenti ai colori
function getContinentColor(continent) {
  if (continent === 'africa') {
    return color("red");
  } else if (continent === 'asia') {
    return color("blue");
  } else if (continent === 'europe') {
    return color("green");
  } else if (continent === 'south america') {
    return color("yellow");
  } else if (continent === 'north america') {
    return color("orange");
  } else if (continent === 'oceania') {
    return color("purple");
  }
}
