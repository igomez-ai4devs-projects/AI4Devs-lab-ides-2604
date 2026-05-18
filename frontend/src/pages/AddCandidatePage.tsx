import { useState } from 'react';
import { useCandidateForm } from '../hooks/useCandidateForm';
import { CandidateForm } from '../components/CandidateForm/CandidateForm';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { createCandidate, ApiError } from '../services/candidatesApi';
import { CandidateInput, CandidateResponse } from '../types/candidate';
import styles from './AddCandidatePage.module.css';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; candidate: CandidateResponse }
  | { kind: 'error'; message: string };

interface Props {
  onBack: () => void;
}

const mapApiErrorToMessage = (err: ApiError): string => {
  switch (err.code) {
    case 'EMAIL_ALREADY_EXISTS':
      return 'Ya existe un candidato con este email';
    case 'INVALID_FILE_TYPE':
      return 'Formato de CV no permitido (sólo PDF o DOCX)';
    case 'FILE_TOO_LARGE':
      return 'El CV supera el tamaño permitido (5 MB)';
    case 'VALIDATION_ERROR':
      return 'Revisa los campos resaltados del formulario';
    case 'NETWORK_ERROR':
      return 'No se pudo conectar con el servidor. Inténtalo de nuevo.';
    default:
      return 'No se pudo añadir el candidato. Inténtalo de nuevo.';
  }
};

export const AddCandidatePage = ({ onBack }: Props) => {
  const form = useCandidateForm();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const handleSubmit = async (input: CandidateInput, cv: File) => {
    setStatus({ kind: 'submitting' });
    try {
      const candidate = await createCandidate(input, cv);
      setStatus({ kind: 'success', candidate });
      form.reset();
    } catch (err) {
      const apiErr = err as ApiError;
      if (apiErr.code === 'VALIDATION_ERROR' && Array.isArray(apiErr.details)) {
        const serverMap: Record<string, string> = {};
        (apiErr.details as Array<{ path?: string; message?: string }>).forEach((d) => {
          if (d.path && d.message) serverMap[d.path] = d.message;
        });
        form.setServerErrors(serverMap);
      }
      setStatus({ kind: 'error', message: mapApiErrorToMessage(apiErr) });
    }
  };

  const handleAddAnother = () => {
    setStatus({ kind: 'idle' });
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Añadir candidato</h1>
        <Button type="button" variant="secondary" onClick={onBack}>
          ← Volver al dashboard
        </Button>
      </div>

      {status.kind === 'success' && (
        <Alert variant="success">
          Candidato añadido correctamente.{' '}
          <button type="button" onClick={handleAddAnother} className={styles.linkButton}>
            Añadir otro
          </button>
        </Alert>
      )}
      {status.kind === 'error' && <Alert variant="error">{status.message}</Alert>}

      {status.kind !== 'success' && (
        <CandidateForm
          form={form}
          submitting={status.kind === 'submitting'}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
};
