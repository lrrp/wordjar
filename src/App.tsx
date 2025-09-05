import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WordSelector } from './components/WordSelector';
import { Flashcard } from './components/Flashcard';
import { AddWordForm } from './components/AddWordForm';
import { Word } from './types';
import { getRandomWords } from './utils/wordSelection';
import { saveWords, loadWords } from './utils/storage';
import { initialWords } from './data/initialWords';

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [wordCount, setWordCount] = useState(3);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleAddWord = (newWord: Word) => {
    setWords(prev => [...prev, newWord]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        totalWords={words.length}
        successCount={successCount}
        onReset={handleReset}
        onAddWord={() => setShowAddForm(true)}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <WordSelector
            wordCount={wordCount}
            onWordCountChange={setWordCount}
            onSelectWords={handleSelectWords}
            remainingWords={remainingWords}
            isDisabled={selectedWords.length > 0}
          />

          {selectedWords.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Study These Words
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
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

          {selectedWords.length === 0 && remainingWords > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Ready to study? Pick some words from the jar above!
              </p>
            </div>
          )}
        </div>
      </div>

      {showAddForm && (
        <AddWordForm
          onAdd={handleAddWord}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;