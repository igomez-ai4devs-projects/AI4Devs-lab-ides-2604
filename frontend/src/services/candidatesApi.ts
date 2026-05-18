import { CandidateInput, CandidateResponse, ApiErrorBody } from '../types/candidate';

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:3010';

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const buildFormData = (input: CandidateInput, cv: File): FormData => {
  const fd = new FormData();
  fd.append('firstName', input.firstName);
  fd.append('lastName', input.lastName);
  fd.append('email', input.email);
  fd.append('phone', input.phone);
  fd.append('address', input.address);
  fd.append('educations', JSON.stringify(input.educations));
  fd.append('workExperiences', JSON.stringify(input.workExperiences));
  fd.append('cv', cv);
  return fd;
};

export const createCandidate = async (
  input: CandidateInput,
  cv: File,
): Promise<CandidateResponse> => {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}/api/candidates`, {
      method: 'POST',
      body: buildFormData(input, cv),
    });
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR', 'No se pudo conectar con el servidor');
  }

  if (!res.ok) {
    let body: ApiErrorBody | undefined;
    try {
      body = (await res.json()) as ApiErrorBody;
    } catch {
      /* swallow: response had no JSON body */
    }
    throw new ApiError(
      res.status,
      body?.error?.code ?? 'UNKNOWN_ERROR',
      body?.error?.message ?? 'Error del servidor',
      body?.error?.details,
    );
  }

  return (await res.json()) as CandidateResponse;
};
