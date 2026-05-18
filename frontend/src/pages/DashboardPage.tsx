import { Button } from '../components/ui/Button';
import styles from './DashboardPage.module.css';

interface Props {
  onAddCandidate: () => void;
}

export const DashboardPage = ({ onAddCandidate }: Props) => (
  <main className={styles.main}>
    <h1>Dashboard del reclutador</h1>
    <p>Bienvenido. Desde aquí puedes gestionar candidatos.</p>
    <Button onClick={onAddCandidate}>Añadir candidato</Button>
  </main>
);
