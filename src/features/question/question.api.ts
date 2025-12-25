import { api } from "@/lib/axios";
import type { QuestionFormValues } from "./schema/question-form-schema";
import type { QuestionDto } from "./dtos/QuestionDto";
import type { MessageDto } from "@/dtos/MessageDto";
import type { QuestionDetailDto } from "./dtos/QuestionDetailDto";
import type { QuestionSearchRequest } from "./dtos/QuestionSearchRequest";
import type { PaginatedResponse } from "@/dtos/PaginatedResponse";

export async function createQuestion(
  data: QuestionFormValues
): Promise<QuestionDto> {
  const response = await api.post<QuestionDto>(`/questions`, data);

  return response.data;
}

export async function updateQuestion(
  questionId: number,
  data: QuestionFormValues
): Promise<QuestionDto> {
  const response = await api.patch<QuestionDto>(
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

export const getQuestions = async (request: QuestionSearchRequest) => {
  const response = await api.get<PaginatedResponse<QuestionDto>>(`/questions`, {
    params: request,
  });

  return response.data;
};
