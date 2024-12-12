//assistance taken from The coding train to understand concepts, Youtube - https://www.youtube.com/watch?v=hokTcLVtZs8, https://www.youtube.com/watch?v=bpEJrfOiqZg, https://www.youtube.com/watch?v=qZ2toGfv7ZQ, and chatGPT to help customize my code 

let grapeData;
let grapeCounts = {};
let grapes = [];
let margin = 50;
let grapeImage;

function preload() {
  // loading the CSV file
  grapeData = loadTable('WineDataset.csv', 'csv', 'header');
  
  // load grape image
  grapeImage = loadImage('grape.png'); // grape image
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("project"); // to host this project on GitHub
  background(255, 230, 250);

  // count the names of each grape type and create circles
  for (let r = 0; r < grapeData.getRowCount(); r++) {
    let grapeType = grapeData.getString(r, 'Grape');
    grapeCounts[grapeType] = (grapeCounts[grapeType] || 0) + 1;
  }

  // find max and min counts
  let counts = Object.values(grapeCounts);
  let maxCount = Math.max(...counts);
  let minCount = Math.min(...counts);
  let maxSize = 200;
  let minSize = 50;

  // generate circles with random positions and random colors in each refresh
  for (let grapeType in grapeCounts) {
    let count = grapeCounts[grapeType];
    let size = map(count, minCount, maxCount, minSize, maxSize);
    let pos = getRandomPosition(size);

    grapes.push({
      grapeType,
      size,
      posX: pos.x,
      posY: pos.y
    });
  }
}

function draw() {
  background(255, 230, 250);

  for (let grape of grapes) {
    imageMode(CENTER);
    image(grapeImage, grape.posX, grape.posY, grape.size, grape.size);

    // to xheck if the mouse is over this circle
    let d = dist(mouseX, mouseY, grape.posX, grape.posY);
    if (d < grape.size / 2) {
      // grape name with a white highlight when hovering
      textSize(14);
      textAlign(CENTER, CENTER);

      // Calculate the dimensions of the text
      let textWidthValue = textWidth(grape.grapeType) + 10; // Add padding
      let textHeightValue = 20;

      // draw the white rectangle behind the text
      fill(255);
      noStroke();
      rectMode(CENTER);
      rect(grape.posX, grape.posY - grape.size / 2 - 10, textWidthValue, textHeightValue);

      // draw the text
      fill(70);
      text(grape.grapeType, grape.posX, grape.posY - grape.size / 2 - 10);
      cursor(HAND); // change cursor to hand when hovering
    } else {
      cursor(ARROW); // reset cursor when not hovering
    }
  }
}

// random position for grapes, with no overlap
function getRandomPosition(size) {
  let posX, posY, overlap;
  do {
    posX = random(margin + size / 2, width - margin - size / 2);
    posY = random(margin + size / 2, height - margin - size / 2);
    overlap = grapes.some(grape => dist(posX, posY, grape.posX, grape.posY) < (grape.size / 2 + size / 2));
  } while (overlap);
  return { x: posX, y: posY };
}
