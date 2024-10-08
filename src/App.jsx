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
  const [currentGuess, setCurrentGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState('easy');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);

  const isGuessClose = (correctAnswer, userGuess) => {
    return correctAnswer.toLowerCase().includes(userGuess.toLowerCase());
  };

  const shuffleCards = () => {
    const shuffled = [...getCurrentCardPairs()].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setShowingQuestion(true);
  };

  const handleSubmitGuess = () => {
    const currentAnswer = getCurrentCards()[currentCardIndex].answer.toLowerCase();
    const userGuess = currentGuess.toLowerCase();

    if (isGuessClose(currentAnswer, userGuess)) {
      setFeedback("Correct!");
      setCurrentStreak(prev => prev + 1);
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }
    } else {
      setFeedback("Incorrect!");
      setCurrentStreak(0);
    }
    setShowFeedback(true);
    setShowingQuestion(false);
  };

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

  const getCurrentCards = () => shuffledCards.length > 0 ? shuffledCards : getCurrentCardPairs();

  const flipCard = () => {
    setShowingQuestion(prevState => !prevState);
  };

  const showNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % getCurrentCards().length;
    setCurrentCardIndex(nextIndex);
    setShowingQuestion(true);
    setFeedback(""); 
    setShowFeedback(false);
  };

  const showPreviousCard = () => {
    const previousIndex = currentCardIndex > 0 ? currentCardIndex - 1 : getCurrentCards().length - 1;
    setCurrentCardIndex(previousIndex);
    setShowingQuestion(true);
    setFeedback("");
    setShowFeedback(false); 
  };

  const markAsMastered = () => {
    const currentCard = getCurrentCards()[currentCardIndex];
    setMasteredCards([...masteredCards, currentCard]);

    const remainingCards = getCurrentCards().filter((_, index) => index !== currentCardIndex);
    setShuffledCards(remainingCards);
    if (remainingCards.length > 0) {
      showNextCard();
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handleDifficultyChange = (difficulty) => {
    setCurrentDifficulty(difficulty);
    setShuffledCards([]);
    setCurrentCardIndex(0);
    setShowingQuestion(true);
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
          <button className="buttonShuffle"onClick={shuffleCards}>Shuffle</button>
        </div>
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
        <p>Mastered Cards: {masteredCards.length}</p>
        <h3> Number of Cards: {getCurrentCards().length}</h3>
      </div>

      {getCurrentCards().length > 0 ? (
        <>
          <div className={`FlashCardContainer ${!showingQuestion ? 'flip' : ''}`} onClick={flipCard}>
            <div className={`FlashCardContent front ${showingQuestion ? '' : 'hidden'}`} style={{ backgroundColor: currentDifficulty === 'easy' ? '#b0d8a4' : currentDifficulty === 'medium' ? '#fee191' : '#e84258' }}>
              <p>{getCurrentCards()[currentCardIndex].question}</p>
            </div>
            <div className={`FlashCardContent back ${showingQuestion ? 'hidden' : ''}`} style={{ backgroundColor: currentDifficulty === 'easy' ? '#b0d8a4' : currentDifficulty === 'medium' ? '#fee191' : '#e84258' }}>
              <p>{getCurrentCards()[currentCardIndex].answer}</p>
            </div>
          </div>

          <div className="inputSection">
            <input 
              type="text" 
              value={currentGuess} 
              onChange={(e) => setCurrentGuess(e.target.value)} 
              placeholder="Enter your guess" 
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitGuess()} 
            />
            <button onClick={handleSubmitGuess}>Submit</button>
            <button onClick={markAsMastered}>Mark as Mastered</button>
          </div>

          {showFeedback && <p>{feedback}</p>}
          <div className="buttons">
            <div className="buttonLeft" onClick={showPreviousCard}><HiOutlineArrowSmLeft /></div>
            <div className="buttonRight" onClick={showNextCard}><HiOutlineArrowSmRight /></div>
          </div>
        </>
      ) : (
        <p>Congratulations! You've mastered all cards!</p>
      )}
    </div>
  );
};

export default App;