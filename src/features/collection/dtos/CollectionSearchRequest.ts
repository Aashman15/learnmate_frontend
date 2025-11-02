import type { PaginationRequest } from "@/dtos/PaginationRequest";

export interface CollectionSearchRequest extends PaginationRequest {
  name?: string;
}
