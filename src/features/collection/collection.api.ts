import type { MessageDto } from "@/dtos/MessageDto";
import type { PaginatedResponse } from "@/dtos/PaginatedResponse";
import { api } from "@/lib/axios";
import type { Question } from "@/models/question";
import type { CollectionBaseDto } from "./dtos/CollectionBaseDto";
import type { CollectionSearchRequest } from "./dtos/CollectionSearchRequest";
import type { CollectionFormValues } from "./schema/collection-form-schema";

export async function createCollection(
  formValues: CollectionFormValues
): Promise<CollectionBaseDto> {
  const response = await api.post<CollectionBaseDto>(
    "/collections",
    formValues
  );
  return response.data;
}

export async function updateCollection(
  collectionId: number,
  formValues: CollectionFormValues
): Promise<CollectionBaseDto> {
  const response = await api.patch<CollectionBaseDto>(
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
): Promise<PaginatedResponse<CollectionBaseDto>> {
  const response = await api.get<PaginatedResponse<CollectionBaseDto>>(
    `/collections`,
    {
      params: request,
    }
  );
  return response.data;
}

export async function getCollectionById(
  id: number
): Promise<CollectionBaseDto> {
  const response = await api.get<CollectionBaseDto>(`/collections/${id}`);
  return response.data;
}

export async function getQuestionsByCollectionId(
  collectionId: number
): Promise<Question[]> {
  const response = await api.get<Question[]>(
    `/collections/${collectionId}/questions`
  );
  return response.data;
}
