import CARD_HEARTS_1 from './assets/cards/card-hearts-1.png';
import CARD_CLUBS_1 from './assets/cards/card-clubs-1.png';
import CARD_DIAMONDS_1 from './assets/cards/card-diamonds-1.png';
import CARD_SPADES_1 from './assets/cards/card-spades-1.png';


export function generateCards() {
    const shapes = [
      {name: "clubs-1", object: CARD_CLUBS_1},
      {name: "diamonds-1", object: CARD_DIAMONDS_1},
      {name: "hearts-1", object: CARD_HEARTS_1}, 
      {name: "spades-1", object: CARD_SPADES_1}
    ];
    const getShapeIdx = () => Math.floor(Math.random()*4);
    const cards = [];
  
    let id = 1;
    while (cards.length<8) {
      const shape = shapes[getShapeIdx()];
      if (cards.filter(e => e.name===shape.name).length<2) {
        cards.push({id: id++, name: shape.name, object: shape.object});
      }
    }
  
    return cards;
  }