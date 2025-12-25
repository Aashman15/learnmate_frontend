import type { PracticeInputType } from "../practice-types";

export interface PracticeCreateRequest {
  collectionId: number;
  inputType: PracticeInputType;
}
