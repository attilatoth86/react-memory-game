import { useEffect, useState } from 'react';
import './App.css';
import CARD_BACK from './assets/cards/card-back1.png';

import { generateCards } from './utils';


function Card(props) {
  const [cardUp, setCardUp] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  useEffect(
    () => {

      // conditional action on turned cards only
      if (cardUp) {

        // no action until two cards are turned
        if (props.appStateTurnedCards.length===2) { 

          // compare the two turned cards
          if (props.appStateTurnedCards[0] === props.appStateTurnedCards[1]) {

            // if matching, set their isMatched state and clear App's state
            props.clearTurnedCards();
            setIsMatched(true);

          }
          else {

            // else turn back the (unmatched) cards and clear App's state in 1s
            setTimeout(() => {
              if (!isMatched) {
                setCardUp(false);
              }
              props.clearTurnedCards();
            }, 1000);

          }
        }
      }
    }, [cardUp, isMatched, props]
    );


  const handleClick = () => {

    // disable card turn if the card is up already or at least 2 cards are turned
    if (!cardUp & props.appStateTurnedCards.length<2) {

      setCardUp(true);

      // pass turned card's shape into App's state
      props.handleCardTurn(props.cardObj.name);

    }
  };

  return (
    <img src = {cardUp ? props.cardObj.object : CARD_BACK} alt = "" 
      onClick={handleClick} />
  )
}


function App() {

  const [cards, setCards] = useState(generateCards());

  // organize cards into two rows
  const cardRows = [
    cards.slice(0, cards.length/2), 
    cards.slice(cards.length/2, cards.length)
  ];


  // add state to keep track of turned cards
  const [turnedCards, setTurnedCards] = useState([]);

  // manage state if a card is turned
  function handleCardTurn(card) {
    const newState = [...turnedCards, card];
    setTurnedCards(newState);
  }

  // clear state
  function clearTurnedCards() {
    setTurnedCards([]);
  }

  
  return (
    <div className="App">
      <table>
        <tbody>
          { 
          cardRows.map((cardRow, cardRowIdx) => {
            return (
              <tr key={cardRowIdx}>
                { cardRow.map((card) => {
                  return (
                  <td key={"td-" + card.id}>
                    <Card key={card.id} cardObj={card} 
                      handleCardTurn={handleCardTurn} 
                      appStateTurnedCards={turnedCards}
                      clearTurnedCards={clearTurnedCards}
                      />
                  </td>
                  )
                }) }
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
