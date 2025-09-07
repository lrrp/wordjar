import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Word } from '../types';
import { generateId } from '../utils/wordSelection';

interface AddWordFormProps {
  onAdd: (word: Word) => void;
  onClose: () => void;
}

export const AddWordForm: React.FC<AddWordFormProps> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    pronunciation: '',
    sentence: '',
    category: 'medium' as Word['category']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.word.trim() || !formData.meaning.trim() || !formData.sentence.trim()) {
      return;
    }

    const newWord: Word = {
      id: generateId(),
      word: formData.word.trim(),
      meaning: formData.meaning.trim(),
      pronunciation: formData.pronunciation.trim() || `/${formData.word.toLowerCase()}/`,
      sentence: formData.sentence.trim(),
      category: formData.category,
      isSuccess: false
    };

    onAdd(newWord);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Add New Word</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="word" className="block text-xs font-medium text-gray-700 mb-1">
                Word *
              </label>
              <input
                type="text"
                id="word"
                value={formData.word}
                onChange={(e) => handleChange('word', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the word"
                required
              />
            </div>

            <div>
              <label htmlFor="pronunciation" className="block text-xs font-medium text-gray-700 mb-1">
                Pronunciation
              </label>
              <input
                type="text"
                id="pronunciation"
                value={formData.pronunciation}
                onChange={(e) => handleChange('pronunciation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="/prəˌnʌnsiˈeɪʃən/"
              />
            </div>

            <div>
              <label htmlFor="meaning" className="block text-xs font-medium text-gray-700 mb-1">
                Meaning *
              </label>
              <textarea
                id="meaning"
                value={formData.meaning}
                onChange={(e) => handleChange('meaning', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter the definition"
                required
              />
            </div>

            <div>
              <label htmlFor="sentence" className="block text-xs font-medium text-gray-700 mb-1">
                Example Sentence *
              </label>
              <textarea
                id="sentence"
                value={formData.sentence}
                onChange={(e) => handleChange('sentence', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter a sentence using the word"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
                Priority Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Higher priority words appear more frequently in random selections
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={!formData.word.trim() || !formData.meaning.trim() || !formData.sentence.trim()}
              >
                Add Word
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};