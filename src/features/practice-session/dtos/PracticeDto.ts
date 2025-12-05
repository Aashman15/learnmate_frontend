import type { CollectionDto } from "@/features/collection/dtos/CollectionDto";
import type { PracticeBaseDto } from "./PracticeBaseDto";
import type { PracticeItemDto } from "./PracticeItemDto";

export interface PracticeDto extends PracticeBaseDto {
  answers: PracticeItemDto[];
  collection: CollectionDto;
}
