import { useCallback, useState } from 'react';
import { EducationInput, WorkExperienceInput } from '../types/candidate';

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  educations: EducationInput[];
  workExperiences: WorkExperienceInput[];
  cv: File | null;
}

export type FormErrors = Record<string, string>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{6,30}$/;
const ALLOWED_CV_EXTENSIONS = ['.pdf', '.docx'];
const MAX_CV_SIZE = 5 * 1024 * 1024;

const emptyEducation = (): EducationInput => ({
  institution: '',
  degree: '',
  fieldOfStudy: '',
  startDate: '',
  endDate: '',
});

const emptyWorkExperience = (): WorkExperienceInput => ({
  company: '',
  position: '',
  description: '',
  startDate: '',
  endDate: '',
});

const initialValues = (): FormValues => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  educations: [emptyEducation()],
  workExperiences: [],
  cv: null,
});

export const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.firstName.trim()) errors.firstName = 'Introduce el nombre';
  if (!values.lastName.trim()) errors.lastName = 'Introduce el apellido';

  if (!values.email.trim()) errors.email = 'Introduce el email';
  else if (!EMAIL_REGEX.test(values.email)) errors.email = 'Introduce un email válido';
  else if (values.email.length > 254) errors.email = 'Email demasiado largo';

  if (!values.phone.trim()) errors.phone = 'Introduce el teléfono';
  else if (!PHONE_REGEX.test(values.phone)) errors.phone = 'Teléfono no válido (6-30 dígitos)';

  if (!values.address.trim()) errors.address = 'Introduce la dirección';

  if (values.educations.length === 0) {
    errors.educations = 'Añade al menos una formación';
  } else {
    values.educations.forEach((e, i) => {
      if (!e.institution.trim()) errors[`educations.${i}.institution`] = 'Obligatorio';
      if (!e.degree.trim()) errors[`educations.${i}.degree`] = 'Obligatorio';
      if (!e.startDate) errors[`educations.${i}.startDate`] = 'Obligatoria';
      if (e.endDate && e.startDate && e.endDate < e.startDate) {
        errors[`educations.${i}.endDate`] = 'Anterior a la inicial';
      }
    });
  }

  values.workExperiences.forEach((w, i) => {
    if (!w.company.trim()) errors[`workExperiences.${i}.company`] = 'Obligatorio';
    if (!w.position.trim()) errors[`workExperiences.${i}.position`] = 'Obligatorio';
    if (!w.startDate) errors[`workExperiences.${i}.startDate`] = 'Obligatoria';
    if (w.endDate && w.startDate && w.endDate < w.startDate) {
      errors[`workExperiences.${i}.endDate`] = 'Anterior a la inicial';
    }
  });

  if (!values.cv) {
    errors.cv = 'Adjunta el CV (PDF o DOCX, máx. 5MB)';
  } else {
    const name = values.cv.name.toLowerCase();
    const hasValidExt = ALLOWED_CV_EXTENSIONS.some((ext) => name.endsWith(ext));
    if (!hasValidExt) {
      errors.cv = 'Formato no permitido (sólo PDF o DOCX)';
    } else if (values.cv.size > MAX_CV_SIZE) {
      errors.cv = 'El archivo supera 5MB';
    }
  }

  return errors;
};

export const useCandidateForm = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setField = useCallback(
    <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const setEducation = useCallback(
    (index: number, patch: Partial<EducationInput>) => {
      setValues((prev) => {
        const next = [...prev.educations];
        next[index] = { ...next[index], ...patch };
        return { ...prev, educations: next };
      });
    },
    [],
  );

  const addEducation = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      educations: [...prev.educations, emptyEducation()],
    }));
  }, []);

  const removeEducation = useCallback((index: number) => {
    setValues((prev) => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== index),
    }));
  }, []);

  const setWorkExperience = useCallback(
    (index: number, patch: Partial<WorkExperienceInput>) => {
      setValues((prev) => {
        const next = [...prev.workExperiences];
        next[index] = { ...next[index], ...patch };
        return { ...prev, workExperiences: next };
      });
    },
    [],
  );

  const addWorkExperience = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      workExperiences: [...prev.workExperiences, emptyWorkExperience()],
    }));
  }, []);

  const removeWorkExperience = useCallback((index: number) => {
    setValues((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((_, i) => i !== index),
    }));
  }, []);

  const touch = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateField = useCallback(
    (field: string) => {
      const newErrors = validateForm(values);
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        if (newErrors[field]) next[field] = newErrors[field];
        return next;
      });
    },
    [values],
  );

  const validate = useCallback((): boolean => {
    const newErrors = validateForm(values);
    setErrors(newErrors);
    const allTouched: Record<string, boolean> = {};
    Object.keys(newErrors).forEach((k) => {
      allTouched[k] = true;
    });
    setTouched((prev) => ({ ...prev, ...allTouched }));
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const setServerErrors = useCallback((map: FormErrors) => {
    setErrors((prev) => ({ ...prev, ...map }));
    const allTouched: Record<string, boolean> = {};
    Object.keys(map).forEach((k) => {
      allTouched[k] = true;
    });
    setTouched((prev) => ({ ...prev, ...allTouched }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues());
    setErrors({});
    setTouched({});
  }, []);

  return {
    values,
    errors,
    touched,
    setField,
    setEducation,
    addEducation,
    removeEducation,
    setWorkExperience,
    addWorkExperience,
    removeWorkExperience,
    touch,
    validateField,
    validate,
    setServerErrors,
    reset,
  };
};
