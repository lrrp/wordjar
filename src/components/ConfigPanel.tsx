import React, { useState } from 'react';
import { Shuffle, RotateCcw, Plus, Upload, Download } from 'lucide-react';
import { AddWordForm } from './AddWordForm';
import { Word } from '../types';

interface ConfigPanelProps {
  wordCount: number;
  onWordCountChange: (count: number) => void;
  onSelectWords: () => void;
  remainingWords: number;
  isDisabled: boolean;
  onReset: () => void;
  onAddWords: (words: Word[]) => void;
  onCSVUpload: (csvContent: string) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  wordCount,
  onWordCountChange,
  onSelectWords,
  remainingWords,
  isDisabled,
  onReset,
  onAddWords,
  onCSVUpload
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const maxCount = Math.min(remainingWords, 10);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target?.result as string;
        onCSVUpload(csvContent);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid CSV file');
    }
    // Reset input
    event.target.value = '';
  };

  const downloadSampleCSV = () => {
    const sampleCSV = `word,meaning,pronunciation,sentence,category
Ubiquitous,Present everywhere,/juːˈbɪkwɪtəs/,Smartphones are ubiquitous in modern society,high
Ephemeral,Lasting for a very short time,/ɪˈfemərəl/,The beauty of cherry blossoms is ephemeral,medium
Serendipity,Pleasant surprise or fortunate accident,/ˌserənˈdɪpəti/,Finding that book was pure serendipity,low`;
    
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-words.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Word Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Words to Study
            </label>
            <select
              value={wordCount}
              onChange={(e) => onWordCountChange(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              disabled={isDisabled}
            >
              {Array.from({ length: maxCount }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num} word{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Study Session
            </label>
            <button
              onClick={onSelectWords}
              disabled={isDisabled || remainingWords === 0}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              <Shuffle className="w-4 h-4" />
              {remainingWords === 0 ? 'No Words' : 'Pick Words'}
            </button>
          </div>

          {/* Add Words */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Add Words
            </label>
            <div className="flex gap-1">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="flex items-center justify-center gap-1 px-2 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reset & Sample */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Actions
            </label>
            <div className="flex gap-1">
              <button
                onClick={onReset}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={downloadSampleCSV}
                className="flex items-center justify-center gap-1 px-2 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Sample</span>
              </button>
            </div>
          </div>
        </div>

        {/* CSV Upload Instructions */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>CSV Format:</strong> word, meaning, pronunciation, sentence, category (high/medium/low)
            <br />
            <span className="text-blue-600">Click "Sample" to download a template file.</span>
          </p>
        </div>
      </div>

      {showAddForm && (
        <AddWordForm
          onAdd={(word) => onAddWords([word])}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </>
  );
};