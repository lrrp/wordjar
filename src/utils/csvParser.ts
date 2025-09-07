import { Word } from '../types';
import { generateId } from './wordSelection';

export const parseCSV = (csvContent: string): Word[] => {
  const lines = csvContent.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV must contain at least a header row and one data row');
  }

  const header = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  // Validate required columns
  const requiredColumns = ['word', 'meaning', 'sentence'];
  const missingColumns = requiredColumns.filter(col => !header.includes(col));
  
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  const words: Word[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    const values = parseCSVLine(line);
    
    if (values.length !== header.length) {
      console.warn(`Skipping line ${i + 1}: Column count mismatch`);
      continue;
    }

    const rowData: { [key: string]: string } = {};
    header.forEach((col, index) => {
      rowData[col] = values[index]?.trim() || '';
    });

    // Validate required fields
    if (!rowData.word || !rowData.meaning || !rowData.sentence) {
      console.warn(`Skipping line ${i + 1}: Missing required fields`);
      continue;
    }

    // Validate category
    const category = rowData.category?.toLowerCase();
    const validCategory = ['high', 'medium', 'low'].includes(category) 
      ? category as Word['category'] 
      : 'medium';

    const word: Word = {
      id: generateId(),
      word: rowData.word,
      meaning: rowData.meaning,
      pronunciation: rowData.pronunciation || `/${rowData.word.toLowerCase()}/`,
      sentence: rowData.sentence,
      category: validCategory,
      isSuccess: false
    };

    words.push(word);
  }

  if (words.length === 0) {
    throw new Error('No valid words found in CSV');
  }

  return words;
};

// Helper function to properly parse CSV lines with quoted values
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current);
  
  return result;
};