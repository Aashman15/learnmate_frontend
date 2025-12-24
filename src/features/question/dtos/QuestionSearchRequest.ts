import type { PaginationRequest } from "@/dtos/PaginationRequest";

export interface QuestionSearchRequest extends PaginationRequest {
  collectionId?: number;
}
