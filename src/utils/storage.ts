import { Word } from '../types';

const STORAGE_KEY = 'word-jar-data';

export const saveWords = (words: Word[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  } catch (error) {
    console.error('Failed to save words to localStorage:', error);
  }
};

export const loadWords = (): Word[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load words from localStorage:', error);
    return null;
  }
};