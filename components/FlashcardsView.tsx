import React, { useState } from 'react';
import { Flashcard } from '../types';
import { RefreshCw, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';

interface FlashcardsViewProps {
  cards: Flashcard[];
  onRetry: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ cards, onRetry }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 200);
  };

  if (cards.length === 0) return <div className="text-center text-slate-400">No flashcards available.</div>;

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full max-w-2xl mx-auto p-4">
      <div className="w-full flex justify-between items-center mb-6 text-slate-400">
        <span>Card {currentIndex + 1} of {cards.length}</span>
        <button onClick={onRetry} className="hover:text-emerald-400 flex items-center gap-1 text-sm">
          <RefreshCw size={14} /> New Set
        </button>
      </div>

      <div 
        className="group perspective w-full h-80 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative preserve-3d w-full h-full duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute backface-hidden w-full h-full bg-slate-800 border-2 border-emerald-900/30 rounded-xl flex flex-col items-center justify-center p-8 shadow-2xl group-hover:border-emerald-500/50 transition-colors">
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-widest absolute top-6">Term</span>
            <h3 className="text-3xl font-bold text-center text-white">{currentCard.term}</h3>
            <div className="absolute bottom-6 text-slate-500 text-sm flex items-center">
              <RotateCw size={14} className="mr-2" /> Click to flip
            </div>
          </div>

          {/* Back */}
          <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-emerald-900/20 border-2 border-emerald-500 rounded-xl flex flex-col items-center justify-center p-8 shadow-2xl">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest absolute top-6">Definition</span>
            <p className="text-xl text-center text-emerald-100 leading-relaxed">{currentCard.definition}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-10">
        <button 
          onClick={handlePrev}
          className="p-4 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="p-4 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/50"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};
