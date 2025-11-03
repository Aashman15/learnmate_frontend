import type { ProblemDetails } from "@/dtos/ProblemDetails";
import { isAxiosError } from "axios";

export function isProblemDetails(error: unknown): error is ProblemDetails {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    "title" in error &&
    "detail" in error
  );
}

export function getErrorMessage(error: unknown): string {
  const genericErrorMessage = "Something went wrong. Please try again later.";

  if (isAxiosError(error)) {
    const responseData = error.response?.data;
    if (isProblemDetails(responseData)) {
      return responseData.detail;
    } else {
      return genericErrorMessage;
    }
  } else {
    return genericErrorMessage;
  }
}
