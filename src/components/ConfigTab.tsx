import React, { useState } from 'react';
import { RotateCcw, Plus, Upload, Download, AlertCircle } from 'lucide-react';
import { AddWordForm } from './AddWordForm';
import { Word } from '../types';

interface ConfigTabProps {
  onReset: () => void;
  onAddWords: (words: Word[]) => void;
  onCSVUpload: (csvContent: string) => void;
}

export const ConfigTab: React.FC<ConfigTabProps> = ({
  onReset,
  onAddWords,
  onCSVUpload
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

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
Serendipity,Pleasant surprise or fortunate accident,/ˌserənˈdɪpəti/,Finding that book was pure serendipity,low
Perspicacious,Having keen insight,/ˌpɜːrspɪˈkeɪʃəs/,Her perspicacious analysis impressed everyone,high
Magnanimous,Very generous or forgiving,/mæɡˈnænɪməs/,He was magnanimous in victory,medium`;
    
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Configuration</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Add Words Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              Add Words
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Single Word
              </button>
              
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
                  <Upload className="w-4 h-4" />
                  Upload CSV File
                </button>
              </div>
              
              <button
                onClick={downloadSampleCSV}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                <Download className="w-4 h-4" />
                Download Sample CSV
              </button>
            </div>
          </div>

          {/* Reset Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-orange-600" />
              Reset Progress
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All Progress
              </button>
              
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-orange-800">
                    This will mark all words as "not mastered" and make them available for study again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSV Instructions */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">CSV Upload Instructions</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Required columns:</strong> word, meaning, sentence</p>
            <p><strong>Optional columns:</strong> pronunciation, category (high/medium/low)</p>
            <p><strong>Format:</strong> Standard CSV with comma separators</p>
            <p className="text-blue-600">💡 Download the sample CSV to see the exact format</p>
          </div>
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