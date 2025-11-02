import type { ProblemDetails } from "@/dtos/ProblemDetails";

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
  if (isProblemDetails(error)) {
    return error.detail;
  } else {
    return "Something went wrong. Please try again later.";
  }
}
