import type { PaginationRequest } from "@/dtos/PaginationRequest";

export interface PracticeSearchRequest extends PaginationRequest {
  collectionId?: number;
}
