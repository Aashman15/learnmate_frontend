interface PracticeItemAnswer {
  id: number;
  answer?: string;
  audioUrl?: string;
}

export interface PracticeSubmitRequest {
  answers: PracticeItemAnswer[];
}
