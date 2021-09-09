let cards;
const DIM = [1800, 750];

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

function preload() {
  cards = loadImage('./textures/cards/AllCards.jpg');
}

function setup() {
  createCanvas(...DIM);
}
// 114.285, 178.5
function draw() {
  background(50);
  const pos = [0, 0];
  const dim = [cards.width / 14, cards.height / 4];
  let card = CARDS.Hearts.Ace
  let slice = [dim[0] * card[0], dim[1] * card[1]];
  slice[2] = dim[0];
  slice[3] = dim[1];

  image(cards, ...pos, ...dim, ...slice);
}
