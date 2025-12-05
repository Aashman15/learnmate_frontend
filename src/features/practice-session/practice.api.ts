import { api } from "@/lib/axios";
import type { PracticeStartRequest } from "./dtos/PracticeStartRequest";
import type { PracticeStartResponse } from "./dtos/PracticeStartResponse";
import type { PracticeItemBaseDto } from "./dtos/PracticeItemBaseDto";
import type { PracticeSubmitRequest } from "./dtos/PracticeSubmitRequest";
import type { PracticeSubmitResponse } from "./dtos/PracticeSubmitResponse";
import type { PracticeBaseDto } from "./dtos/PracticeBaseDto";
import type { MessageDto } from "@/dtos/MessageDto";
import type { PracticeDto } from "./dtos/PracticeDto";

export async function startPractice(request: PracticeStartRequest) {
  const startPracticeResponse = await api.post<PracticeStartResponse>(
    `/practices`,
    request
  );

  const items = await getPracticeItems(startPracticeResponse.data.practiceId);

  return {
    practiceId: startPracticeResponse.data.practiceId,
    items,
  };
}

export async function getPracticeItems(
  practiceId: number
): Promise<PracticeItemBaseDto[]> {
  const response = await api.get<PracticeItemBaseDto[]>(
    `/practices/${practiceId}/items`
  );
  return response.data;
}

export async function submitPractice(
  practiceId: number,
  request: PracticeSubmitRequest
) {
  const response = await api.post<PracticeSubmitResponse>(
    `/practices/${practiceId}/submit`,
    request
  );
  return response.data;
}

export async function getPractices() {
  const response = await api.get<PracticeBaseDto[]>(`/practices`);
  return response.data;
}

export async function deletePracticeById(practiceId: number) {
  const response = await api.delete<MessageDto>(`/practices/${practiceId}`);
  return response.data;
}

export async function getPracticeById(practiceId: number) {
  const response = await api.get<PracticeDto>(`/practices/${practiceId}`);
  return response.data;
}
