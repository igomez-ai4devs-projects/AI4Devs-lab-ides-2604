import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export const Button = ({ variant = 'primary', className, children, ...rest }: Props) => (
  <button
    {...rest}
    className={`${styles.button} ${styles[variant]} ${className ?? ''}`.trim()}
  >
    {children}
  </button>
);
