// Major Project - Animal Crossing Clone
// Monica Trinh
// November 16th, 2021

let grid;
let gridSize = 30;
let cellWidth, cellHeight;
let grass, grassPale;
let water;
let blathers, isabelle, kk, tomNook;
let bellImg, coin;
let bell;
let fishImg, fishFunction;
let shopImg, theShop;
let playerFemale;
let player;
let SCENE_W;
let SCENE_H;
let bg;
let cursor;

function preload() {
  grass = loadImage("assets/background/grass.png");
  grassPale = loadImage("assets/background/grass2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  SCENE_W = width * 3;
  SCENE_H = height * 3;

  cursor = createSprite(mouseX, mouseY);
  //compact way to add an image
  cursor.addImage(loadImage('assets/background/cursor.png'));

  grid = createEmptyArray(gridSize, gridSize);
  cellWidth = (SCENE_W / gridSize) * 2;
  cellHeight = (SCENE_H / gridSize) * 2;

  playerFemale = createSprite(SCENE_W / 2, SCENE_H / 2);
  playerFemale.scale = width / 2000;

  playerFemale.addAnimation('normal', 'assets/player/female/player_female.png');

  playerFemale.addAnimation('forward', 'assets/player/female/player_female1.png', 'assets/player/female/player_female2.png', 'assets/player/female/player_female3.png', 'assets/player/female/player_female4.png', 'assets/player/female/player_female5.png');
  playerFemale.addAnimation('backward', 'assets/player/femaleBack/femaleBack1.png', 'assets/player/femaleBack/femaleBack2.png', 'assets/player/femaleBack/femaleBack3.png', 'assets/player/femaleBack/femaleBack4.png');

  playerFemale.addAnimation('movingRL', "assets/player/femaleLR/femaleLR1.png", "assets/player/femaleLR/femaleLR2.png");
  bg = new Group();

  //create some background for visual reference
  for (let i = 0; i < 100; i++) {
    //create a sprite and add the 3 animations
    let rock = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2));
    //cycles through rocks 0 1 2
    rock.addAnimation('normal', 'assets/background/fossil.png');
    bg.add(rock);
  }

}

function draw() {
  background("#73daef");

  displayGrid();


  if (mouseIsPressed) {
    camera.zoom = 2;
  }
  else if (keyCode === 32) {
    camera.zoom = 0.2;
  }
  else if (keyCode === 27) {
    camera.zoom = 1;
  }

  //set the camera position to the ghost position
  camera.position.x = playerFemale.position.x;
  camera.position.y = playerFemale.position.y;

  // if (keyIsDown(UP_ARROW)) {
  //   playerFemale.scale += 0.05;
  // }

  // if (keyIsDown(DOWN_ARROW)) {
  //   playerFemale.scale -= 0.05;
  // }


  drawSprites(bg);
  playerMove();

  cursor.position.x = mouseX;
  cursor.position.y = mouseY;

}


