import type { MessageDto } from "@/dtos/MessageDto";
import type { PaginatedResponse } from "@/dtos/PaginatedResponse";
import { api } from "@/lib/axios";
import type { CollectionDto } from "./dtos/CollectionDto";
import type { CollectionSearchRequest } from "./dtos/CollectionSearchRequest";
import type { CollectionFormValues } from "./schema/collection-form-schema";
import type { QuestionBaseDto } from "../question/dtos/QuestionBaseDto";

export async function createCollection(
  formValues: CollectionFormValues
): Promise<CollectionDto> {
  const response = await api.post<CollectionDto>("/collections", formValues);
  return response.data;
}

export async function updateCollection(
  collectionId: number,
  formValues: CollectionFormValues
): Promise<CollectionDto> {
  const response = await api.patch<CollectionDto>(
    `/collections/${collectionId}`,
    formValues
  );
  return response.data;
}

export async function deleteCollection(
  collectionId: number
): Promise<MessageDto> {
  const response = await api.delete<MessageDto>(`/collections/${collectionId}`);
  return response.data;
}

export async function getCollections(
  request: CollectionSearchRequest
): Promise<PaginatedResponse<CollectionDto>> {
  const response = await api.get<PaginatedResponse<CollectionDto>>(
    `/collections`,
    {
      params: request,
    }
  );
  return response.data;
}

export async function getCollectionById(id: number): Promise<CollectionDto> {
  const response = await api.get<CollectionDto>(`/collections/${id}`);
  return response.data;
}

export async function getQuestionsByCollectionId(
  collectionId: number
): Promise<QuestionBaseDto[]> {
  const response = await api.get<QuestionBaseDto[]>(
    `/collections/${collectionId}/questions`
  );
  return response.data;
}
