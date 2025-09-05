import React from 'react';
import { Shuffle } from 'lucide-react';

interface WordSelectorProps {
  wordCount: number;
  onWordCountChange: (count: number) => void;
  onSelectWords: () => void;
  remainingWords: number;
  isDisabled: boolean;
}

export const WordSelector: React.FC<WordSelectorProps> = ({
  wordCount,
  onWordCountChange,
  onSelectWords,
  remainingWords,
  isDisabled
}) => {
  const maxCount = Math.min(remainingWords, 10);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Pick Words from the Jar
        </h2>
        
        <div className="mb-6">
          <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700 mb-2">
            Number of words to study
          </label>
          <select
            id="wordCount"
            value={wordCount}
            onChange={(e) => onWordCountChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isDisabled}
          >
            {Array.from({ length: maxCount }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num} word{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onSelectWords}
          disabled={isDisabled || remainingWords === 0}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Shuffle className="w-5 h-5" />
          {remainingWords === 0 ? 'No words available' : 'Pick Random Words'}
        </button>

        {remainingWords === 0 && (
          <p className="mt-4 text-sm text-gray-600">
            Congratulations! You've mastered all words. Click "Reset" to start over.
          </p>
        )}
      </div>
    </div>
  );
};