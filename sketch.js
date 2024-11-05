//assistance taken from The coding train to understand concepts, Youtube - https://www.youtube.com/watch?v=hokTcLVtZs8, https://www.youtube.com/watch?v=bpEJrfOiqZg, https://www.youtube.com/watch?v=qZ2toGfv7ZQ, and chatGPT to help customize my code 

let grapeData;
let grapeCounts = {};
let circles = [];
let margin = 50; 

function preload() {
  // Load the CSV file
  grapeData = loadTable('WineDataset.csv', 'csv', 'header');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("project"); // To host this project on github
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
  let minSize = 20;

  // generate circles with random positions and random colors in each refresh
  for (let grapeType in grapeCounts) {
    let count = grapeCounts[grapeType];
    let diameter = map(count, minCount, maxCount, minSize, maxSize);
    let pos = getRandomPosition(diameter);

    circles.push({
      grapeType,
      diameter,
      posX: pos.x,
      posY: pos.y,
      color: color(random(255), random(255), random(255), 150) // random color for each grape type
    });
  }
}

function draw() {
  background(255, 230, 250); 

  noStroke();
  
  for (let circle of circles) {
    fill(circle.color); 
    ellipse(circle.posX, circle.posY, circle.diameter, circle.diameter);

    // check if the mouse is over this circle
    let d = dist(mouseX, mouseY, circle.posX, circle.posY);
    if (d < circle.diameter / 2) {
      // display grape name when hovering
      fill(70);
      textSize(14);
      textAlign(CENTER, CENTER);
      text(circle.grapeType, circle.posX, circle.posY);
      cursor(HAND); // change cursor to hand when hovering
    } else {
      cursor(ARROW); // reset cursor when not hovering
    }
  }
}

// get random position for circle, ensuring no overlap
function getRandomPosition(diameter) {
  let posX, posY, overlap;
  do {
    posX = random(margin + diameter / 2, width - margin - diameter / 2);
    posY = random(margin + diameter / 2, height - margin - diameter / 2);
    overlap = circles.some(circle => dist(posX, posY, circle.posX, circle.posY) < (circle.diameter / 2 + diameter / 2));
  } while (overlap);
  return { x: posX, y: posY };
}

