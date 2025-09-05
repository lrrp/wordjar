import { Word } from '../types';

export const getRandomWords = (words: Word[], count: number): Word[] => {
  const availableWords = words.filter(word => !word.isSuccess);
  
  if (availableWords.length === 0) return [];
  if (availableWords.length <= count) return [...availableWords];

  // Create weighted array based on category
  const weightedWords: Word[] = [];
  
  availableWords.forEach(word => {
    let weight = 1;
    switch (word.category) {
      case 'high':
        weight = 3;
        break;
      case 'medium':
        weight = 2;
        break;
      case 'low':
        weight = 1;
        break;
    }
    
    // Add word multiple times based on weight
    for (let i = 0; i < weight; i++) {
      weightedWords.push(word);
    }
  });

  // Shuffle and pick unique words
  const shuffled = [...weightedWords].sort(() => Math.random() - 0.5);
  const selected: Word[] = [];
  const selectedIds = new Set<string>();

  for (const word of shuffled) {
    if (!selectedIds.has(word.id) && selected.length < count) {
      selected.push(word);
      selectedIds.add(word.id);
    }
  }

  return selected;
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};