import { ChangeEvent } from 'react';
import styles from './CvUpload.module.css';

interface Props {
  file: File | null;
  error?: string;
  touched?: boolean;
  onChange: (file: File | null) => void;
}

export const CvUpload = ({ file, error, touched, onChange }: Props) => {
  const id = 'cv';
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const showError = Boolean(touched && error);
  return (
    <div className={styles.cv}>
      <label htmlFor={id} className={styles.label}>
        CV <span aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        aria-required
        aria-invalid={showError ? true : undefined}
        aria-describedby={showError ? `${errorId} ${helpId}` : helpId}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)
        }
        className={showError ? styles.inputError : undefined}
      />
      <span id={helpId} className={styles.help}>
        Formatos aceptados: PDF, DOCX. Tamaño máximo 5 MB.
      </span>
      {file && (
        <span className={styles.fileInfo}>
          {file.name} ({Math.round(file.size / 1024)} KB)
        </span>
      )}
      {showError && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
};
