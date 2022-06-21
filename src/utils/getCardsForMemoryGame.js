import randomListBuilder from "./randomListBuilder";


export default function getCardsForMemoryGame(noOfCards, availableCardShapes) {

    // TODO: check if `noOfCards` is integer larger than 2 and even

    const noOfShapesToSelect = noOfCards/2;

    const selectedShapes = randomListBuilder(
        availableCardShapes, noOfShapesToSelect, 1);

    const selectedCards = randomListBuilder(selectedShapes, noOfCards, 2);

    const indexedCards = selectedCards.map((e, idx) => ({id: idx + 1, ...e}));

    return indexedCards;

}