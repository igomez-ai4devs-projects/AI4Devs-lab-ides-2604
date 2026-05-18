import { FormEvent } from 'react';
import { CandidateInput } from '../../types/candidate';
import { useCandidateForm } from '../../hooks/useCandidateForm';
import { FormField } from './FormField';
import { EducationList } from './EducationList';
import { WorkExperienceList } from './WorkExperienceList';
import { CvUpload } from './CvUpload';
import { Button } from '../ui/Button';
import styles from './CandidateForm.module.css';

interface Props {
  form: ReturnType<typeof useCandidateForm>;
  submitting: boolean;
  onSubmit: (input: CandidateInput, cv: File) => void;
}

export const CandidateForm = ({ form, submitting, onSubmit }: Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.validate()) return;
    if (!form.values.cv) return;
    const { cv, ...rest } = form.values;
    onSubmit(rest, cv);
  };

  const blurHandler = (field: keyof typeof form.values) => () => {
    form.touch(field);
    form.validateField(field);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.form} aria-label="Formulario de candidato">
      <div className={styles.row}>
        <FormField
          id="firstName"
          label="Nombre"
          value={form.values.firstName}
          required
          error={form.errors.firstName}
          touched={form.touched.firstName}
          autoComplete="given-name"
          maxLength={80}
          onChange={(v) => form.setField('firstName', v)}
          onBlur={blurHandler('firstName')}
        />
        <FormField
          id="lastName"
          label="Apellido"
          value={form.values.lastName}
          required
          error={form.errors.lastName}
          touched={form.touched.lastName}
          autoComplete="family-name"
          maxLength={80}
          onChange={(v) => form.setField('lastName', v)}
          onBlur={blurHandler('lastName')}
        />
      </div>

      <div className={styles.row}>
        <FormField
          id="email"
          label="Email"
          type="email"
          value={form.values.email}
          required
          error={form.errors.email}
          touched={form.touched.email}
          autoComplete="email"
          maxLength={254}
          onChange={(v) => form.setField('email', v)}
          onBlur={blurHandler('email')}
        />
        <FormField
          id="phone"
          label="Teléfono"
          type="tel"
          value={form.values.phone}
          required
          error={form.errors.phone}
          touched={form.touched.phone}
          autoComplete="tel"
          maxLength={30}
          onChange={(v) => form.setField('phone', v)}
          onBlur={blurHandler('phone')}
        />
      </div>

      <FormField
        id="address"
        label="Dirección"
        value={form.values.address}
        required
        error={form.errors.address}
        touched={form.touched.address}
        autoComplete="street-address"
        maxLength={255}
        onChange={(v) => form.setField('address', v)}
        onBlur={blurHandler('address')}
      />

      <EducationList
        items={form.values.educations}
        errors={form.errors}
        onChange={form.setEducation}
        onAdd={form.addEducation}
        onRemove={form.removeEducation}
      />

      <WorkExperienceList
        items={form.values.workExperiences}
        errors={form.errors}
        onChange={form.setWorkExperience}
        onAdd={form.addWorkExperience}
        onRemove={form.removeWorkExperience}
      />

      <CvUpload
        file={form.values.cv}
        error={form.errors.cv}
        touched={form.touched.cv}
        onChange={(f) => {
          form.setField('cv', f);
          form.touch('cv');
          form.validateField('cv');
        }}
      />

      <div className={styles.actions}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Añadir candidato'}
        </Button>
      </div>
    </form>
  );
};
