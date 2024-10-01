import './App.css';
import { useState } from 'react';
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

const App = () => {
  const cardPairsEasy = [
    { question: 'What has keys but can’t open locks?', answer: 'A piano' },
    { question: 'What can travel around the world while staying in a corner?', answer: 'A stamp' },
    { question: 'If you were a fruit, what fruit would you be?', answer: 'A pineapple' },
    { question: 'What gets wetter as it dries?', answer: 'A towel' },
    { question: 'What has a heart that doesn’t beat?', answer: 'An artichoke' },
    { question: 'If you could be any animal, what would you be?', answer: 'An eagle' },
    { question: 'What can you catch but not throw?', answer: 'A cold' },
  ];

  const cardPairsMedium = [
    { question: 'What has to be broken before you can use it?', answer: 'An egg' },
    { question: 'What has a neck but no head?', answer: 'A bottle' },
    { question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?', answer: 'An echo' },
    { question: 'What has one eye but can’t see?', answer: 'A needle' },
    { question: 'I’m light as a feather, yet the strongest man can’t hold me for five minutes. What am I?', answer: 'Breath' },
    { question: 'The more you take, the more you leave behind. What am I?', answer: 'Footsteps' },
    { question: 'What begins with an “e” and only contains one letter?', answer: 'An envelope' },
    { question: 'What can fill a room but takes up no space?', answer: 'Light' },
    { question: 'What has a head, a tail, is brown, and has no legs?', answer: 'A penny' },
    { question: 'What can you keep after giving to someone?', answer: 'Your word' },
    { question: 'I am taken from a mine, and shut up in a wooden case, from which I am never released. What am I?', answer: 'Pencil lead' },
  ];

  const cardPairsHard = [
    { question: 'I can be cracked, made, told, and played. What am I?', answer: 'A joke' },
    { question: 'I am not alive, but I can grow. I don’t have lungs, but I need air. What am I?', answer: 'Fire' },
    { question: 'What has cities, but no houses; forests, but no trees; and rivers, but no water?', answer: 'A map' },
    { question: 'The more you take, the more you leave behind. What am I?', answer: 'Footsteps' },
    { question: 'What runs all around a backyard, yet never moves?', answer: 'A fence' },
    { question: 'What can’t talk but will reply when spoken to?', answer: 'An echo' },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showingQuestion, setShowingQuestion] = useState(true);
  const [currentDifficulty, setCurrentDifficulty] = useState('easy');

  const [cardColor, setCardColor] = useState('green');
  const colors = ['black', 'red', 'green', 'blue', 'purple', 'orange'];

  const getCurrentCardPairs = () => {
    switch (currentDifficulty) {
      case 'easy':
        return cardPairsEasy;
      case 'medium':
        return cardPairsMedium;
      case 'hard':
        return cardPairsHard;
      default:
        return cardPairsEasy;
    }
  };

  const currentCards = getCurrentCardPairs();

  const flipCard = () => {
    setShowingQuestion(prevState => !prevState);
    setCardColor(colors[Math.floor(Math.random() * colors.length)]); 
  };

  const showNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % currentCards.length;
    setCurrentCardIndex(nextIndex);
    setShowingQuestion(true);
    setCardColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const showPreviousCard = () => {
    const previousIndex = currentCardIndex > 0 ? currentCardIndex - 1 : currentCards.length - 1;
    setCurrentCardIndex(previousIndex);
    setShowingQuestion(true);
    setCardColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleDifficultyChange = (difficulty) => {
    setCurrentDifficulty(difficulty);
    setCurrentCardIndex(0);
    setShowingQuestion(true);
    setCardColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div className="PageContainer">
      <div className="TitleContainer">
        <h1> Think About It! </h1>
        <h2> How good are you at thinking outside of the box?</h2>
        <div className="difficultyButtons">
          <button className="buttonEasy" onClick={() => handleDifficultyChange('easy')}>Easy</button>
          <button className="buttonMedium" onClick={() => handleDifficultyChange('medium')}>Medium</button>
          <button className="buttonHard" onClick={() => handleDifficultyChange('hard')}>Hard</button>
        </div>
        <h3> Number of Cards: {currentCards.length}</h3>
      </div>
      <div className={`FlashCardContainer ${!showingQuestion ? 'flip' : ''}`} onClick={flipCard}>
        <div className={`FlashCardContent front ${showingQuestion ? '' : 'hidden'}`} style={{ backgroundColor: currentDifficulty === 'easy' ? '#b0d8a4' : 
        currentDifficulty === 'medium' ? '#fee191' :
        '#e84258',
      }}>
          <p>{currentCards[currentCardIndex].question}</p>
        </div>
        <div className={`FlashCardContent back ${showingQuestion ? 'hidden' : ''}`} style={{ backgroundColor: currentDifficulty === 'easy' ? '#b0d8a4' : 
        currentDifficulty === 'medium' ? '#fee191' :
        '#e84258',
      }}>
          <p>{currentCards[currentCardIndex].answer}</p>
        </div>
      </div>
      <div className="buttons">
        <div className="buttonLeft" onClick={showPreviousCard}><HiOutlineArrowSmLeft /></div>
        <div className="buttonRight" onClick={showNextCard}><HiOutlineArrowSmRight /></div>
      </div>
    </div>
  );
};

export default App;