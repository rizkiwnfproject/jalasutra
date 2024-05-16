import React, { useState } from 'react';
import { questions } from '../kuisioner/question';


const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    setSelectedOption(answer);
  };

  const handleNext = () => {
    // Pindah ke pertanyaan berikutnya jika belum mencapai pertanyaan terakhir
    if (currentQuestion < questions.length - 1 && answers[currentQuestion] !== null) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handleBack = () => {
    // Kembali ke pertanyaan sebelumnya jika bukan pertanyaan pertama
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null); // Reset selected option
    }
  };

  const handleSubmit = () => {
    // Fungsi untuk menangani submit, gantilah sesuai kebutuhan Anda
    console.log('Submit clicked');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto my-8 p-8 bg-white rounded shadow">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={`${
            progress < 100 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'
          } text-white font-bold py-2 px-4 rounded inline-flex items-center`}
          disabled={answers[currentQuestion] === null} // Disable next jika belum ada jawaban
        >
          {progress < 100 ? 'Next' : 'Submit'}
        </button>
        <span className="text-sm text-gray-600 ml-2">{`Progress: ${progress.toFixed(0)}%`}</span>
      </div>
      <h2 className="text-lg font-semibold mb-4">
        {questions[currentQuestion].question}{' '}
        {answers[currentQuestion] !== null && (
          <span className="font-bold text-blue-500">
            (Jawaban: {answers[currentQuestion]})
          </span>
        )}
      </h2>
      <div className="flex space-x-4">
        {questions[currentQuestion].options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center space-x-2 cursor-pointer ${
              selectedOption === option ? 'border border-blue-500' : ''
            }`}
          >
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value={option}
              checked={answers[currentQuestion] === option}
              onChange={() => handleAnswer(option)}
              className="hidden"
            />
            <span
              className={`emoji ${
                answers[currentQuestion] === option ? 'font-bold text-blue-500' : ''
              }`}
              role="img"
              aria-label={option}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;
