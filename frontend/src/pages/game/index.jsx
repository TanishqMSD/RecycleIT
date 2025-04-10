import React, { useState, useEffect } from 'react';
import questions from './questions.json';
import { motion, AnimatePresence } from 'framer-motion';

function GameHome() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  useEffect(() => {
    if (quizQuestions.length > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            handleSkip();
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, quizQuestions.length, showResults]);

  const startQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
      setQuizQuestions(shuffledQuestions.slice(0, 10));
      setUserAnswers({});
      setAnsweredQuestions({});
      setShowResults(false);
      setScore(0);
      setCurrentQuestionIndex(0);
      setTimeLeft(30);
      setCorrectAnswers(0);
      setIsLoading(false);
    }, 800);
  };

  const handleAnswer = (answer) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    setUserAnswers({ ...userAnswers, [currentQuestion.question]: answer });
    setAnsweredQuestions({ 
      ...answeredQuestions, 
      [currentQuestion.question]: isCorrect 
    });

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      calculateScore();
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    }
  };

  const calculateScore = () => {
    let finalScore = 0;
    quizQuestions.forEach((question) => {
      if (userAnswers[question.question] === question.answer) {
        finalScore += question.points;
      }
    });
    setScore(finalScore);
    setShowResults(true);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalPoints = quizQuestions.reduce((acc, q) => acc + q.points, 0);
  const progress = quizQuestions.length > 0 
    ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 
    : 0;
  const timePercentage = (timeLeft / 30) * 100;

  const getOptionStyle = (option) => {
    const isSelected = userAnswers[currentQuestion.question] === option;
    const isCorrect = currentQuestion.answer === option;
    const isAnswered = userAnswers[currentQuestion.question] !== undefined;
    
    if (!isAnswered) {
      return {
        base: 'bg-white border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50',
        selected: 'bg-emerald-100 border-emerald-400 shadow-sm',
        text: 'text-emerald-800'
      };
    }
    
    if (isSelected) {
      return isCorrect 
        ? {
            base: 'bg-green-100 border-green-400 shadow-sm',
            selected: 'bg-green-100 border-green-400 shadow-sm',
            text: 'text-green-900'
          }
        : {
            base: 'bg-red-100 border-red-400 shadow-sm',
            selected: 'bg-red-100 border-red-400 shadow-sm',
            text: 'text-red-900'
          };
    }
    
    if (isCorrect && isAnswered) {
      return {
        base: 'bg-green-50 border-green-300',
        text: 'text-green-800'
      };
    }
    
    return {
      base: 'bg-white border-gray-200',
      text: 'text-gray-600'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg text-emerald-800">Preparing your quiz...</p>
            </motion.div>
          ) : !quizQuestions.length ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100"
            >
              <div className="p-8 md:p-12 text-center">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold text-emerald-800 mb-2">E-Waste Awareness Quiz</h1>
                  <p className="text-lg text-emerald-700">Test your knowledge about electronic waste and sustainability</p>
                </div>
                <div className="space-y-6">
                  <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                    <h3 className="font-semibold text-emerald-700 mb-2">Quiz Details</h3>
                    <ul className="space-y-2 text-emerald-800">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        10 carefully selected questions
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        30 seconds per question
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Instant results with explanations
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl group hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl"
                  >
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-emerald-800 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 bg-emerald-700 rounded-xl group-hover:mb-12 group-hover:w-full"></span>
                    <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white font-bold text-lg">
                      Start Quiz Now
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : showResults ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100"
            >
              <div className="p-8 md:p-12 text-center">
                <div className="mb-8">
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 border-4 ${
                    score >= totalPoints * 0.8 
                      ? 'bg-emerald-50 border-emerald-300' 
                      : score >= totalPoints * 0.5 
                        ? 'bg-amber-50 border-amber-300' 
                        : 'bg-red-50 border-red-300'
                  }`}>
                    <span className={`text-4xl font-bold ${
                      score >= totalPoints * 0.8 
                        ? 'text-emerald-600' 
                        : score >= totalPoints * 0.5 
                          ? 'text-amber-600' 
                          : 'text-red-600'
                    }`}>
                      {Math.round((score / totalPoints) * 100)}%
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-emerald-800 mb-2">Quiz Completed!</h1>
                  <p className="text-lg text-emerald-700">
                    {score >= totalPoints * 0.8 
                      ? "Excellent! You're an E-Waste expert!" 
                      : score >= totalPoints * 0.5 
                        ? "Good job! You know quite a bit about E-Waste." 
                        : "Keep learning! E-Waste awareness is important."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-600">{score}</div>
                    <div className="text-sm text-emerald-800">Points Scored</div>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <div className="text-2xl font-bold text-teal-600">{correctAnswers}</div>
                    <div className="text-sm text-teal-800">Correct Answers</div>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-200">
                    <div className="text-2xl font-bold text-cyan-600">{quizQuestions.length}</div>
                    <div className="text-sm text-cyan-800">Total Questions</div>
                  </div>
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
                >
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100"
            >
              <div className="h-2 bg-emerald-100 w-full">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm font-medium text-emerald-700">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-2">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#d1fae5"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeDasharray="100"
                          strokeDashoffset={100 - timePercentage}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-emerald-600">
                        {timeLeft}s
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  key={`question-${currentQuestionIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-900 leading-tight">
                    {currentQuestion.question}
                  </h2>
                </motion.div>

                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, index) => {
                    const styles = getOptionStyle(option);
                    const isSelected = userAnswers[currentQuestion.question] === option;
                    
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: userAnswers[currentQuestion.question] ? 1 : 1.02 }}
                        whileTap={{ scale: userAnswers[currentQuestion.question] ? 1 : 0.98 }}
                      >
                        <label
                          className={`block p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            isSelected ? styles.selected : styles.base
                          } ${userAnswers[currentQuestion.question] ? 'pointer-events-none' : ''}`}
                        >
                          <input
                            type="radio"
                            name="quiz-option"
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswer(option)}
                            className="hidden"
                            disabled={userAnswers[currentQuestion.question] !== undefined}
                          />
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                              isSelected
                                ? answeredQuestions[currentQuestion.question]
                                  ? 'border-green-600 bg-green-600'
                                  : 'border-red-600 bg-red-600'
                                : currentQuestion.answer === option && userAnswers[currentQuestion.question]
                                  ? 'border-green-600 bg-green-600'
                                  : 'border-emerald-300'
                            }`}>
                              {(isSelected || (currentQuestion.answer === option && userAnswers[currentQuestion.question])) && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </div>
                            <span className={`font-medium ${styles.text}`}>
                              {option}
                            </span>
                          </div>
                        </label>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex justify-between">
                  {currentQuestionIndex > 0 && (
                    <button
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                      className="px-6 py-2 bg-emerald-100 text-emerald-800 font-medium rounded-lg hover:bg-emerald-200 transition-all border border-emerald-200"
                    >
                      Previous
                    </button>
                  )}
                  <div className="flex-grow"></div>
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <button
                      onClick={nextQuestion}
                      disabled={!userAnswers[currentQuestion.question]}
                      className={`px-6 py-2 font-medium rounded-lg transition-all ${
                        userAnswers[currentQuestion.question]
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
                          : 'bg-emerald-100 text-emerald-400 cursor-not-allowed'
                      }`}
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={calculateScore}
                      disabled={!userAnswers[currentQuestion.question]}
                      className={`px-6 py-2 font-medium rounded-lg transition-all ${
                        userAnswers[currentQuestion.question]
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-md'
                          : 'bg-emerald-100 text-emerald-400 cursor-not-allowed'
                      }`}
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GameHome;