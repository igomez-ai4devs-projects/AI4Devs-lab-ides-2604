import styles from './FormField.module.css';

interface Props {
  id: string;
  label: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'date';
  required?: boolean;
  error?: string;
  touched?: boolean;
  autoComplete?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const FormField = ({
  id,
  label,
  value,
  type = 'text',
  required,
  error,
  touched,
  autoComplete,
  maxLength,
  onChange,
  onBlur,
}: Props) => {
  const showError = Boolean(touched && error);
  const errorId = `${id}-error`;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span aria-hidden="true" className={styles.required}>
            {' '}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        aria-required={required ? true : undefined}
        aria-invalid={showError ? true : undefined}
        aria-describedby={showError ? errorId : undefined}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`${styles.input} ${showError ? styles.inputError : ''}`.trim()}
      />
      {showError && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
};
