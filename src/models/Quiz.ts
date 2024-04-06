export class QuizViewModel {
  quizId: number;
  questionQuize: string;
  option: Option[];
}

export interface Option {
  answerId: number;
  textAnswerOption: string;
  isSelected: boolean;
}

export class SummaryViewModel {
  name: string;
  point: number;
  fullPoint: number;
}