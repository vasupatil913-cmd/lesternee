import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface QuizViewProps {
  questions: QuizQuestion[];
  onRetry: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, onRetry }) => {
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (showResults) return;
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((ans, idx) => {
      if (ans === questions[idx].correctAnswerIndex) score++;
    });
    return score;
  };

  const allAnswered = userAnswers.every(a => a !== -1);

  if (questions.length === 0) {
    return <div className="text-center text-slate-400 p-8">No questions generated. Try again.</div>;
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h2 className="text-xl font-bold text-white">Knowledge Check</h2>
        {showResults ? (
          <div className="text-emerald-400 font-mono font-bold text-lg">
            Score: {calculateScore()} / {questions.length}
          </div>
        ) : (
          <div className="text-slate-400 text-sm">
            {userAnswers.filter(a => a !== -1).length} / {questions.length} Answered
          </div>
        )}
      </div>

      {questions.map((q, qIdx) => {
        const isCorrect = userAnswers[qIdx] === q.correctAnswerIndex;
        const userAnswer = userAnswers[qIdx];
        
        return (
          <div key={qIdx} className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-lg text-slate-200 mb-4 font-medium">
              {qIdx + 1}. {q.question}
            </h3>
            <div className="space-y-3">
              {q.options.map((opt, optIdx) => {
                let btnClass = "w-full text-left p-3 rounded border transition-all ";
                
                if (showResults) {
                  if (optIdx === q.correctAnswerIndex) {
                    btnClass += "bg-emerald-900/40 border-emerald-500 text-emerald-300";
                  } else if (optIdx === userAnswer && userAnswer !== q.correctAnswerIndex) {
                    btnClass += "bg-red-900/40 border-red-500 text-red-300";
                  } else {
                    btnClass += "bg-slate-800 border-slate-700 text-slate-500 opacity-50";
                  }
                } else {
                  if (userAnswer === optIdx) {
                    btnClass += "bg-emerald-900/20 border-emerald-500 text-emerald-200";
                  } else {
                    btnClass += "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(qIdx, optIdx)}
                    className={btnClass}
                    disabled={showResults}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showResults && (
              <div className={`mt-4 p-4 rounded border ${isCorrect ? 'bg-emerald-900/10 border-emerald-900/30' : 'bg-red-900/10 border-red-900/30'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? <CheckCircle size={18} className="text-emerald-500" /> : <XCircle size={18} className="text-red-500" />}
                  <span className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">{q.explanation}</p>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-center pt-6 pb-12">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              allAnswered 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50' 
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={onRetry}
            className="flex items-center px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-bold transition-all"
          >
            <RefreshCw size={18} className="mr-2" /> Try Another Set
          </button>
        )}
      </div>
    </div>
  );
};
