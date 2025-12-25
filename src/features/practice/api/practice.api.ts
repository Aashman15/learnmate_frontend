import type { MessageDto } from "@/dtos/MessageDto";
import type { PaginatedResponse } from "@/dtos/PaginatedResponse";
import { api } from "@/lib/axios";
import type { PracticeCreateRequest } from "../dtos/PracticeCreateRequest";
import type { PracticeDetailDto } from "../dtos/PracticeDetailDto";
import type { PracticeDto } from "../dtos/PracticeDto";
import type { PracticeSearchRequest } from "../dtos/PracticeSearchRequest";

export async function createPractice(request: PracticeCreateRequest) {
  const response = await api.post<PracticeDto>(`/practices`, request);
  return response.data;
}

export async function getPractices(searchRequest: PracticeSearchRequest) {
  const response = await api.get<PaginatedResponse<PracticeDto>>(`/practices`, {
    params: searchRequest,
  });
  return response.data;
}

export async function deletePracticeById(practiceId: number) {
  const response = await api.delete<MessageDto>(`/practices/${practiceId}`);
  return response.data;
}

export async function getPracticeById(practiceId: number) {
  const response = await api.get<PracticeDetailDto>(`/practices/${practiceId}`);
  return response.data;
}
