// Major Project - Animal Crossing Clone
// Monica Trinh
// November 16th, 2021


let settings;
let fishRodCount = 0, bugNetCount = 0;
let timeState;
let bgDay, bgAfternoon, bgNight, sunset;
let grid;
let gridSize = 30, homeGridSize = 15;
let cellWidth, cellHeight;
let grass, woodTile, grassCatch;
let blathers, isabelle, kk, tomNook, marshall, villagers;
let playerFemale, playerFemaleMini;
let SCENE_W;
let SCENE_H;
let fishCount = 0;
let bugCount = 0;
let tryToExit = false;
let catchState;
let bg, trees, fishes;
let coins, coinDisplay, coinCount = 0;
let closeButton, purchaseButton;
let menu, buildMenu, cameraMenu, catchMenu, customMenu, mapMenu, shopMenu;
let chooseSound, coinSound, catchFishSound, shopSelectSound, chaChing, errorfx, walkingsfx;
let penmanship, acFont, digitalTech;
let gameState;
let currentTime, timeMode;
let fishingHook;
let fishDisplay, butterflyDisplay;
let goldenHour = 12;
let mpcBox, readBox, nameBox;
let fishOrBugDisplay;
let nookCrannyImg;
let widthBuffer, heightBuffer;
let fishingRodMini, bugNetMini
let bluePeriod, fishingRod, house, janeEyre, mansion, itemDisplay, itemDisplayStorage;
let cellStorageHeight, cellStorageWidth;
let theMinute, theSecond
let acLogo;
let isOpening = true;
let dialougeBox, debtButton;
let enterName = false, nameInput, fbInput;
let fbExchange, friendshipPts = 0;
let musicButton, radio, inputMusic, theSound, pauseButton;
let kkSong1, kkSong2, kkSong3, kkSongList;
let initialDebt, tent, nookCrannyItems, leafImg;
let placeable = true;
let thisTenty;
let thisTentx;
let chattingInput;
let emmaS, jeS, bP;
let emmaDisplay, janeDisplay, bPDisplay, houseDisplay;
let isItInside = true;
let fishingTimeCount = 0;
let bugCatchingTimeCount = 0;
let isDisplayStorage = false;
let isFishable = true, isBugable = true;
let isCapturing = false;
let isArgyle = false, isVeneer = false, isHoneyComb = false;
let isEmma = false, isJaneE = false, isBP = false;
let argyleT, veneerT, honeyCombT, tileSet;
let argyleDisplay, veneerDisplay, honeyCDisplay;
let tileCount = 0;
let villagerVoice;
let morningMusic, aftMusic, nightMusic;
let bgSlider, sfxSlider;
let sellItemButton, deleteDataB;

function preload() {
  grass = loadImage("assets/background/grass.png");

  // load sounds
  coinSound = loadSound('assets/sound/coinsfx.wav');
  chooseSound = loadSound('assets/sound/choose.wav');
  catchFishSound = loadSound('assets/sound/waterSplash.wav');
  chaChing = loadSound('assets/sound/cha-ching.mp3');
  errorfx = loadSound('assets/sound/windows_error.mp3');
  walkingsfx = loadSound('assets/sound/walking.mp3');

  kkSong1 = loadSound('assets/sound/agentKK.mp3');
  kkSong2 = loadSound('assets/sound/djKK.mp3');
  kkSong3 = loadSound('assets/sound/farewellKK.mp3');

  // load fonts
  penmanship = loadFont('assets/background/penmanship.ttf');
  acFont = loadFont('assets/background/AC.ttf');
  digitalTech = loadFont('assets/background/digitalTech.ttf');

  // load display imgs
  fishDisplay = loadImage('assets/functions/carp_fish.png');
  butterflyDisplay = loadImage('assets/functions/purpleButterfly.png');
  coinDisplay = loadImage('assets/currency/BellCoin.png');
  woodTile = loadImage('assets/background/woodFloor.png');
  bgDay = loadImage('assets/background/bg-day.jpeg');
  sunset = loadImage('assets/background/sunset.jpeg');
  bgNight = loadImage('assets/background/night.jpeg');
  bgAfternoon = loadImage('assets/background/afternoon.jpeg');
  bgAfternoon = loadImage('assets/background/afternoon.jpeg');
  grassCatch = loadImage('assets/background/grass-catch.png');
  acLogo = loadImage('assets/ac-logo.png');
  leafImg = loadImage('assets/nookCranny/leaf.png');

  // load DOM elements
  inputMusic = createFileInput(handleFile);
  inputMusic.hide();

  // load bg
  argyleT = loadImage('assets/items/7.png');
  veneerT = loadImage('assets/items/8.png');
  honeyCombT = loadImage('assets/items/9.png');

  tileSet = [woodTile, argyleT, veneerT, honeyCombT];

  // load more muisc :)
  villagerVoice = loadSound('assets/sound/villager.mp3');
  morningMusic = loadSound('assets/sound/morning.mp3');
  aftMusic = loadSound('assets/sound/afternoon.mp3');
  nightMusic = loadSound('assets/sound/night.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  SCENE_W = width * 3;
  SCENE_H = height * 3;

  angleMode(DEGREES);

  // daily fish exchange rate, change every log in time
  fbExchange = floor(random(5, 10));
  // grid
  grid = createEmptyArray(gridSize, gridSize);
  homeGrid = createEmptyArray(homeGridSize, homeGridSize);
  widthBuffer = width / 8;
  heightBuffer = height / 15;


  cellWidth = (SCENE_W / gridSize) * 2;
  cellHeight = (SCENE_H / gridSize) * 2;
  cellHomeWidth = (width - (2 * widthBuffer)) / homeGridSize;
  cellHomeHeight = (height - (2 * heightBuffer)) / homeGridSize;
  homeGridWidth = cellHomeWidth * homeGridSize;
  cellStorageWidth = cellWidth / 4;
  cellStorageHeight = cellWidth / 4;

  playerFemale = createSprite(SCENE_W / 2, SCENE_H / 2);
  playerFemale.scale = width / 2000;
  playerFemale.setCollider('rectangle', 0, 0, playerFemale.width, playerFemale.height);

  playerFemale.mouseActive = true;

  // fishing hook for fishing game
  fishingHook = createSprite(mouseX, mouseY);
  fishingHook.scale = width / 20000;
  fishingHook.addAnimation('fish', 'assets/functions/fishHook.png');
  fishingHook.addAnimation('bug', 'assets/functions/bugNet.png');
  fishingHook.setCollider('rectangle', 0, 0, fishingHook.width, fishingHook.height);
  fishingHook.mouseActive = true;

  mpcBox = createSprite(width / 2, height / 2);
  mpcBox.scale = width / 2500;
  mpcBox.addAnimation('normal', 'assets/functions/multiple.png');
  mpcBox.mouseActive = true;


  nameBox = createSprite(width / 2, height / 4);
  nameBox.scale = width / 4000;
  nameBox.addImage(loadImage("assets/functions/nameBox.png"));

  fishOrBugDisplay = new Group();
  for (let i = 0; i < 2; i++) {
    let displayFB = createSprite(width / 2, height / 2);
    displayFB.scale = width / 1000;
    displayFB.addAnimation('fish', 'assets/functions/bitterling_fish.png');
    displayFB.addAnimation('bug', 'assets/functions/purpleButterfly.png');
    displayFB.mouseActive = true;
    fishOrBugDisplay.add(displayFB);
  }

  fishOrBugDisplay[0].changeAnimation('fish');
  fishOrBugDisplay[0].position.x = width / 2 - (width / 10);
  fishOrBugDisplay[0].position.y = height / 1.7;

  fishOrBugDisplay[1].changeAnimation('bug');
  fishOrBugDisplay[1].position.x = width / 2 + (width / 11);
  fishOrBugDisplay[1].position.y = height / 1.7;

  next = new Group();
  for (let i = 0; i < 2; i++) {
    let nextButton = createSprite(width / 2, height / 2);
    nextButton.scale = width / 10000;
    nextButton.addAnimation('normal', 'assets/functions/nextButton.png');
    nextButton.mouseActive = true;
    next.add(nextButton);
  }

  // close button
  closeButton = createSprite(width - cellHeight / 2.5, height / 20);
  closeButton.scale = width / 25000;
  closeButton.addAnimation('simpleRed', 'assets/functions/closeImg.png');
  // closeButton.setCollider('rectangle', 0, 0, closeButton.width, closeButton.height);
  closeButton.mouseActive = true;

  //load animation
  playerFemale.addAnimation('normal', 'assets/player/female/player_female.png');
  playerFemale.addAnimation('forward', 'assets/player/female/player_female1.png', 'assets/player/female/player_female2.png', 'assets/player/female/player_female3.png', 'assets/player/female/player_female4.png', 'assets/player/female/player_female5.png');
  playerFemale.addAnimation('backward', 'assets/player/femaleBack/femaleBack1.png', 'assets/player/femaleBack/femaleBack2.png', 'assets/player/femaleBack/femaleBack3.png', 'assets/player/femaleBack/femaleBack4.png');
  playerFemale.addAnimation('movingRL', "assets/player/femaleLR/femaleLR1.png", "assets/player/femaleLR/femaleLR2.png");
  playerFemale.addAnimation('fish', 'assets/player/female/player_female_fish.png');

  //load animation
  playerFemaleMini = createSprite(width / 2, height / 2);

  playerFemaleMini.mouseActive = true;
  playerFemaleMini.addAnimation('normal', 'assets/player/female/player_female.png');
  playerFemaleMini.addAnimation('forward', 'assets/player/female/player_female1.png', 'assets/player/female/player_female2.png', 'assets/player/female/player_female3.png', 'assets/player/female/player_female4.png', 'assets/player/female/player_female5.png');
  playerFemaleMini.addAnimation('backward', 'assets/player/femaleBack/femaleBack1.png', 'assets/player/femaleBack/femaleBack2.png', 'assets/player/femaleBack/femaleBack3.png', 'assets/player/femaleBack/femaleBack4.png');
  playerFemaleMini.addAnimation('movingRL', "assets/player/femaleLR/femaleLR1.png", "assets/player/femaleLR/femaleLR2.png");

  playerFemaleMini.scale = homeGridSize / 25;

  // fossils
  bg = new Group();
  //create some background for visual reference
  for (let i = 0; i < 100; i++) {
    let rock = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2));
    //cycles through rocks 0 1 2
    rock.addAnimation('normal', 'assets/background/fossil.png');
    bg.add(rock);
  }

  // spawn trees
  trees = new Group();
  //create some background for visual reference
  for (let i = 0; i < random(5, 15); i++) {
    let tree = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
    tree.addAnimation('normal', 'assets/background/treeImg.png');
    tree.scale = width / 3000;
    tree.mouseActive = true;
    trees.add(tree);
  }

  // add coins
  coins = new Group();
  //spawn coins
  for (let i = 0; i < random(5, 10); i++) {
    let coin = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
    coin.addAnimation('normal', 'assets/currency/BellCoin.png');
    coin.scale = width / 1500;
    coin.mouseActive = true;
    coins.add(coin);
  }

  // dialouge Box for villagers
  dialougeBox = createSprite(width / 2, height / 2);
  dialougeBox.addAnimation('normal', 'assets/dialouge-box.png');
  dialougeBox.mouseActive = true;
  dialougeBox.scale = width / 800;
  dialougeBox.visible = false;

  nookCrannyItems = new Group();
  // nookCranny items (available w Tom Nook)
  for (let i = 0; i < 6; i++) {
    let theItem = createSprite(width / 2, height / 2);
    theItem.addImage(loadImage('assets/nookCranny/' + i + '.png'));
    theItem.scale = width / 4000;
    theItem.mouseActive = true;
    theItem.visible = false;
    nookCrannyItems.add(theItem);
  }

  // menu
  menu = new Group();
  buildMenu = createSprite(playerFemale.position.y - 10, playerFemale.position.y - (cellHeight * 1.5));
  buildMenu.addImage(loadImage('assets/functions/buildF.png'));
  menu.add(buildMenu);

  catchMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  catchMenu.addImage(loadImage('assets/functions/catchF.png'));
  menu.add(catchMenu);

  storageMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  storageMenu.addImage(loadImage('assets/functions/customF.png'));
  menu.add(storageMenu);

  shopMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  shopMenu.addImage(loadImage('assets/functions/shopF.png'));
  menu.add(shopMenu);

  mapMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  mapMenu.addImage(loadImage('assets/functions/mapF.png'));
  menu.add(mapMenu);

  // add menu
  for (let i = 0; i < menu.length; i++) {
    menu[i].scale = width / 4000;
    menu[i].visible = false;
    menu[i].mouseActive = true;
  }

  // purchase items in the shop
  purchaseButton = createSprite(width / 2, height / 2);
  purchaseButton.addAnimation('normal', 'assets/functions/purchaseLog.png');
  purchaseButton.scale = width / 1500;
  purchaseButton.mouseActive = true;

  // paying debt for nook
  debtButton = createSprite(width / 2, height / 2);
  debtButton.addAnimation('normal', 'assets/functions/purchaseLog.png');
  debtButton.scale = width / 3000;
  debtButton.mouseActive = true;

  // sell item purchase from nook
  sellItemButton = createSprite(width / 2, height / 2);
  sellItemButton.addAnimation('normal', 'assets/functions/purchaseLog.png');
  sellItemButton.scale = width / 2000;
  sellItemButton.mouseActive = true;
  sellItemButton.visible = false;

  // delete data in settings
  deleteDataB = createSprite(width / 2, height - height / 3);
  deleteDataB.addImage(loadImage('assets/functions/purchaseLog.png'));
  deleteDataB.scale = width / 1500;
  deleteDataB.mouseActive = true;
  deleteDataB.visible = false;

  // fishes & bugs
  fishes = new Group();

  itemDisplay = loadAnimation('assets/items/0.png', 'assets/items/9.png');
  itemDisplay.playing = false;
  itemDisplay.scale = 20;

  itemDisplayStorage = new Group();
  fishingRodMini = createSprite(width / 2, height / 2);
  fishingRodMini.addImage(loadImage("assets/items/2.png"));
  itemDisplayStorage.add(fishingRodMini);

  bugNetMini = createSprite(width / 2, height / 2);
  bugNetMini.addImage(loadImage("assets/items/1.png"));
  itemDisplayStorage.add(bugNetMini);

  for (let i = 0; i < itemDisplayStorage.length; i++) {
    itemDisplayStorage[i].visible = false;
  }


  // house set
  emmaS = new Group();
  bP = new Group();
  jeS = new Group();
  houseDisplay = new Group();

  janeDisplay = createSprite(width / 2, height / 2);
  janeDisplay.addImage(loadImage('assets/set/bP/0.png'));
  houseDisplay.add(janeDisplay);

  emmaDisplay = createSprite(width / width, height / 2);
  emmaDisplay.addImage(loadImage('assets/set/emma/0.png'));
  houseDisplay.add(emmaDisplay);

  bPDisplay = createSprite(width / 2, height / 2);
  bPDisplay.addImage(loadImage('assets/set/janeE/0.png'));
  houseDisplay.add(bPDisplay);

  for (let i = 0; i < houseDisplay.length; i++) {
    houseDisplay[i].mouseActive = true;
    houseDisplay[i].visible = false;
    houseDisplay[i].scale = width / 3000;
  }

  for (let i = 0; i < 5; i++) {
    let furniture = createSprite(width / 2, height / 2);
    furniture.addImage(loadImage('assets/set/bP/' + i + '.png'));
    furniture.mouseActive = true;
    furniture.visible = false;
    furniture.scale = width / 900;
    furniture.setCollider('rectangle', 0, 0, 50, 50);
    bP.add(furniture);
  }

  for (let i = 0; i < 5; i++) {
    let furniture1 = createSprite(width / 2, height / 2);
    furniture1.addImage(loadImage('assets/set/emma/' + i + '.png'));
    furniture1.mouseActive = true;
    furniture1.visible = false;
    furniture1.setCollider('rectangle', 0, 0, 50, 50);
    furniture1.scale = width / 900;
    emmaS.add(furniture1);
  }

  for (let i = 0; i < 5; i++) {
    let furniture2 = createSprite(width / 2, height / 2);
    furniture2.addImage(loadImage('assets/set/janeE/' + i + '.png'));
    furniture2.mouseActive = true;
    furniture2.visible = false;
    furniture2.scale = width / 900;
    furniture2.setCollider('rectangle', 0, 0, 50, 50);

    jeS.add(furniture2);
  }

  for (let i = 0; i < bP.length; i++) {
    if (i < 3) {
      bP[i].position.x = widthBuffer + i * ((cellHomeWidth * homeGridSize) / 3) + 2 * cellHomeWidth;
      bP[i].position.y = heightBuffer + 1.5 * cellHomeHeight;

      emmaS[i].position.x = widthBuffer + i * ((cellHomeWidth * homeGridSize) / 3) + 2 * cellHomeWidth;
      emmaS[i].position.y = heightBuffer + 1.5 * cellHomeHeight;

      jeS[i].position.x = widthBuffer + i * ((cellHomeWidth * homeGridSize) / 3) + 2 * cellHomeWidth;
      jeS[i].position.y = heightBuffer + 1.5 * cellHomeHeight;
    }
    else {
      bP[i].position.x = widthBuffer + (i - 3) * ((cellHomeWidth * homeGridSize) / 3) + 2 * cellHomeWidth;
      bP[i].position.y = heightBuffer - 1.5 * cellHomeHeight + (cellHomeHeight * homeGridSize);

      emmaS[i].position.x = widthBuffer + (i - 3) * ((cellHomeWidth * homeGridSize) / 3) + 2 * cellHomeWidth;
      emmaS[i].position.y = heightBuffer - 1.5 * cellHomeHeight + (cellHomeHeight * homeGridSize);

      jeS[i].position.x = widthBuffer + (i - 3) * ((cellHomeWidth * homeGridSize) / 3) + 2 * cellHomeWidth;
      jeS[i].position.y = heightBuffer - 1.5 * cellHomeHeight + (cellHomeHeight * homeGridSize);
    }
  }

  // tile set
  argyleDisplay = createSprite(width - (widthBuffer / 4 + cellStorageWidth / 1.3), heightBuffer + 1.5 * cellStorageHeight);
  argyleDisplay.addImage(loadImage('assets/items/7.png'));
  argyleDisplay.scale = width / 3000;
  argyleDisplay.mouseActive = true;
  argyleDisplay.visible = false;

  veneerDisplay = createSprite(width - (widthBuffer / 4 + cellStorageWidth / 1.3), heightBuffer + height / 5 + cellStorageHeight + cellStorageHeight / 2); //i * height / 5 + cellStorageHeight
  veneerDisplay.scale = width / 3000;
  veneerDisplay.addImage(loadImage('assets/items/8.png'));
  veneerDisplay.mouseActive = true;
  veneerDisplay.visible = false;

  honeyCDisplay = createSprite(width - (widthBuffer / 4 + cellStorageWidth / 1.3), heightBuffer + 2 * height / 5 + cellStorageHeight + cellStorageHeight / 2); //i * height / 5 + cellStorageHeight
  honeyCDisplay.addImage(loadImage('assets/items/9.png'));
  honeyCDisplay.scale = width / 3000;
  honeyCDisplay.mouseActive = true;
  honeyCDisplay.visible = false;

  //villagers sprites
  villagers = new Group();

  blathers = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
  blathers.addAnimation('normal', 'assets/villagers/blathers.png');
  villagers.add(blathers);

  isabelle = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
  isabelle.addAnimation('normal', 'assets/villagers/isabelle.png');
  villagers.add(isabelle);

  kk = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
  kk.addAnimation('normal', 'assets/villagers/kkSlider.png');
  villagers.add(kk);

  tomNook = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
  tomNook.addAnimation('normal', 'assets/villagers/tomNook.png');
  villagers.add(tomNook);

  marshall = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
  marshall.addAnimation('normal', 'assets/villagers/marshall.png');
  villagers.add(marshall);

  for (let i = 0; i < villagers.length; i++) {
    villagers[i].scale = width / 5000;
    villagers[i].mouseActive = true;
  }

  kk.scale = width / 7000;
  isabelle.scale = width / 7000;
  tomNook.scale = width / 25000;

  // tent and its upgrade
  tent = createSprite(width / 2, height / 2);
  tent.addAnimation('tent', 'assets/items/tent.png');
  tent.addAnimation('house', 'assets/items/house.png');
  tent.addAnimation('mansion', 'assets/items/5.png');
  tent.visible = false;
  tent.mouseActive = true;
  tent.setCollider('rectangle', 0, 0, 700, 700);

  settings = createSprite(width / 2, height / 2);
  settings.addImage(loadImage('assets/functions/settings-icon.png'));
  settings.scale = width / 16500;
  settings.mouseActive = true;
  settings.visible = false;
  menu.add(settings);

  // game and buttons/dom set up
  gameState = "world";
  // walkingsfx.setVolume(0.5);
  nameInput = createInput();
  fbInput = createInput();
  chattingInput = createInput();

  radio = createRadio();
  radio.option("Choose my own Music");
  radio.option("KK's music");
  radio.style('height', '30px');
  radio.hide();

  musicButton = createButton('Play');
  pauseButton = createButton('Pause');

  bgSlider = createSlider(0, 1, 0.3, 0.1);
  sfxSlider = createSlider(0, 1, 0.7, 0.1);
}

function draw() {

  // different background depending the time of the day
  if (gameState === "world") {
    if (hour() <= 15 && hour() >= 7) {
      background("#73daef");
      timeState = "day";
    }
    else if (hour() > 15 && hour() < 21) {
      background(sunset);
      timeState = "afternoon";
    }
    else {
      background(8, 17, 59);
      timeState = "night";
    }


    camera.zoom = 1;
    //set the camera position to the player position
    camera.position.x = playerFemale.position.x;
    camera.position.y = playerFemale.position.y;
    playerFemale.scale = width / 2000;
    displayGrid();

    drawSprites(bg);

    // opening screen
    if (isOpening) {
      image(acLogo, playerFemale.position.x - acLogo.width / 2, playerFemale.position.y - 3 * cellHeight);
      textFont(digitalTech);
      messageText(width / 50, 255, "Press Space to Start", playerFemale.position.x, playerFemale.position.y + cellHeight * 1.5);

      // when hit space
      if (keyIsDown(32)) {
        isOpening = false;
        walkingsfx.loop();

        // different music triggered base on time period
        if (hour() <= 15 && hour() >= 7) {
          morningMusic.loop();
        }
        else if (hour() > 15 && hour() < 21) {
          aftMusic.loop();
        }
        else {
          nightMusic.loop();
        }
        fetchMemory();
        if (getItem("playerName") === null) {
          enterName = true;
        }
        else {
          playerName = getItem('playerName');
        }
      }
    }
    else {
      if (enterName) { // first time log in , enter w name
        playerDialouge();
        fetchMemory(); // fetch data from local storage
      }
      else { // into the game
        drawSprites(menu);
        showMenu();
        timeCount(); // display real time
        playerFemale.overlap(coins, coinCollect);
        coins.collide(trees);

        // start w placing the tent
        if (placeable) {
          tent.changeAnimation('tent');
          tent.visible = true;
          tent.position.x = playerFemale.position.x - width / 10;
          tent.position.y = playerFemale.position.y;
          tent.scale = width / 10000;
          storeItem('placeable', placeable);
          messageText(width / 125, 250, "Press 'P' to place the tent", tent.position.x, tent.position.y + tent.width / 15);

        }
        else { // set tent position
          tent.visible = true;
          tent.scale = width / 4000;
          tent.collide(trees);
          tent.displace(villagers);
          playerFemale.collide(tent);
          villagers.collide(tent);
          tent.position.x = thisTentx;
          tent.position.y = thisTenty;
          storeItem('placeable', placeable);

          // upgrade tent
          if (theHouse) {
            tent.changeAnimation('house');
            tent.scale = width / 500;
            tent.setCollider('rectangle', 0, 0, width / 10, width / 12);

          }
          else if (theMansion) {
            tent.changeAnimation('mansion');
          }
          else {
            tent.changeAnimation('tent');
          }

          if (tent.mouseIsPressed) {
            answerYN = "no";
            gameState = "build";
          }
        }


        if (keyWentDown(80)) {
          placeable = false;
          thisTentx = tent.position.x;
          thisTenty = tent.position.y;
          storeItem('tentX', thisTentx);
          storeItem('tentY', thisTenty);
        }

        drawSprite(tent);
        for (let i = 0; i < trees.length; i++) {
          if (trees[i].mouseIsOver && mouseWentDown()) {

            spawnCoins();

          }
        }
        messageText(width / 100, 255, playerName, playerFemale.position.x, playerFemale.position.y - playerFemale.height / 2 - 5);
        // messageText(width / 100, 0, friendshipPts, playerFemale.position.x - width / 5, playerFemale.position.y);

        // function in settings

        drawSprites(trees);
        drawSprites(coins);
      }
    }
    playerMove();
    villagersMove();
    cursor(CROSS);
  }

  settingsButton();

  // player function
  if (isUsable) {
    shopping();
    catchFish();
    fishOrBug();
    exitBox();
    buildSpaces();
    insideSpaces();
  }


  // set Volume
  walkingsfx.setVolume(sfxSlider.value());
  coinSound.setVolume(sfxSlider.value());
  chooseSound.setVolume(sfxSlider.value());
  catchFishSound.setVolume(sfxSlider.value());
  chaChing.setVolume(sfxSlider.value());
  errorfx.setVolume(sfxSlider.value());
  villagerVoice.setVolume(sfxSlider.value());

  morningMusic.setVolume(bgSlider.value());
  aftMusic.setVolume(bgSlider.value());
  nightMusic.setVolume(bgSlider.value());

}

// spawn coins when press on trees
function spawnCoins() {
  if (random(100) < 50) {
    for (let i = 0; i < random(8); i++) {
      let coin = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
      coin.addAnimation('normal', 'assets/currency/BellCoin.png');
      coin.scale = width / 1500;
      coin.mouseActive = true;
      coins.add(coin);
    }
  }
}

// display time
function timeCount() {

  if (hour() >= 12) {
    timeMode = " PM";
  }
  else {
    timeMode = " AM";
  }
  if (minute() < 10) {
    theMinute = "0" + minute();
  }
  else {
    theMinute = minute();
  }
  if (second() < 10) {
    theSecond = "0" + second();
  }
  else {
    theSecond = second();
  }
  currentTime = hour() + ':' + theMinute + ':' + theSecond + timeMode;
  textFont('digitalTech');
  messageText(width / 100, 255, currentTime, playerFemale.position.x, playerFemale.position.y - cellWidth);

}


// setitings to delete data or adjust volume
function settingsButton() {
  if (settings.mouseIsPressed && settings.visible) {
    gameState = 'settings';
    walkingsfx.pause();
    isUsable = true;

  }
  if (gameState === "settings") {
    camera.off();
    drawRect(width / 3, height / 3, width / 3, height / 2, 50, 50, 50, 50, "beige");
    textFont(digitalTech);
    messageText(width / 30, 'orange', "SETTINGS", width / 2, height / 3 + heightBuffer);
    messageText(width / 80, 50, "BG Music:", width / 3 + widthBuffer / 2, height / 2);
    messageText(width / 80, 50, "SFX/ Villager:", width / 3 + widthBuffer / 2, height / 2 + heightBuffer / 2);

    // value slider
    bgSlider.position(width / 2, height / 2 - 10);
    bgSlider.size(200);
    sfxSlider.position(width / 2, height / 2 + heightBuffer / 2 - 10);
    sfxSlider.size(200);

    sfxSlider.show();
    bgSlider.show();

    if (deleteDataB.mouseIsOver) {
      deleteDataB.scale = width / 1200;
    }
    else {
      deleteDataB.scale = width / 1500;
    }
    // delete data
    deleteDataB.visible = true;
    drawSprite(deleteDataB);
    textFont(digitalTech);
    messageText(width / 80, 255, "DELETE DATA", deleteDataB.position.x, deleteDataB.position.y);

    messageText(width / 100, 50, "Find Isabelle and ask her about anything \n need help with (instructions,etc.)", width / 2, height - height / 5 - 20);

    if (deleteDataB.mouseIsPressed) {
      gameState = 'world';
      clearStorage();
      walkingsfx.pause();
      isOpening = true;
      enterName = true;
      playerName = "";
      placeable = true;

      bgSlider.hide();
      sfxSlider.hide();
    }
  }
  if (keyWentDown(27)) {
    gameState = "world";
    isUsable = false;
    sfxSlider.hide();
    bgSlider.hide();
    deleteDataB.visible = false;
    if (!walkingsfx.isLooping()) {
      walkingsfx.loop();
    }
  }
}

// collect coin
function coinCollect(collector, collected) {
  if (coinCount < 1000) {
    coinCount++;
    storeItem('coinCount', coinCount);
  }
  collector.changeAnimation('normal');
  coinSound.play();
  collected.remove();
}


// fetching memory, prob not the most efficient since I could have made some fancy loop or function but was too lazy to >:-)
function fetchMemory() {
  if (getItem('fishCount') !== null) {
    fishCount = getItem('fishCount');
  }
  else {
    if (playerName === "schellenberg" || playerName === "Schellenberg") {
      fishCount = 100;
      storeItem('fishCount', fishCount);
    }
    else {
      fishCount = 0;
    }
  }
  if (getItem('bugCount') !== null) {
    bugCount = getItem('bugCount');
  }
  else {
    if (playerName === "schellenberg" || playerName === "Schellenberg") {
      bugCount = 100;
      storeItem('bugCount', bugCount);
    }
    else {
      bugCount = 0;
    }
  }
  if (getItem('coinCount') !== null) {
    coinCount = getItem('coinCount');
  }
  else {
    if (playerName === "schellenberg" || playerName === "Schellenberg") {
      coinCount = 100;
      storeItem('coinCount', coinCount);
    }
  }

  if (getItem('fishRodCount') !== null) {
    fishRodCount = getItem('fishRodCount');
  }
  else {
    if (playerName === "schellenberg" || playerName === "Schellenberg") {
      fishRodCount = 10;
      storeItem('fishRodCount', fishRodCount);

    }
    else {
      fishRodCount = 0;
    }
  }

  if (getItem('bugNetCount') !== null) {
    bugNetCount = getItem('bugNetCount');

  }
  else {
    if (playerName === "schellenberg" || playerName === "Schellenberg") {
      bugNetCount = 10;
      storeItem('bugNetCount', bugNetCount);

    }

  }

  if (getItem('friendshipPts') !== null) {
    friendshipPts = getItem('friendshipPts');
  }
  else {
    if (playerName === "schellenberg" || playerName === "Schellenberg") {
      friendshipPts = 100;
      storeItem('friendshipPts', friendshipPts);
    }
  }

  if (getItem('debt') !== null) {
    initialDebt = getItem('debt');
  }
  else {
    if (playerName === "schellenberg" || playerName === "Schellenberg") {
      initialDebt = 10;
      storeItem('debt', initialDebt);
    }
    else {
      initialDebt = 20;
      storeItem('debt', initialDebt);
    }
  }

  if (getItem('placeable') !== null) {
    placeable = getItem('placeable');
  }
  else {
    placeable = true;
  }

  if (getItem('tentX') !== null) {
    thisTentx = getItem('tentX');
  }

  if (getItem('tentY') !== null) {
    thisTenty = getItem('tentY');
  }

  if (getItem('apple') !== null) {
    appleC = getItem('apple');
  }

  if (getItem('radioC') !== null) {
    radioC = getItem('radioC');
  }

  if (getItem('book') !== null) {
    bookC = getItem('book');
  }
  if (getItem('cherry') !== null) {
    cherryC = getItem('cherry');
  }
  else {
    cherryC = 0;
  }
  if (getItem('stinkyB') !== null) {
    stinkyB = getItem('stinkyB');
  }
  if (getItem('house') !== null) {
    theHouse = getItem('house');
  }
  else {
    theHouse = false;
  }
  if (getItem('mansion') !== null) {
    theMansion = getItem('mansion');
  }
  else {
    theMansion = false;
  }

  if (getItem('isEmma') !== null) {
    isEmma = getItem('isEmma');
  }
  if (getItem('isEmmaDisplay') !== null) {
    isEmmaDisplay = getItem('isEmmaDisplay');
  }

  if (getItem('isBP') !== null) {
    isBP = getItem('isBP');
  }
  if (getItem('isbPDisplay') !== null) {
    isbPDisplay = getItem('isbPDisplay');
  }

  if (getItem('isJaneE') !== null) {
    isJaneE = getItem('isJaneE');
  }
  if (getItem('isJEDisplay') !== null) {
    isJEDisplay = getItem('isJEDisplay');
  }
  if (getItem('veneer') !== null) {
    isVeneer = getItem('veneer');
  }
  if (getItem('argyle') !== null) {
    isArgyle = getItem('argyle');
  }
  if (getItem('honeyComb') !== null) {
    isHoneyComb = getItem('honeyComb');
  }
}

