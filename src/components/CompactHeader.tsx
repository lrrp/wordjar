import React from 'react';
import { BookOpen, Play, Settings } from 'lucide-react';

interface CompactHeaderProps {
  totalWords: number;
  successCount: number;
  remainingWords: number;
  activeTab: 'study' | 'config';
  onTabChange: (tab: 'study' | 'config') => void;
}

export const CompactHeader: React.FC<CompactHeaderProps> = ({ 
  totalWords, 
  successCount, 
  remainingWords,
  activeTab,
  onTabChange
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Word Jar</h1>
              <p className="text-xs text-gray-600">SAT Vocabulary</p>
            </div>
          </div>

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
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onTabChange('study')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'study'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Play className="w-4 h-4" />
            Study
          </button>
          <button
            onClick={() => onTabChange('config')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'config'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Mobile stats */}
        <div className="sm:hidden flex justify-center gap-6 mt-3 text-sm">
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