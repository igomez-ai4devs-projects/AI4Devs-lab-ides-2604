import { EducationInput } from '../../types/candidate';
import { FormErrors } from '../../hooks/useCandidateForm';
import { Button } from '../ui/Button';
import styles from './ListItem.module.css';

interface Props {
  items: EducationInput[];
  errors: FormErrors;
  onChange: (index: number, patch: Partial<EducationInput>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const EducationList = ({ items, errors, onChange, onAdd, onRemove }: Props) => (
  <fieldset className={styles.fieldset}>
    <legend>Formación académica</legend>
    {errors.educations && (
      <p className={styles.fieldsetError} role="alert">
        {errors.educations}
      </p>
    )}
    {items.map((edu, i) => {
      const idPrefix = `edu-${i}`;
      const errInstitution = errors[`educations.${i}.institution`];
      const errDegree = errors[`educations.${i}.degree`];
      const errStart = errors[`educations.${i}.startDate`];
      const errEnd = errors[`educations.${i}.endDate`];
      return (
        <div key={i} className={styles.item}>
          <label className={styles.itemField} htmlFor={`${idPrefix}-institution`}>
            <span>Institución *</span>
            <input
              id={`${idPrefix}-institution`}
              value={edu.institution}
              aria-required
              aria-invalid={errInstitution ? true : undefined}
              onChange={(e) => onChange(i, { institution: e.target.value })}
            />
            {errInstitution && <span className={styles.error}>{errInstitution}</span>}
          </label>

          <label className={styles.itemField} htmlFor={`${idPrefix}-degree`}>
            <span>Titulación *</span>
            <input
              id={`${idPrefix}-degree`}
              value={edu.degree}
              aria-required
              aria-invalid={errDegree ? true : undefined}
              onChange={(e) => onChange(i, { degree: e.target.value })}
            />
            {errDegree && <span className={styles.error}>{errDegree}</span>}
          </label>

          <label className={styles.itemField} htmlFor={`${idPrefix}-field`}>
            <span>Especialidad</span>
            <input
              id={`${idPrefix}-field`}
              value={edu.fieldOfStudy ?? ''}
              onChange={(e) => onChange(i, { fieldOfStudy: e.target.value })}
            />
          </label>

          <label className={styles.itemField} htmlFor={`${idPrefix}-start`}>
            <span>Inicio *</span>
            <input
              id={`${idPrefix}-start`}
              type="date"
              value={edu.startDate}
              aria-required
              aria-invalid={errStart ? true : undefined}
              onChange={(e) => onChange(i, { startDate: e.target.value })}
            />
            {errStart && <span className={styles.error}>{errStart}</span>}
          </label>

          <label className={styles.itemField} htmlFor={`${idPrefix}-end`}>
            <span>Fin</span>
            <input
              id={`${idPrefix}-end`}
              type="date"
              value={edu.endDate ?? ''}
              aria-invalid={errEnd ? true : undefined}
              onChange={(e) => onChange(i, { endDate: e.target.value })}
            />
            {errEnd && <span className={styles.error}>{errEnd}</span>}
          </label>

          <div className={styles.itemActions}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onRemove(i)}
              disabled={items.length === 1}
              aria-label={`Eliminar formación ${i + 1}`}
            >
              Eliminar
            </Button>
          </div>
        </div>
      );
    })}
    <Button type="button" variant="secondary" onClick={onAdd}>
      + Añadir formación
    </Button>
  </fieldset>
);
