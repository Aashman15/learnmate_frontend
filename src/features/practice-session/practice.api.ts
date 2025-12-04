import { api } from "@/lib/axios";
import type { PracticeStartRequest } from "./dtos/PracticeStartRequest";
import type { PracticeStartResponse } from "./dtos/PracticeStartResponse";
import type { PracticeItemBaseDto } from "./dtos/PracticeItemBaseDto";
import type { PracticeSubmitRequest } from "./dtos/PracticeSubmitRequest";
import type { PracticeSubmitResponse } from "./dtos/PracticeSubmitResponse";

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
