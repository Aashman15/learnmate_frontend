import { api } from "@/lib/axios";
import type { QuestionFormValues } from "./schema/question-form-schema";
import type { QuestionBaseDto } from "./dtos/QuestionBaseDto";

export async function createQuestion(
  data: QuestionFormValues
): Promise<QuestionBaseDto> {
  const response = await api.post<QuestionBaseDto>(`/questions`, {
    ...data,
    type: data.type[0],
  });

  return response.data;
}
