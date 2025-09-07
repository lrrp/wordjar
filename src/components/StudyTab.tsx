import React from 'react';
import { Shuffle } from 'lucide-react';

interface StudyTabProps {
  wordCount: number;
  onWordCountChange: (count: number) => void;
  onSelectWords: () => void;
  remainingWords: number;
  isDisabled: boolean;
}

export const StudyTab: React.FC<StudyTabProps> = ({
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">Pick Words to Study</h2>
        <p className="text-gray-600 mb-6">Select how many words you want to practice</p>
        
        <div className="max-w-sm mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Words
            </label>
            <select
              value={wordCount}
              onChange={(e) => onWordCountChange(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-medium"
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
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
          >
            <Shuffle className="w-5 h-5" />
            {remainingWords === 0 ? 'No Words Available' : 'Pick Words'}
          </button>

          {isDisabled && (
            <p className="text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-3">
              Complete your current study session before picking new words
            </p>
          )}

          {remainingWords > 0 && (
            <p className="text-sm text-gray-500">
              {remainingWords} words available for study
            </p>
          )}
        </div>
      </div>
    </div>
  );
};