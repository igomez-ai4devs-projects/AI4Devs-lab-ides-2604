import { WorkExperienceInput } from '../../types/candidate';
import { FormErrors } from '../../hooks/useCandidateForm';
import { Button } from '../ui/Button';
import styles from './ListItem.module.css';

interface Props {
  items: WorkExperienceInput[];
  errors: FormErrors;
  onChange: (index: number, patch: Partial<WorkExperienceInput>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const WorkExperienceList = ({ items, errors, onChange, onAdd, onRemove }: Props) => (
  <fieldset className={styles.fieldset}>
    <legend>Experiencia laboral</legend>
    {items.map((w, i) => {
      const idPrefix = `we-${i}`;
      const errCompany = errors[`workExperiences.${i}.company`];
      const errPosition = errors[`workExperiences.${i}.position`];
      const errStart = errors[`workExperiences.${i}.startDate`];
      const errEnd = errors[`workExperiences.${i}.endDate`];
      return (
        <div key={i} className={styles.item}>
          <label className={styles.itemField} htmlFor={`${idPrefix}-company`}>
            <span>Empresa *</span>
            <input
              id={`${idPrefix}-company`}
              value={w.company}
              aria-required
              aria-invalid={errCompany ? true : undefined}
              onChange={(e) => onChange(i, { company: e.target.value })}
            />
            {errCompany && <span className={styles.error}>{errCompany}</span>}
          </label>

          <label className={styles.itemField} htmlFor={`${idPrefix}-position`}>
            <span>Puesto *</span>
            <input
              id={`${idPrefix}-position`}
              value={w.position}
              aria-required
              aria-invalid={errPosition ? true : undefined}
              onChange={(e) => onChange(i, { position: e.target.value })}
            />
            {errPosition && <span className={styles.error}>{errPosition}</span>}
          </label>

          <label className={styles.itemField} htmlFor={`${idPrefix}-start`}>
            <span>Inicio *</span>
            <input
              id={`${idPrefix}-start`}
              type="date"
              value={w.startDate}
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
              value={w.endDate ?? ''}
              aria-invalid={errEnd ? true : undefined}
              onChange={(e) => onChange(i, { endDate: e.target.value })}
            />
            {errEnd && <span className={styles.error}>{errEnd}</span>}
          </label>

          <label className={styles.itemField} htmlFor={`${idPrefix}-description`}>
            <span>Descripción</span>
            <input
              id={`${idPrefix}-description`}
              value={w.description ?? ''}
              onChange={(e) => onChange(i, { description: e.target.value })}
            />
          </label>

          <div className={styles.itemActions}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onRemove(i)}
              aria-label={`Eliminar experiencia ${i + 1}`}
            >
              Eliminar
            </Button>
          </div>
        </div>
      );
    })}
    <Button type="button" variant="secondary" onClick={onAdd}>
      + Añadir experiencia
    </Button>
  </fieldset>
);
