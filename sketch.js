let data;
let dataObj;

function preload() {
  data = loadTable("assets/Data.CSV", "csv", "header");
}

let circleSize = 130;
let padding = 20;
let maxCirclesPerRow = 5; // Numero di cerchi per riga

function setup() {
  let totalHeight = circleSize * 40 + padding * 20;
  let totalWidth = circleSize * 10;
  createCanvas(totalWidth, totalHeight);
  background("white");
  dataObj = data.getObject();

  // Posizione iniziale
  let xPos = padding + circleSize / 2;
  let yPos = padding + circleSize;
  for (let i = 0; i < data.getRowCount(); i++) {
    let item = dataObj[i];
    // Disegno il cerchio
    push();
    translate (220, 0);
    drawGlyph(xPos, yPos, circleSize, item);
    pop();
    // Posizione successiva
    if ((i + 1) % maxCirclesPerRow === 0) {
      xPos = padding + circleSize / 2;
      yPos += circleSize * 2 + padding;
    } else {
      xPos += circleSize + padding * 4;
    }
  }
}

function draw() {
}

function drawGlyph(x, y, size){
  let Names = data.getColumn('name');
  let Continent = data.getColumn('continent');
  //let fillHeight = 0;  // Altezza del riempimento
  
  // Disegno il cerchio con sfondo
  fill("lightblue");
  noStroke();
  ellipse(x, y, size, size);
  // Scrivo il nome sotto il cerchio
  fill("black");
  noStroke();
  textAlign (CENTER, CENTER);
  textSize(16);
  text (Names, x, y + padding + (circleSize / 2));
  textSize(12);
  text(Continent, x, y + padding * 2 + (circleSize / 2));

  // Livello per portata
  //fill(100, 150, 255, 150);
  //angleMode(DEGREES);
  //arc(x, y, size, size, -PI / 2, map(0, fillHeight, size, -PI / 2, PI / 2), OPEN);
  
  let Portata = data.getColumn('discharge');
  for (let j = 0; j < Portata; j++) {
    //disegna pallini
    noStroke();
    fill(100, 150, 255, 150);
    // Creo angolo casuale
    let angle = random(TWO_PI);
    let radius = random(size / 2);
    push();
    //mi pongo al centro del glifo
    translate(x, y);
    //ruoto in base alla variabile angle
    rotate(angle);
    //mi sposto in funzione del raggio
    translate(radius, 0);
    // disegno il pallino
    ellipse(0, 0, 2, 2);
    //ripristino assi
    pop();
  }
}
