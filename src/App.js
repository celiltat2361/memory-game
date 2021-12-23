import './App.css';
import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/ads.png", matched: false },
  { "src": "/img/alnya.png", matched: false },
  { "src": "/img/antly.png", matched: false },
  { "src": "/img/bjk2.png", matched: false },
  { "src": "/img/fb.png", matched: false },
  { "src": "/img/grs.png", matched: false },
 /*  { "src": "/img/gs.png" }, */
  { "src": "/img/gztepe.png", matched: false },
  { "src": "/img/hty.png", matched: false },
  /* { "src": "/img/ibs.png" }, */
  { "src": "/img/krgmrk.png", matched: false },
  { "src": "/img/ks.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(null)

  //shuffle cards
   const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)  
    setCards(shuffledCards)
    setTurns(0)
  }
  //handle a choice
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards
  useEffect(() => {
   
    if (choiceOne && choiceTwo) { 
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  console.log(cards)

   useEffect(() => {
    shuffleCards()
  }, [])

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Superlig Teams Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Score: {turns}</p>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
    </div>
  );
}

export default App;
