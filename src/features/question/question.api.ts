import { api } from "@/lib/axios";
import type { QuestionFormValues } from "./schema/question-form-schema";
import type { QuestionBaseDto } from "./dtos/QuestionBaseDto";
import type { MessageDto } from "@/dtos/MessageDto";
import type { QuestionDetailDto } from "./dtos/QuestionDetailDto";

export async function createQuestion(
  data: QuestionFormValues
): Promise<QuestionBaseDto> {
  const response = await api.post<QuestionBaseDto>(`/questions`, data);

  return response.data;
}

export async function updateQuestion(
  questionId: number,
  data: QuestionFormValues
): Promise<QuestionBaseDto> {
  const response = await api.patch<QuestionBaseDto>(
    `/questions/${questionId}`,
    data
  );

  return response.data;
}

export async function deleteQuestionById(
  questionId: number
): Promise<MessageDto> {
  const response = await api.delete<MessageDto>(`/questions/${questionId}`);

  return response.data;
}

export async function getQuestionById(
  questionId: number
): Promise<QuestionDetailDto> {
  const response = await api.get<QuestionDetailDto>(`/questions/${questionId}`);
  return response.data;
}
