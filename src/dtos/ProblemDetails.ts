import type { FieldError } from "./FieldError";

export interface ProblemDetails {
  type: string;
  title: string;
  detail: string;
  instance: string;
  status: number;
  fieldErrors?: FieldError[];
}
