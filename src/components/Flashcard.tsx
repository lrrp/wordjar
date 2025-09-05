import React, { useState } from 'react';
import { Rotate3D as RotateLeft, Check } from 'lucide-react';
import { Word } from '../types';

interface FlashcardProps {
  word: Word;
  onDropBack: (word: Word) => void;
  onMarkSuccess: (word: Word) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ 
  word, 
  onDropBack, 
  onMarkSuccess 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-orange-200 bg-orange-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-orange-100 text-orange-800',
      low: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${colors[category as keyof typeof colors]}`}>
        {category} priority
      </span>
    );
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative h-80 perspective-1000">
        <div 
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <div className={`absolute inset-0 w-full h-full rounded-xl border-2 ${getCategoryColor(word.category)} backface-hidden shadow-lg`}>
            <div className="p-6 h-full flex flex-col justify-center text-center">
              <div className="mb-4">
                {getCategoryBadge(word.category)}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {word.word}
              </h3>
              <p className="text-gray-600 text-sm">
                Click to reveal meaning
              </p>
            </div>
          </div>

          {/* Back of card */}
          <div className={`absolute inset-0 w-full h-full rounded-xl border-2 ${getCategoryColor(word.category)} backface-hidden shadow-lg rotate-y-180`}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex-1">
                <div className="mb-4">
                  {getCategoryBadge(word.category)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {word.word}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {word.pronunciation}
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Meaning:</h4>
                    <p className="text-gray-700">{word.meaning}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Example:</h4>
                    <p className="text-gray-700 italic">"{word.sentence}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onDropBack(word)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          <RotateLeft className="w-4 h-4" />
          Drop Back
        </button>
        <button
          onClick={() => onMarkSuccess(word)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          <Check className="w-4 h-4" />
          Mark Success
        </button>
      </div>
    </div>
  );
};