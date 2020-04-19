export interface Quiz {
  id: number;
  word: string;
  correctAnswer: string;
  wrongAnswers: string [];
  isWrong: boolean | null;
}
