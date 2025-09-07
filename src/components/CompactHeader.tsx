import React from 'react';
import { BookOpen, Settings, X } from 'lucide-react';

interface CompactHeaderProps {
  totalWords: number;
  successCount: number;
  remainingWords: number;
  onToggleConfig: () => void;
  showConfig: boolean;
}

export const CompactHeader: React.FC<CompactHeaderProps> = ({ 
  totalWords, 
  successCount, 
  remainingWords,
  onToggleConfig,
  showConfig
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Word Jar</h1>
              <p className="text-xs text-gray-600">SAT Vocabulary</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-600">{remainingWords}</div>
                <div className="text-xs text-gray-500">remaining</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{successCount}</div>
                <div className="text-xs text-gray-500">mastered</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-600">{totalWords}</div>
                <div className="text-xs text-gray-500">total</div>
              </div>
            </div>

            <button
              onClick={onToggleConfig}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              {showConfig ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              <span className="hidden sm:inline text-sm">
                {showConfig ? 'Hide' : 'Settings'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="sm:hidden flex justify-center gap-6 mt-2 text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-600">{remainingWords}</div>
            <div className="text-xs text-gray-500">remaining</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600">{successCount}</div>
            <div className="text-xs text-gray-500">mastered</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-600">{totalWords}</div>
            <div className="text-xs text-gray-500">total</div>
          </div>
        </div>
      </div>
    </header>
  );
};