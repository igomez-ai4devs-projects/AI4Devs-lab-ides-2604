import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App routing', () => {
  it('renders the dashboard initially', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Dashboard del reclutador/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Añadir candidato/i })).toBeInTheDocument();
  });

  it('navigates to the add-candidate page when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Añadir candidato/i }));
    expect(screen.getByRole('heading', { name: /Añadir candidato/i })).toBeInTheDocument();
  });
});
