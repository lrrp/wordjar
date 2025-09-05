import React from 'react';
import { BookOpen, RotateCcw, Plus } from 'lucide-react';

interface HeaderProps {
  totalWords: number;
  successCount: number;
  onReset: () => void;
  onAddWord: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  totalWords, 
  successCount, 
  onReset, 
  onAddWord 
}) => {
  const remainingWords = totalWords - successCount;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Word Jar</h1>
              <p className="text-sm text-gray-600">
                SAT Vocabulary Study
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">{remainingWords}</span> words remaining
              </p>
              <p className="text-xs text-gray-500">
                {successCount} mastered
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onAddWord}
                className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Word
              </button>
              
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};