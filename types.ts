export interface Subtopic {
  title: string;
  time: string;
  details?: string[];
}

export interface ModuleData {
  id: number;
  title: string;
  duration: string;
  subtopics: Subtopic[];
  outcomes: string[];
}

export enum LearningMode {
  LESSON = 'LESSON',
  QUIZ = 'QUIZ',
  FLASHCARDS = 'FLASHCARDS',
  SUMMARY = 'SUMMARY'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-3
  explanation: string;
}

export interface Flashcard {
  term: string;
  definition: string;
}

export type GeneratedContent = 
  | { type: 'text'; content: string }
  | { type: 'quiz'; content: QuizQuestion[] }
  | { type: 'flashcards'; content: Flashcard[] };
