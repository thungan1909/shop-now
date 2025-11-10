// src/types/api.ts
export interface ApiError {
  message: string;
  code?: number;
  details?: unknown;
}
