import React, { useState, useEffect } from 'react';
import { CompactHeader } from './components/CompactHeader';
import { StudyTab } from './components/StudyTab';
import { ConfigTab } from './components/ConfigTab';
import { Flashcard } from './components/Flashcard';
import { Word } from './types';
import { getRandomWords } from './utils/wordSelection';
import { saveWords, loadWords } from './utils/storage';
import { parseCSV } from './utils/csvParser';
import { initialWords } from './data/initialWords';

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [wordCount, setWordCount] = useState(3);
  const [activeTab, setActiveTab] = useState<'study' | 'config'>('study');

  // Load words from localStorage on mount
  useEffect(() => {
    const savedWords = loadWords();
    setWords(savedWords || initialWords);
  }, []);

  // Save words to localStorage whenever words change
  useEffect(() => {
    if (words.length > 0) {
      saveWords(words);
    }
  }, [words]);

  const successCount = words.filter(word => word.isSuccess).length;
  const remainingWords = words.length - successCount;

  const handleSelectWords = () => {
    const selected = getRandomWords(words, wordCount);
    setSelectedWords(selected);
  };

  const handleDropBack = (word: Word) => {
    setSelectedWords(prev => prev.filter(w => w.id !== word.id));
  };

  const handleMarkSuccess = (word: Word) => {
    setWords(prev => 
      prev.map(w => 
        w.id === word.id ? { ...w, isSuccess: true } : w
      )
    );
    setSelectedWords(prev => prev.filter(w => w.id !== word.id));
  };

  const handleReset = () => {
    if (window.confirm('This will reset all progress and make all words available again. Are you sure?')) {
      setWords(prev => 
        prev.map(word => ({ ...word, isSuccess: false }))
      );
      setSelectedWords([]);
    }
  };

  const handleAddWords = (newWords: Word[]) => {
    setWords(prev => [...prev, ...newWords]);
  };

  const handleCSVUpload = (csvContent: string) => {
    try {
      const newWords = parseCSV(csvContent);
      handleAddWords(newWords);
      alert(`Successfully imported ${newWords.length} words!`);
    } catch (error) {
      alert(`Error importing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <CompactHeader
        totalWords={words.length}
        successCount={successCount}
        remainingWords={remainingWords}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="max-w-6xl mx-auto px-4 py-4">
        {activeTab === 'study' && (
          <StudyTab
            wordCount={wordCount}
            onWordCountChange={setWordCount}
            onSelectWords={handleSelectWords}
            remainingWords={remainingWords}
            isDisabled={selectedWords.length > 0}
          />
        )}

        {activeTab === 'config' && (
          <ConfigTab
            onReset={handleReset}
            onAddWords={handleAddWords}
            onCSVUpload={handleCSVUpload}
          />
        )}

        {selectedWords.length > 0 && (
          <div className="mt-6">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Study Session ({selectedWords.length} words)
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {selectedWords.map(word => (
                <Flashcard
                  key={word.id}
                  word={word}
                  onDropBack={handleDropBack}
                  onMarkSuccess={handleMarkSuccess}
                />
              ))}
            </div>
          </div>
        )}

        {selectedWords.length === 0 && remainingWords > 0 && activeTab === 'study' && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Select how many words to study and click "Pick Words" to start!
            </p>
          </div>
        )}

        {remainingWords === 0 && (
          <div className="text-center py-12">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
              <p className="text-green-700">You've mastered all words!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;