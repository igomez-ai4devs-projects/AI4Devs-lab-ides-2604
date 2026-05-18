export interface EducationInput {
  institution: string;
  degree: string;
  fieldOfStudy?: string | null;
  startDate: string;
  endDate?: string | null;
}

export interface WorkExperienceInput {
  company: string;
  position: string;
  description?: string | null;
  startDate: string;
  endDate?: string | null;
}

export interface CandidateInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  educations: EducationInput[];
  workExperiences: WorkExperienceInput[];
}

export interface EducationRecord extends EducationInput {
  id: number;
  candidateId: number;
}

export interface WorkExperienceRecord extends WorkExperienceInput {
  id: number;
  candidateId: number;
}

export interface CandidateResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cvFileName: string;
  cvOriginalName: string;
  cvMimeType: string;
  cvSize: number;
  createdAt: string;
  updatedAt: string;
  educations: EducationRecord[];
  workExperiences: WorkExperienceRecord[];
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
