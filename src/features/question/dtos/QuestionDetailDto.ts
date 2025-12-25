import type { CollectionDto } from "@/features/collection/dtos/CollectionDto";

export interface QuestionDetailDto {
  id: number;
  question: string;
  answer?: string;
  collection: CollectionDto;
}
