const RES_X = 2250;
const RES_Y = 1550;
let scaling = 1;
let scene;
let activeScene;
let mX;
let mY;
let cursorType = "normal";
let prevSceneImg;
let sceneIsFading = false;
let color =
{
  buttonAccent: [81, 126, 49],
  buttonAccentLight: [101, 148, 94],
  buttonFill: [212, 203, 139],
  buttonFillDark: [192, 184, 118]
}
let mouseIsDown = false;
let hintCountdownTime = 60000;
let skildpadde = null;
let minigamesWon =
{
  delfin: false,
  dykker: false,
  koral: false,
  snegle: false,
  fisk: false
}
let allMinigamesWon = false;
let victorySoundHasPlayed = false;

function setup()
{
  textFont("cursive");
  frameRate(60);
  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  createCanvas(1,1);
  createScaledCanvas(RES_X, RES_Y);
  masterVolume(0.3);
  skildpadde = new Skildpadde();
  scene =
  {
    titleScreen: new TitleScreen(),
    mainMenu: new MainMenu(),
    lobby: new Lobby(),
    snegleMinigame: new SnegleMinigame(),
    delfinMinigame: new DelfinMinigame(),
    dykkerMinigame: new DykkerMinigame(),
    koralMinigame: new KoralMinigame(),
    fiskMinigame: new FiskMinigame()
  }
  updateActiveScene(scene.titleScreen, null, null);
}

function windowResized()
{
  createScaledCanvas(RES_X, RES_Y);
}

function draw()
{
  cursorType = "normal";
  mX = mouseX / scaling;
  mY = mouseY / scaling;
  if (!sceneIsFading) scene[activeScene].hitReg("hover");
  scale(scaling);
  drawScenes();
  sceneFading();

  // tegn cursor
  switch (cursorType)
  {
    case "normal": cursor("resources/images/cursor_normal.png"); break;
    case "hover": cursor("resources/images/cursor_hover.png"); break;
    default: cursor("resources/images/placeholder.png");
  }

}


function keyTyped()
{
    if (!sceneIsFading)
    {
      scene[activeScene].keybind(key);
    }
}

function mousePressed()
{
  if (!music._playing && !partyMusic._playing)
  {
    music.loop();
    music.setVolume(0.1);
  }
  if (RES_Y * scaling >= mouseY && RES_X * scaling >= mouseX && mouseY >= 0 && mouseX >= 0) // hvis musen er indenfor spillets rammer
  {
    if (!sceneIsFading)
    {
      mX = mouseX / scaling;
      mY = mouseY / scaling;
      scene[activeScene].hitReg("click");
      scene[activeScene].mousebind();

      if (activeScene == "fiskMinigame" && scene.fiskMinigame.stage == "runMinigame")
      {
        scene.fiskMinigame.onMousePress();
      }

      let bool = false;
      if (sound.sneglehuse.intro._playing) bool = true;
      if (sound.delfinbad.intro._playing) bool = true;
      if (sound.fiskemad.intro._playing) bool = true;
      if (sound.dykkerens_kort.intro._playing) bool = true;
      if (sound.koralrev.intro._playing) bool = true;
      if (bool)
      {
        sound.sneglehuse.intro.stop();
        sound.delfinbad.intro.stop();
        sound.fiskemad.intro.stop();
        sound.dykkerens_kort.intro.stop();
        sound.koralrev.intro.stop();
      }

    }
  }

  mouseIsDown = true;
}

function mouseReleased()
{
  mouseIsDown = false;
}



// deaktiver context menu (h??jre klik)
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});
