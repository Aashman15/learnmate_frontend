import type { PracticeItemBaseDto } from "./PracticeItemBaseDto";

export interface PracticeItemWithAnswer extends PracticeItemBaseDto {
  answer?: string;
  audioUrl?: string;
}
