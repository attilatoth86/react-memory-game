import { useEffect, useState } from "react";
import getCardsForMemoryGame from "../utils/getCardsForMemoryGame"
import { cardShapes } from "../utils/cardShapes"
import Card from "./Card";
import { Avatar, Button, Chip, Container, Grid } from "@mui/material";


function Board() {

    const [cards, setCards] = useState(getCardsForMemoryGame(12, cardShapes));
    const [cardsUp, setCardsUp] = useState([]);
    const [cardsMatched, setCardsMatched] = useState([]);
    const [noOfTurns, setNoOfTurns] = useState(0);

    useEffect(
        () => {
            if (cardsUp.length<2) { return; }

            const cardsEval = cards.filter(e => cardsUp.includes(e.id));
            if(cardsEval[0].shape === cardsEval[1].shape) {
                setCardsUp([]);
                setCardsMatched(
                    [...cardsMatched, cardsEval[0].id, cardsEval[1].id]);
            }

            const timeOut = setTimeout(() => setCardsUp([]), 1000);
            return () => {
                clearTimeout(timeOut);
            }
        }, [cardsUp, cardsMatched, cards, setCardsUp, setCardsMatched]
    );


    const handleCardClick = (cardId) => {
        if (cardsUp.includes(cardId) || cardsMatched.includes(cardId) ) {
            return;
        }
        
        if (cardsUp.length<2) {
            setCardsUp([...cardsUp, cardId]);
            setNoOfTurns(noOfTurns+1);
        }
    };


    const restartGame = () => {
        setCards(getCardsForMemoryGame(12, cardShapes));
        setCardsUp([]);
        setCardsMatched([]);
        setNoOfTurns(0);
    };

    
    return (
      <Container maxWidth="xs" sx={{p: 1}}>
        <Grid container spacing={1}> 
          <Grid item xs={12}>
            <Chip avatar={<Avatar>{noOfTurns}</Avatar>} 
                label="card turns in this game" 
            />
          </Grid>
          {cards.map(e => {
            return (
              <Grid key={e.id} item xs={4}>
                <Card cardObject={e} 
                  isTurned={
                    cardsUp.includes(e.id) || cardsMatched.includes(e.id) ? true : false
                    }
                  handleCardClick={handleCardClick}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button variant="contained" fullWidth size="small" 
                onClick={restartGame}>
                Restart Game
            </Button>
          </Grid>
        </Grid>
      </Container>
    );

  }

export default Board;