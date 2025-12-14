import { api } from "@/lib/axios";
import type { PracticeItemUpdateRequest } from "./dtos/PracticeItemUpdateRequest";
import type { PracticeItemDto } from "./dtos/PracticeItemDto";

export const updatePracticeItem = async (
  practiceItemId: number,
  request: PracticeItemUpdateRequest
) => {
  console.log({ request });

  const response = await api.patch<PracticeItemDto>(
    `/practice-items/${practiceItemId}`,
    request
  );
  return response.data;
};
