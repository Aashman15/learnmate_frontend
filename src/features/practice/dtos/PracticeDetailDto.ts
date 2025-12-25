import type { CollectionDto } from "@/features/collection/dtos/CollectionDto";
import type { PracticeInputType } from "../practice-types";
import type { PracticeAnswerDto } from "./PracticeAnswerDto";

export interface PracticeDetailDto {
  id: number;
  startTime: string;
  inputType: PracticeInputType;
  answers: PracticeAnswerDto[];
  collection: CollectionDto;
}
