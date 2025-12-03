import { api } from "@/lib/axios";
import type { PracticeStartRequest } from "./dtos/PracticeStartRequest";
import type { PracticeStartResponse } from "./dtos/PracticeStartResponse";
import type { PracticeItemBaseDto } from "./dtos/PracticeItemBaseDto";

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
