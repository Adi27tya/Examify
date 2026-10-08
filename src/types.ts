export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
}

export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswerIndex: number; // 0 to 3
  explanation: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingPercentage: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  questions: Question[];
}

export interface ExamResult {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  examSubject: string;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  correctCount: number;
  wrongCount: number;
  score: number; // same as correctCount
  percentage: number;
  passed: boolean;
  completedAt: string;
  timeSpentSeconds: number;
  userAnswers: Record<number, number>; // questionId -> optionIndex
  markedForReview: number[]; // questionIds
}
