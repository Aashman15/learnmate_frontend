import type { PracticeInputType } from "../practice-types";

export interface PracticeDto {
  id: number;
  startTime: string;
  inputType: PracticeInputType;
}
