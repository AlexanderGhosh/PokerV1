let cards;
let cardBack;
let bg;
const DIM = [1750, 750];
let SERVER_URL = 'https://poker-server-alex.herokuapp.com';
SERVER_URL = 'http://localhost:8080';

const CARDS = {
  Clubs: {
    Ace: [0, 0],
    King: [1, 0],
    Queen: [2, 0],
    Jack: [3, 0],
    Ten: [4, 0],
    Nine: [5, 0],
    Eight: [6, 0],
    Seven: [0, 1],
    Six: [1, 1],
    Five: [2, 1],
    Four: [3, 1],
    Three: [4, 1],
    Two: [5, 1],
  },
  Spades: {
    Ace: [7, 2],
    King: [8, 2],
    Queen: [9, 2],
    Jack: [10, 2],
    Ten: [11, 2],
    Nine: [12, 2],
    Eight: [13, 2],
    Seven: [7, 3],
    Six: [8, 3],
    Five: [9, 3],
    Four: [10, 3],
    Three: [11, 3],
    Two: [12, 3],
  },
  Diamonds: {
    Ace: [7, 0],
    King: [8, 0],
    Queen: [9, 0],
    Jack: [10, 0],
    Ten: [11, 0],
    Nine: [12, 0],
    Eight: [13, 0],
    Seven: [7, 1],
    Six: [8, 1],
    Five: [9, 1],
    Four: [10, 1],
    Three: [11, 1],
    Two: [12, 1],
  },
  Hearts: {
    Ace: [0, 2],
    King: [1, 2],
    Queen: [2, 2],
    Jack: [3, 2],
    Ten: [4, 2],
    Nine: [5, 2],
    Eight: [6, 2],
    Seven: [0, 3],
    Six: [1, 3],
    Five: [2, 3],
    Four: [3, 3],
    Three: [4, 3],
    Two: [5, 3],
  }
};

const ACTIONS = [
  'Fold',
  'Call',
  'Raise',
  'Check',
];

const STARTING_MONEY = 1000;

let getPlayer_, getPosition, getActions_;
let playerID;
let actions;
let showActions = false;

let cards_;
let showCards = false;

function nameToCard(name){
  let split = name.split(' ');
  let value = split[0];
  let suit = split[2];
  const s = CARDS[suit];
  if(s == undefined){
    return undefined;
  }
  return s[value];
}

function getPlayer(){
  getPlayer_.open('GET', `${SERVER_URL}/cards/${playerID}`, false);
  getPlayer_.send();
  if(getPlayer_.status == 200){
    return getPlayer_.response;
  }
}
function getActions(){
  getActions_.open('GET', `${SERVER_URL}/actions/${playerID}`, false);
  getActions_.send();
  if(getActions_.status == 200){
    return JSON.parse(getActions_.response);
  }
}

function positionCB() {
  if(getPosition.status != 200 || showActions){
    return;
  }
  const pos = getPosition.response;
  // if position is this player
  if(playerID == pos){
    // get the cards
    const p = getPlayer();
    const cards = p.cards;
    // get actions
    actions = getActions();
    // error check
    if(p == undefined || actions == undefined){
      showActions = false;
      return;
    }
    // display actions
    showActions = true;

    // wait for user response
  }
}

function preload() {
  cards = loadImage('./assets/cards/AllCards.jpg');
  cardBack = loadImage('./assets/cards/CardBack.png');
  bg = loadImage('./assets/Background.png');

  getPlayer_ = new XMLHttpRequest();
  getPosition = new XMLHttpRequest();
  getActions_ = new XMLHttpRequest();
}

function setup() {
  playerID = 0;
  createCanvas(...DIM).parent('jimbo');

  // creates player
  let createPlayer = new XMLHttpRequest();
  createPlayer.open('POST', `${SERVER_URL}/create`, false);
  createPlayer.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let body = {
    money: STARTING_MONEY
  };
  createPlayer.send(JSON.stringify(body));
  if(createPlayer.status == 201){
    playerID = JSON.parse(createPlayer.response).id;
    console.log('PlayerID: ' + playerID);
  }
  else{
    console.log('cannot crate player');
    return;
  }

  // starts
  let startGame = new XMLHttpRequest();
  startGame.open('PUT', `${SERVER_URL}/start`, false);
  startGame.send();

  // gets cards
  let getCards = new XMLHttpRequest();
  getCards.open('GET', `${SERVER_URL}/cards/${playerID}`, false);
  getCards.send();
  cards_ = JSON.parse(getCards.response).cards;
  showCards = true;
}

function checkServer(){
  if(playerID == 0){
    return;
  }
  getPosition.open('GET', `${SERVER_URL}/position`, true);
  getPosition.onload = positionCB;
  getPosition.send();
}

function drawCard(card, pos) {
  const dim = [cards.width / 14, cards.height / 4];
  let slice = [dim[0] * card[0], dim[1] * card[1]];
  slice[2] = dim[0];
  slice[3] = dim[1];
  image(cards, ...pos, ...dim, ...slice);
}

function drawText(txt, pos, size=32, colour=[0, 0, 0]){
  textSize(size);
  fill(colour);
  text(txt, ...pos);
}

function drawButton(txt, pos, mousePress, size){
  let button = createButton(txt);
  button.position(...pos);
  button.size(...size);
  button.style('font-size', 32);
  button.mousePressed(mousePress);
}

function drawActions(){
  if(!showActions){
    return;
  }
  actions.forEach((action, i) => {
    drawButton(ACTIONS[action], [1350 + i * 100, 500], () => console.log('jimbo'), [100, 50]);
  });
}

function drawCards(){
  if(!showCards){
    return;
  }
  cards_.forEach((cardName, i) => {
    let card = nameToCard(cardName);
    const pos = [1350 + 150 * i, 100];
    drawCard(card, pos);
  });
}

function drawUI(){
  drawText('Your Cards', [1400, 75], 32, [255, 0, 0]);
}

function draw() {
  checkServer();

  background(50);
  image(bg, 0, 0);
  const pos = [0, 0];
  const dim = [cards.width / 14, cards.height / 4];
  let card = CARDS.Hearts.Ace;
  let slice = [dim[0] * card[0], dim[1] * card[1]];
  slice[2] = dim[0];
  slice[3] = dim[1];
  image(cards, ...pos, ...dim, ...slice);

  // image(cardBack, ...pos, ...dim);

  drawUI();

  drawActions();

  drawCards();
}
