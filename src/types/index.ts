export interface Word {
  id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  sentence: string;
  category: 'high' | 'medium' | 'low';
  isSuccess: boolean;
}

export interface AppState {
  words: Word[];
  selectedWords: Word[];
  wordCount: number;
  showAddForm: boolean;
}