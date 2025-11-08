import type { CollectionDto } from "@/features/collection/dtos/CollectionDto";
import type { QuestionBaseDto } from "./QuestionBaseDto";

export interface QuestionDetailDto extends QuestionBaseDto {
  collection: CollectionDto;
}
