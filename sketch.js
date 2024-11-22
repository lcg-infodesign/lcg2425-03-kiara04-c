let data;
let dataObj;

function preload() {
  data = loadTable("assets/riverData.csv", "csv", "header");
}

// colori
let pageColor = "#17374c";
let circleColor = "#61a5bc";
let lineColor = "#61a5bc";
let textColor = "#cde0e7";
let dotColor = "#61a5bc";
let circleSize = 130;
let padding = 20;

function setup() {
  let totalHeight = 120 + circleSize * 2 * data.getRowCount() + padding * data.getRowCount();
  let totalWidth = circleSize * 11;
  createCanvas(totalWidth, totalHeight);
  background(pageColor);
  dataObj = data.getObject();

  let xPos = padding + circleSize * 2 + 100;
  let yPos = padding + circleSize;
  //ciclo for per disegnare un glifo per ogni riga
  for (let i = 0; i < data.getRowCount(); i++) {
    //carico i dati della riga
    let item = dataObj[i];
    drawGlyph(xPos, yPos, circleSize, item);
    yPos = yPos + padding + circleSize * 2;
  }
}

function draw() {
  //animare i pallini
  for (let i = 0; i < droplets.length; i++) {
    droplets[i].move(); // Muovi i pallini
    droplets[i].display(); // Disegna i pallini
  }
}

function drawGlyph(x, y, size, rowData) {
  //disegno sfondo
  fill(circleColor);
  noStroke();
  beginShape();
  vertex(x, y - size + 50);  // Punta della goccia
  bezierVertex(x - size / 2, y - size / 4 + 10, x - size / 2, y + size / 2, x, y + size / 2); // Curva sinistra
  bezierVertex(x + size / 2, y + size / 2, x + size / 2 , y - size / 4 + 10, x, y - size + 50); // Curva destra
  endShape(CLOSE);
  //lunghezza
  stroke(circleColor);
  strokeWeight (6);
  drawWavyLine(x + 100, y + 50, rowData.length);
  fill(textColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(rowData.length + 'km', x, y + size / 2 + 50);
  //scrivo il nome
  fill(textColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(rowData.name, x, y + 90);
  // temperatura massima
  let numDroplets = rowData.max_temp;
  for (let j = 0; j < numDroplets; j++) {
    // posizione casuale all'interno della goccia
    let angle = random(TWO_PI);
    let radius = random(size / 3);
    let xPos = x + cos(angle) * radius;
    let yPos = y + sin(angle) * radius;
    fill(dotColor);
    strokeWeight(2);
    stroke("#cde0e7");
    ellipse(xPos, yPos, 6, 6);
  }
  fill(textColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(rowData.max_temp + '°', x, y - size / 2 - 30);
}

function drawWavyLine(startX, startY, length) {
  let waveAmplitude = 10;  // altezza
  let waveFrequency = 0.05;  // frequenza dell'onda
  stroke(lineColor);
  strokeWeight(3);
  noFill();
  let waveLength = length * 0.1;
  beginShape();
  for (let x = startX; x < startX + waveLength; x++) {
    // altezza dell'onda con funzione seno
    let yOffset = waveAmplitude * sin(waveFrequency * (x - startX));  // offset y
    vertex(x, startY + yOffset);
  }
  endShape();
}