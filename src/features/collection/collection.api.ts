import type { CollectionBaseDto } from "./dtos/CollectionBaseDto";
import type { MessageDto } from "@/dtos/MessageDto";
import { api } from "@/lib/axios";
import type { CollectionFormValues } from "./schema/collection-form-schema";
import type { CollectionSearchRequest } from "./dtos/CollectionSearchRequest";
import type { PaginatedResponse } from "@/dtos/PaginatedResponse";
import type { QuestionBaseDto } from "../question/dtos/QuestionBaseDto";

export async function createCollection(
  formValues: CollectionFormValues
): Promise<CollectionBaseDto> {
  const response = await api.post<CollectionBaseDto>(
    "/collections",
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
): Promise<QuestionBaseDto[]> {
  const response = await api.get<QuestionBaseDto[]>(
    `/collections/${collectionId}/questions`
  );
  return response.data;
}
