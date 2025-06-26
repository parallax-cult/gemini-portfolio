// Define main color palette
let backgroundColor;
let blueDark;
let redAccent;
let textDark;

// Array to hold dot objects for the "DEBA DESSE" interaction
let dotGrid = [];
let dotSpacingX;
let dotSpacingY;
let dotBaseRadius;
let dotMaxRadius;
let dotInfluenceRadius; // How far the mouse influences the dots

// Canvas dimensions (aspect ratio ~1:1.6, similar to the original image)
let canvasWidth = 600;
let canvasHeight = 960;

// Bounding box dimensions for main compositional elements (proportional)
// Left text block (DEBA DESSE area)
let textBlockX, textBlockY, textBlockW, textBlockH;
// Right statue/architecture area
let statueAreaX, statueAreaY, statueAreaW, statueAreaH;
// "2020" text position and size
let yearTextX, yearTextY, yearTextSize;
// Red dots & line positions and size
let redDot1Pos, redDot2Pos, redDot3Pos;
let redDotRadius;
// Main blue text "OMFATTAR SJÄLVKLARE" position, width, height, and size
let mainBlueTextX, mainBlueTextY, mainBlueTextW, mainBlueTextH, mainBlueTextSize;
// Red circle seal position and radius
let redSealX, redSealY, redSealRadius;
// Lower left texture/statue detail area
let lowerLeftTextureX, lowerLeftTextureY, lowerLeftTextureW, lowerLeftTextureH;
// Smaller lower right text position, width, height, and size
let lowerRightTextX, lowerRightTextY, lowerRightTextW, lowerRightTextH, lowerRightTextSize;


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  // Initialize colors
  backgroundColor = color(235, 227, 210); // Light beige
  blueDark = color(50, 60, 100); // Dark desaturated blue
  redAccent = color(200, 50, 50); // Vibrant red
  textDark = color(60, 60, 70); // Dark grey/blue for "DEBA DESSE" background

  // Define proportional dimensions for compositional elements
  textBlockX = width * 0.05;
  textBlockY = height * 0.20;
  textBlockW = width * 0.35;
  textBlockH = height * 0.40;

  statueAreaX = width * 0.45;
  statueAreaY = height * 0.05;
  statueAreaW = width * 0.50;
  statueAreaH = height * 0.70;

  yearTextX = width * 0.05;
  yearTextY = height * 0.08;
  yearTextSize = width * 0.03;

  redDot1Pos = createVector(width * 0.28, height * 0.63);
  redDot2Pos = createVector(width * 0.42, height * 0.73);
  redDot3Pos = createVector(width * 0.23, height * 0.83);
  redDotRadius = width * 0.015;

  mainBlueTextX = width * 0.45;
  mainBlueTextY = height * 0.78;
  mainBlueTextW = width * 0.50;
  mainBlueTextH = height * 0.07;
  mainBlueTextSize = width * 0.04;

  redSealX = width * 0.80;
  redSealY = height * 0.725;
  redSealRadius = width * 0.04;

  lowerLeftTextureX = width * 0.05;
  lowerLeftTextureY = height * 0.75;
  lowerLeftTextureW = width * 0.35;
  lowerLeftTextureH = height * 0.20;

  lowerRightTextX = width * 0.45;
  lowerRightTextY = height * 0.88;
  lowerRightTextW = width * 0.50;
  lowerRightTextH = height * 0.07;
  lowerRightTextSize = width * 0.018;

  // Initialize properties for interactive dots (Braille-like)
  dotSpacingX = textBlockW / 10; // Horizontal spacing for dots
  dotSpacingY = textBlockH / 20; // Vertical spacing for dots
  dotBaseRadius = width * 0.005; // Base size of dots when not interacted with
  dotMaxRadius = width * 0.015; // Max size of dots when fully interacted
  dotInfluenceRadius = width * 0.08; // Distance from mouse where dots start reacting

  // Define the pattern of dots to approximate "DEBA DESSE"
  // Each pair [col, row] specifies a dot's position in a grid
  let dotPattern = [
    // Approximate 'D'
    [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [1, 1], [1, 7],
    [2, 1], [2, 7],
    [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
    // Approximate 'E'
    [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
    [6, 1], [6, 4], [6, 7],
    [7, 1], [7, 4], [7, 7],
    // Approximate 'B'
    [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7],
    [10, 1], [10, 4], [10, 7],
    [11, 2], [11, 3], [11, 5], [11, 6],
    // Approximate 'A'
    [13, 2], [13, 3], [13, 4], [13, 5], [13, 6],
    [14, 1], [14, 4], [14, 7],
    [15, 1], [15, 7],

    // Approximate 'D' (second row, "DESSE")
    [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15],
    [1, 9], [1, 15],
    [2, 9], [2, 15],
    [3, 10], [3, 11], [3, 12], [3, 13], [3, 14],
    // Approximate 'E' (second row)
    [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [5, 14], [5, 15],
    [6, 9], [6, 12], [6, 15],
    [7, 9], [7, 12], [7, 15],
    // Approximate 'S' (third row)
    [9, 9], [9, 10], [9, 11], [9, 12], [9, 13],
    [10, 9], [10, 12], [10, 15],
    [11, 9], [11, 12], [11, 13], [11, 14], [11, 15],
    // Approximate 'S' (fourth row)
    [13, 9], [13, 10], [13, 11], [13, 12], [13, 13],
    [14, 9], [14, 12], [14, 15],
    [15, 9], [15, 12], [15, 13], [15, 14], [15, 15],

    // Approximate 'E' (fifth row)
    [17, 9], [17, 10], [17, 11], [17, 12], [17, 13], [17, 14], [17, 15],
    [18, 9], [18, 12], [18, 15],
    [19, 9], [19, 12], [19, 15],

    // Bottom row of 5 dots
    [8, 18], [9, 18], [10, 18], [11, 18], [12, 18]
  ];

  // Populate the dotGrid array with dot objects based on the pattern
  for (let p of dotPattern) {
    // Adjust dot positions to fit within the textBlock area, with some padding/scaling
    let x = textBlockX + p[0] * dotSpacingX * 0.8;
    let y = textBlockY + p[1] * dotSpacingY * 0.9;
    dotGrid.push({ x: x, y: y, currentRadius: dotBaseRadius });
  }
}

function draw() {
  background(backgroundColor);

  // --- 1. Right Statue/Architecture Area (Abstracted) ---
  // Represented by a large blue rectangle with a subtle noise texture
  noStroke();
  fill(blueDark);
  rect(statueAreaX, statueAreaY, statueAreaW, statueAreaH);
  // Add small circles with varying opacity/size based on Perlin noise for grainy texture
  for (let i = 0; i < 500; i++) {
    let px = random(statueAreaX, statueAreaX + statueAreaW);
    let py = random(statueAreaY, statueAreaY + statueAreaH);
    let d = noise(px * 0.01, py * 0.01, frameCount * 0.005); // Noise for varying density
    fill(lerpColor(blueDark, backgroundColor, d)); // Blend with background for a faded, grainy look
    ellipse(px, py, d * 5, d * 5); // Vary size with noise
  }

  // --- 2. Main Text Block "DEBA DESSE" (Background Shape) ---
  // A large dark rectangle represents the general area of the text.
  // The specific letter shapes are conveyed by the interactive dots on top.
  fill(textDark);
  rect(textBlockX, textBlockY, textBlockW, textBlockH);

  // --- 3. "2020" Text ---
  fill(blueDark);
  textSize(yearTextSize);
  textAlign(LEFT, TOP);
  text("2020", yearTextX, yearTextY);

  // --- 4. Red Dots & Line ---
  // Draw the connecting lines
  stroke(redAccent);
  strokeWeight(2);
  line(redDot1Pos.x, redDot1Pos.y, redDot2Pos.x, redDot2Pos.y);
  line(redDot2Pos.x, redDot2Pos.y, redDot3Pos.x, redDot3Pos.y);
  // Draw the red circles
  noStroke();
  fill(redAccent);
  ellipse(redDot1Pos.x, redDot1Pos.y, redDotRadius * 2);
  ellipse(redDot2Pos.x, redDot2Pos.y, redDotRadius * 2);
  ellipse(redDot3Pos.x, redDot3Pos.y, redDotRadius * 2);

  // --- 5. "OMFATTAR SJÄLVKLARE" Text (Abstracted) ---
  // Using generic text() for simplicity, maintaining color and position
  fill(blueDark);
  textSize(mainBlueTextSize);
  text("OMFATTAR", mainBlueTextX, mainBlueTextY);
  text("SJÄLVKLARE", mainBlueTextX, mainBlueTextY + mainBlueTextSize * 1.1);
  // Horizontal line below the text
  stroke(blueDark);
  strokeWeight(2);
  line(mainBlueTextX, mainBlueTextY + mainBlueTextSize * 2.5, mainBlueTextX + mainBlueTextW * 0.3, mainBlueTextY + mainBlueTextSize * 2.5);
  noStroke(); // Reset stroke

  // --- 6. Lower Left Texture/Statue Detail (Abstracted) ---
  // Similar to the main statue area, represented by a textured blue rectangle
  fill(blueDark);
  rect(lowerLeftTextureX, lowerLeftTextureY, lowerLeftTextureW, lowerLeftTextureH);
  // Add noise for texture
  for (let i = 0; i < 300; i++) {
    let px = random(lowerLeftTextureX, lowerLeftTextureX + lowerLeftTextureW);
    let py = random(lowerLeftTextureY, lowerLeftTextureY + lowerLeftTextureH);
    let d = noise(px * 0.01, py * 0.01, frameCount * 0.005);
    fill(lerpColor(blueDark, backgroundColor, d * 0.5 + 0.5)); // Blend for lighter grain
    ellipse(px, py, d * 3, d * 3);
  }

  // --- 7. Smaller Lower Right Text (Abstracted) ---
  // Representing the smaller descriptive text blocks
  fill(blueDark);
  textSize(lowerRightTextSize);
  textAlign(LEFT, TOP); // Ensure text aligns from top-left for blocks
  text("Njut av avsikt i moment fångad i den", lowerRightTextX, lowerRightTextY - lowerRightTextSize * 5);
  text("längfan efter sjalvstandighet, avskild-", lowerRightTextX, lowerRightTextY - lowerRightTextSize * 3.5);
  text("het, eller enkelhet.", lowerRightTextX, lowerRightTextY - lowerRightTextSize * 2);

  text("Gk menden esmina, vilkekad.", lowerRightTextX, lowerRightTextY);
  text("Gk mened landing. lekdedinn", lowerRightTextX, lowerRightTextY + lowerRightTextSize * 1.5);
  text("ar en rieved enskillt rior eff no-", lowerRightTextX, lowerRightTextY + lowerRightTextSize * 3);
  text("torer rena stwide evidin,", lowerRightTextX, lowerRightTextY + lowerRightTextSize * 4.5);
  text("personiffier ade dedrag av ka-", lowerRightTextX, lowerRightTextY + lowerRightTextSize * 6);
  text("vens. lyeka, diskretion, av val.", lowerRightTextX, lowerRightTextY + lowerRightTextSize * 7.5);

  // --- 8. Red Circle Seal ---
  noStroke();
  fill(redAccent);
  ellipse(redSealX, redSealY, redSealRadius * 2);
  // Add a simple 'K' symbol inside the seal
  fill(backgroundColor); // Use background color for the 'K' to make it stand out
  textSize(redSealRadius * 0.8);
  textAlign(CENTER, CENTER); // Center the 'K' within the circle
  text("K", redSealX, redSealY + redSealRadius * 0.1); // Small vertical adjustment for visual centering

  // --- 9. Interactive Dots for "DEBA DESSE" ---
  // This is the core interactive element, simulating tactile Braille.
  noStroke();
  for (let dot of dotGrid) {
    let d = dist(mouseX, mouseY, dot.x, dot.y); // Calculate distance from mouse to dot center
    let targetRadius = dotBaseRadius;
    let dotFillColor = color(255, 255, 255); // Default white color for dots

    // If mouse is within influence radius, adjust dot size and opacity
    if (d < dotInfluenceRadius) {
      // Map distance (0 to influenceRadius) to an influence value (1 to 0)
      let influence = map(d, 0, dotInfluenceRadius, 1, 0);
      targetRadius = lerp(dotBaseRadius, dotMaxRadius, influence); // Lerp towards max radius
      // Make dots slightly translucent when far, more opaque when close
      dotFillColor = lerpColor(color(255, 255, 255, 150), color(255, 255, 255, 255), influence);
    }

    // Smoothly interpolate the current radius towards the target radius for animation
    dot.currentRadius = lerp(dot.currentRadius, targetRadius, 0.1);

    fill(dotFillColor);
    ellipse(dot.x, dot.y, dot.currentRadius * 2); // Draw the dot
  }
}
