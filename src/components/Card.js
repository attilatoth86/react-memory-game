import CARD_BACK from '../assets/cards/card-back1.png';


function Card({cardObject, isTurned, handleCardClick}) {

    return (
      <div>
        <img alt = "" src={isTurned ? cardObject.object : CARD_BACK} 
            onClick={()=>handleCardClick(cardObject.id)}
        />
      </div>
    );
  
  }

export default Card;