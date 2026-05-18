import { ReactNode } from 'react';
import styles from './Alert.module.css';

interface Props {
  variant: 'success' | 'error';
  children: ReactNode;
}

export const Alert = ({ variant, children }: Props) => (
  <div
    role={variant === 'success' ? 'status' : 'alert'}
    aria-live={variant === 'success' ? 'polite' : 'assertive'}
    className={`${styles.alert} ${styles[variant]}`}
  >
    {children}
  </div>
);
