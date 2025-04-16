"use client";

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { useState, useEffect, useRef } from 'react';
import { Trophy, Clock, RotateCcw, Zap, Heart, Share2, Volume2, VolumeX, Settings, BarChart, Award, Save } from 'lucide-react';

export default function EcoMatch() {
  // Expanded set of eco symbols for more variety
  const ecoSymbols = ['🌱', '🌿', '🌳', '🌺', '🌻', '♻️', '💧', '🌍', '🦋', '🐝', '🌞', '🌈', '🍃', '🌊', '🌵', '🦔'];

  const ecoFacts = [
    "One tree can absorb up to 48 pounds of CO2 per year!",
    "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
    "About 70% of the Earth's surface is covered by oceans.",
    "Wind turbines can generate enough electricity for 1,400 homes.",
    "Solar panels can last for 25-30 years with proper maintenance.",
    "Bamboo grows up to 35 inches per day!",
    "A single bee can visit up to 5,000 flowers in a single day.",
    "The Great Barrier Reef is the largest living structure on Earth.",
    "Electric vehicles produce zero direct emissions, helping reduce air pollution.",
    "Planting one acre of forest absorbs the same amount of carbon as driving a car 26,000 miles.",
    "About 80% of ocean pollution comes from land-based activities.",
    "Using reusable bags can save up to 700 plastic bags per person annually."
  ];

  const difficultyLevels = {
    easy: { pairs: 6, gridCols: 3 },
    medium: { pairs: 8, gridCols: 4 },
    hard: { pairs: 12, gridCols: 4 },
    expert: { pairs: 15, gridCols: 5 }
  };

  const themes = {
    nature: {
      primary: 'from-green-500 to-blue-500',
      secondary: 'from-blue-500 to-purple-500',
      accent: 'from-purple-500 to-pink-500',
      cardBg: 'linear-gradient(45deg, #2ecc71, #3498db)',
      titleGradient: 'linear-gradient(45deg, #2ecc71, #3498db)'
    },
    ocean: {
      primary: 'from-blue-500 to-cyan-500',
      secondary: 'from-cyan-500 to-teal-500',
      accent: 'from-teal-500 to-blue-400',
      cardBg: 'linear-gradient(45deg, #0099cc, #00ccff)',
      titleGradient: 'linear-gradient(45deg, #0099cc, #00ccff)'
    },
    forest: {
      primary: 'from-green-600 to-emerald-500',
      secondary: 'from-emerald-500 to-green-400',
      accent: 'from-yellow-500 to-amber-500',
      cardBg: 'linear-gradient(45deg, #2d6a4f, #40916c)',
      titleGradient: 'linear-gradient(45deg, #2d6a4f, #40916c)'
    }
  };

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currentFact, setCurrentFact] = useState("Match cards to learn interesting environmental facts!");
  const [difficulty, setDifficulty] = useState('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [theme, setTheme] = useState('nature');
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [cardSize, setCardSize] = useState('medium');
  const [hintUsed, setHintUsed] = useState(false);

  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const playSound = (soundType) => {
    if (!soundEnabled) return;

    // In a real implementation, you would create actual sound effects
    // This is just a placeholder for the concept
    console.log(`Playing ${soundType} sound`);
  };

  const startGame = () => {
    // Clear previous game state
    setFlippedCards([]);
    setMatchedPairs(0);
    setScore(0);
    setMoves(0);
    setSeconds(0);
    setLives(3);
    setCombo(0);
    setHintUsed(false);
    setCurrentFact("Match cards to learn interesting environmental facts!");
    setGameStarted(true);
    setShowSettings(false);
    setShowStats(false);

    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Get number of pairs based on difficulty
    const numPairs = difficultyLevels[difficulty].pairs;
    const selectedSymbols = shuffle(ecoSymbols).slice(0, numPairs);

    // Create pairs of symbols
    const symbolPairs = [...selectedSymbols, ...selectedSymbols];
    const shuffledSymbols = shuffle(symbolPairs);

    // Create card objects
    const newCards = shuffledSymbols.map((symbol, index) => ({
      id: index,
      symbol: symbol,
      isFlipped: false,
      isMatched: false
    }));

    setCards(newCards);

    // Start timer
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    playSound('gameStart');
  };

  const flipCard = (clickedCardId) => {
    if (!gameStarted) return;

    // Don't allow flipping if already 2 cards are flipped or the clicked card is already flipped/matched
    const clickedCard = cards.find(card => card.id === clickedCardId);
    if (
      flippedCards.length === 2 ||
      flippedCards.some(card => card.id === clickedCardId) ||
      clickedCard.isMatched
    ) {
      return;
    }

    playSound('flip');

    // Update cards state to flip the clicked card
    const updatedCards = cards.map(card =>
      card.id === clickedCardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    // Add to flipped cards
    const cardToAdd = updatedCards.find(card => card.id === clickedCardId);
    setFlippedCards(prev => [...prev, cardToAdd]);
  };

  const checkMatch = () => {
    const [card1, card2] = flippedCards;

    if (card1.symbol === card2.symbol) {
      // Match found
      setMatchedPairs(prev => prev + 1);

      // Increase combo and add bonus points
      setCombo(prev => prev + 1);
      const comboBonus = combo * 5;
      setScore(prev => prev + 10 + comboBonus);

      playSound('match');

      // Mark cards as matched
      const updatedCards = cards.map(card =>
        (card.id === card1.id || card.id === card2.id)
          ? { ...card, isMatched: true }
          : card
      );
      setCards(updatedCards);

      // Show random fact
      const randomFact = ecoFacts[Math.floor(Math.random() * ecoFacts.length)];
      setCurrentFact(randomFact);

      // Check for game completion
      if (matchedPairs + 1 === difficultyLevels[difficulty].pairs) {
        const finalScore = score + 10 + (combo * 5);
        const timeBonus = Math.max(0, 300 - seconds) * 2;
        const lifeBonus = lives * 25;
        const hintPenalty = hintUsed ? -50 : 0;
        const totalScore = finalScore + timeBonus + lifeBonus + hintPenalty;

        // Update best score/time
        if (totalScore > bestScore) {
          setBestScore(totalScore);
        }

        if (!bestTime || seconds < bestTime) {
          setBestTime(seconds);
        }

        // Add to game history
        const gameResult = {
          date: new Date().toLocaleString(),
          difficulty,
          score: totalScore,
          time: seconds,
          moves: moves + 1
        };
        setGameHistory(prev => [gameResult, ...prev].slice(0, 10));

        // Check for achievements
        checkAchievements(totalScore, seconds, moves);

        setTimeout(() => {
          playSound('victory');
          alert(`Congratulations! You won!\n
            Base Score: ${finalScore}\n
            Time Bonus: ${timeBonus}\n
            Life Bonus: ${lifeBonus}\n
            Hint Penalty: ${hintPenalty}\n
            Total Score: ${totalScore}\n
            Time: ${formatTime()}\n
            Moves: ${moves + 1}`);
          clearInterval(timerRef.current);
          setGameStarted(false);
        }, 500);
      }
    } else {
      // No match, flip cards back after delay
      setCombo(0);
      setLives(prev => Math.max(0, prev - 1));

      playSound('noMatch');

      setTimeout(() => {
        const updatedCards = cards.map(card =>
          (card.id === card1.id || card.id === card2.id)
            ? { ...card, isFlipped: false }
            : card
        );
        setCards(updatedCards);

        // Check if game over due to lives
        if (lives <= 1) {
          playSound('gameOver');
          alert(`Game Over! You ran out of lives.\nFinal Score: ${score}`);
          clearInterval(timerRef.current);
          setGameStarted(false);
        }
      }, 800);
    }

    // Increment moves and reset flipped cards
    setMoves(prev => prev + 1);
    setFlippedCards([]);
  };

  const checkAchievements = (finalScore, time, moves) => {
    const newAchievements = [];

    if (finalScore >= 200 && !achievements.includes("Eco Master"))
      newAchievements.push("Eco Master");
    if (time < 60 && !achievements.includes("Speed Matcher"))
      newAchievements.push("Speed Matcher");
    if (moves <= difficultyLevels[difficulty].pairs * 1.5 && !achievements.includes("Memory Expert"))
      newAchievements.push("Memory Expert");
    if (combo >= 5 && !achievements.includes("Combo King"))
      newAchievements.push("Combo King");
    if (difficulty === 'hard' && !achievements.includes("Hard Mode Champion"))
      newAchievements.push("Hard Mode Champion");
    if (difficulty === 'expert' && !achievements.includes("Expert Mode Champion"))
      newAchievements.push("Expert Mode Champion");
    if (lives === 3 && !achievements.includes("Perfect Game"))
      newAchievements.push("Perfect Game");

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      setTimeout(() => {
        alert(`New Achievements Unlocked!\n${newAchievements.join(', ')}`);
      }, 1000);
    }
  };

  const resetGame = () => {
    startGame();
  };

  const changeDifficulty = (level) => {
    setDifficulty(level);
    startGame();
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const showHint = () => {
    if (!gameStarted || hintUsed) return;

    // Temporarily flip all cards for 1 second
    const updatedCards = cards.map(card =>
      card.isMatched ? card : { ...card, isFlipped: true }
    );
    setCards(updatedCards);

    setHintUsed(true);

    setTimeout(() => {
      const resetCards = cards.map(card =>
        card.isMatched ? card : { ...card, isFlipped: false }
      );
      setCards(resetCards);
      setFlippedCards([]);
    }, 1000);
  };

  const changeCardSize = (size) => {
    setCardSize(size);
  };

  const saveGame = () => {
    // In a real implementation, this would save to localStorage or a database
    alert("Game progress saved!");
  };

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }, [flippedCards]);

  // Initialize game on component mount
  useEffect(() => {
    startGame();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Format timer display
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Get card size class
  const getCardSizeClass = () => {
    switch (cardSize) {
      case 'small': return 'h-12 w-12';
      case 'large': return 'h-24 w-24';
      default: return 'h-16 w-16';
    }
  };

  // Get current theme
  const currentTheme = themes[theme];

  return (
    <DefaultLayout>
      <div className="bg-gray-50 min-h-screen p-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="text-center py-3 px-4 border-b border-gray-100">
            <h1 className="text-3xl font-bold" style={{
              background: 'green',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>🌍 EcoMatch</h1>
            <p className="text-sm text-gray-500">Match the environmental symbols to save the planet!</p>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Column - Controls and Stats */}
            <div className="w-full md:w-1/3 p-4 border-r border-gray-100">
              {/* Game Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 rounded-md bg-gray-50 shadow-sm">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy size={14} className="text-yellow-500" />
                    <p className="text-xs font-medium">Score</p>
                  </div>
                  <p className="text-lg font-bold">{score}</p>
                </div>
                <div className="text-center p-2 rounded-md bg-gray-50 shadow-sm">
                  <div className="flex items-center justify-center gap-1">
                    <Clock size={14} className="text-green-500" />
                    <p className="text-xs font-medium">Time</p>
                  </div>
                  <p className="text-lg font-bold">{formatTime()}</p>
                </div>
                <div className="text-center p-2 rounded-md bg-gray-50 shadow-sm">
                  <div className="flex items-center justify-center gap-1">
                    <Heart size={14} className="text-red-500" />
                    <p className="text-xs font-medium">Lives</p>
                  </div>
                  <p className="text-lg font-bold">{lives}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center p-2 rounded-md bg-gray-50 shadow-sm">
                  <div className="flex items-center justify-center gap-1">
                    <RotateCcw size={14} className="text-blue-500" />
                    <p className="text-xs font-medium">Moves</p>
                  </div>
                  <p className="text-lg font-bold">{moves}</p>
                </div>
                <div className="text-center p-2 rounded-md bg-gray-50 shadow-sm">
                  <div className="flex items-center justify-center gap-1">
                    <Zap size={14} className="text-purple-500" />
                    <p className="text-xs font-medium">Combo</p>
                  </div>
                  <p className="text-lg font-bold">{combo}x</p>
                </div>
              </div>

              {/* Game Controls */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Game Controls</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={startGame}
                    className={`px-3 py-2 text-sm rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white transition-transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center gap-1`}
                  >
                    <Zap size={14} /> New Game
                  </button>
                  <button
                    onClick={resetGame}
                    className={`px-3 py-2 text-sm rounded-lg bg-gradient-to-r ${currentTheme.secondary} text-white transition-transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center gap-1`}
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                  <button
                    onClick={showHint}
                    disabled={!gameStarted || hintUsed}
                    className={`px-3 py-2 text-sm rounded-lg bg-gradient-to-r ${hintUsed ? 'from-gray-400 to-gray-500' : 'from-amber-500 to-orange-500'} text-white transition-transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center gap-1 ${!gameStarted || hintUsed ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Zap size={14} /> Hint
                  </button>
                  <button
                    onClick={saveGame}
                    className={`px-3 py-2 text-sm rounded-lg bg-gradient-to-r ${currentTheme.accent} text-white transition-transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center gap-1`}
                  >
                    <Save size={14} /> Save
                  </button>
                </div>
              </div>

              {/* Settings Button */}
              <div className="mb-4">
                <button
                  onClick={() => { setShowSettings(!showSettings); setShowStats(false); }}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center gap-1"
                >
                  <Settings size={14} /> {showSettings ? 'Hide Settings' : 'Show Settings'}
                </button>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Game Settings</h3>

                  {/* Theme Selection */}
                  <div className="mb-3">
                    <p className="text-xs mb-1">Theme:</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => changeTheme('nature')}
                        className={`px-2 py-1 text-xs rounded ${theme === 'nature' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                      >
                        Nature
                      </button>
                      <button
                        onClick={() => changeTheme('ocean')}
                        className={`px-2 py-1 text-xs rounded ${theme === 'ocean' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      >
                        Ocean
                      </button>
                      <button
                        onClick={() => changeTheme('forest')}
                        className={`px-2 py-1 text-xs rounded ${theme === 'forest' ? 'bg-emerald-500 text-white' : 'bg-gray-200'}`}
                      >
                        Forest
                      </button>
                    </div>
                  </div>

                  {/* Card Size */}
                  <div className="mb-3">
                    <p className="text-xs mb-1">Card Size:</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => changeCardSize('small')}
                        className={`px-2 py-1 text-xs rounded ${cardSize === 'small' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      >
                        Small
                      </button>
                      <button
                        onClick={() => changeCardSize('medium')}
                        className={`px-2 py-1 text-xs rounded ${cardSize === 'medium' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      >
                        Medium
                      </button>
                      <button
                        onClick={() => changeCardSize('large')}
                        className={`px-2 py-1 text-xs rounded ${cardSize === 'large' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      >
                        Large
                      </button>
                    </div>
                  </div>

                  {/* Sound Toggle */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs">Sound:</p>
                    <button
                      onClick={toggleSound}
                      className="p-1 text-gray-600 hover:text-blue-500"
                    >
                      {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Stats Button */}
              <div className="mb-4">
                <button
                  onClick={() => { setShowStats(!showStats); setShowSettings(false); }}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center gap-1"
                >
                  <BarChart size={14} /> {showStats ? 'Hide Stats' : 'Show Stats'}
                </button>
              </div>

              {/* Stats Panel */}
              {showStats && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Game Statistics</h3>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Best Score:</span>
                      <span className="font-bold">{bestScore}</span>
                    </div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Best Time:</span>
                      <span className="font-bold">{bestTime ? formatTime(bestTime) : '--:--'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Games Played:</span>
                      <span className="font-bold">{gameHistory.length}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-3">
                    <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                      <Award size={12} className="text-yellow-500" /> Achievements ({achievements.length})
                    </h4>
                    <div className="max-h-24 overflow-y-auto text-xs">
                      {achievements.length > 0 ? (
                        <ul className="list-disc pl-4">
                          {achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No achievements yet</p>
                      )}
                    </div>
                  </div>

                  {/* Game History */}
                  <div>
                    <h4 className="text-xs font-medium mb-1">Recent Games</h4>
                    <div className="max-h-32 overflow-y-auto">
                      {gameHistory.length > 0 ? (
                        <table className="w-full text-xs">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-1 px-2 text-left">Difficulty</th>
                              <th className="py-1 px-2 text-right">Score</th>
                              <th className="py-1 px-2 text-right">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gameHistory.map((game, index) => (
                              <tr key={index} className="border-t border-gray-100">
                                <td className="py-1 px-2 capitalize">{game.difficulty}</td>
                                <td className="py-1 px-2 text-right">{game.score}</td>
                                <td className="py-1 px-2 text-right">{formatTime(game.time)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-gray-500 italic text-xs">No games played yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Eco Fact */}
              <div className="mt-4 p-3 rounded-lg text-center text-gray-800 text-sm" style={{ backgroundColor: 'rgba(52, 152, 219, 0.1)' }}>
                <p>{currentFact}</p>
              </div>
            </div>

            {/* Right Column - Game Grid */}
            <div className="w-full md:w-2/3 p-4 flex items-center justify-center">
              <div className={`grid gap-2`} style={{
                gridTemplateColumns: `repeat(${difficultyLevels[difficulty].gridCols}, 1fr)`
              }}>
                {cards.map(card => (
                  <div
                    key={card.id}
                    className={`${getCardSizeClass()} bg-white rounded-md cursor-pointer shadow-sm hover:-translate-y-1 transition-transform overflow-hidden ${card.isMatched ? 'bg-green-50' : ''}`}
                    onClick={() => flipCard(card.id)}
                  >
                    <div className={`relative w-full h-full flex text-center transition-transform duration-500`} style={{
                      transformStyle: 'preserve-3d',
                      transform: card.isFlipped ? 'rotateY(180deg)' : ''
                    }}>
                      <div className="absolute w-full h-full backface-hidden flex items-center justify-center rounded-md" style={{
                        background: currentTheme.cardBg,
                        color: 'white',
                        backfaceVisibility: 'hidden'
                      }}>
                        <div className="animate-pulse opacity-75">🍃</div>
                      </div>
                      <div className="absolute w-full h-full backface-hidden flex items-center justify-center text-2xl bg-white rounded-md" style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden'
                      }}>
                        {card.symbol}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-50 text-xs border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Award size={12} className="text-yellow-500" />
              <span>Achievements: <b>{achievements.length}</b></span>
            </div>
            <div className="flex items-center gap-4">
              <span>Best Score: <b>{bestScore}</b></span>
              <span>Best Time: <b>{bestTime ? formatTime(bestTime) : '--:--'}</b></span>
            </div>
            <button
              className={`px-2 py-1 rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white text-xs flex items-center gap-1`}
            >
              <Share2 size={12} /> Share
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}