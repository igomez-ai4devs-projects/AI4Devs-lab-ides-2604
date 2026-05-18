import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddCandidatePage } from '../pages/AddCandidatePage';

const VALID_PHONE = '+34 600 000 000';

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/^Nombre/), 'Ana');
  await user.type(screen.getByLabelText(/^Apellido/), 'García');
  await user.type(screen.getByLabelText(/^Email/), 'ana@example.com');
  await user.type(screen.getByLabelText(/^Teléfono/), VALID_PHONE);
  await user.type(screen.getByLabelText(/^Dirección/), 'Calle Falsa 123');

  await user.type(screen.getByLabelText(/Institución/), 'UPM');
  await user.type(screen.getByLabelText(/Titulación/), 'Ing. Informática');

  const eduInicio = within(screen.getByText('Formación académica').parentElement as HTMLElement)
    .getAllByLabelText(/Inicio/)[0] as HTMLInputElement;
  await user.type(eduInicio, '2015-09-01');
};

const makePdf = () => new File(['%PDF-1.4'], 'cv.pdf', { type: 'application/pdf' });

const makeFileWithSize = (name: string, type: string, size: number): File =>
  new File([new ArrayBuffer(size)], name, { type });

describe('AddCandidatePage', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    (global as unknown as { fetch: jest.Mock }).fetch = fetchMock;
  });

  it('renders all required form fields', () => {
    render(<AddCandidatePage onBack={jest.fn()} />);
    expect(screen.getByRole('heading', { name: /Añadir candidato/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nombre/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Apellido/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Teléfono/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Dirección/)).toBeInTheDocument();
    expect(screen.getByText(/Formación académica/)).toBeInTheDocument();
    expect(screen.getByText(/Experiencia laboral/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^CV/)).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty form and does not call fetch', async () => {
    const user = userEvent.setup();
    render(<AddCandidatePage onBack={jest.fn()} />);
    await user.click(screen.getByRole('button', { name: /Añadir candidato/i }));
    expect(await screen.findByText(/Introduce el nombre/)).toBeInTheDocument();
    expect(screen.getByText(/Introduce el apellido/)).toBeInTheDocument();
    expect(screen.getByText(/Introduce el email/)).toBeInTheDocument();
    expect(screen.getByText(/Adjunta el CV/)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows invalid email error and clears it after correction', async () => {
    const user = userEvent.setup();
    render(<AddCandidatePage onBack={jest.fn()} />);
    const emailInput = screen.getByLabelText(/^Email/);
    await user.type(emailInput, 'not-an-email');
    await user.tab();
    expect(await screen.findByText(/Introduce un email válido/)).toBeInTheDocument();
    await user.clear(emailInput);
    await user.type(emailInput, 'valid@example.com');
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText(/Introduce un email válido/)).not.toBeInTheDocument();
    });
  });

  it('rejects .txt CV upload on the client and does not call fetch', async () => {
    const user = userEvent.setup();
    render(<AddCandidatePage onBack={jest.fn()} />);
    const cvInput = screen.getByLabelText(/^CV/) as HTMLInputElement;
    fireEvent.change(cvInput, {
      target: { files: [new File(['x'], 'cv.txt', { type: 'text/plain' })] },
    });
    await user.click(screen.getByRole('button', { name: /Añadir candidato/i }));
    expect(await screen.findByText(/Formato no permitido/)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects CV larger than 5MB on the client', async () => {
    const user = userEvent.setup();
    render(<AddCandidatePage onBack={jest.fn()} />);
    const cvInput = screen.getByLabelText(/^CV/) as HTMLInputElement;
    const big = makeFileWithSize('big.pdf', 'application/pdf', 6 * 1024 * 1024);
    fireEvent.change(cvInput, { target: { files: [big] } });
    await user.click(screen.getByRole('button', { name: /Añadir candidato/i }));
    expect(await screen.findByText(/El archivo supera 5MB/)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits the form and shows success message on happy path', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, firstName: 'Ana', email: 'ana@example.com' }),
    });

    const user = userEvent.setup();
    render(<AddCandidatePage onBack={jest.fn()} />);
    await fillRequiredFields(user);
    await user.upload(screen.getByLabelText(/^CV/) as HTMLInputElement, makePdf());
    await user.click(screen.getByRole('button', { name: /Añadir candidato/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/añadido correctamente/i)).toBeInTheDocument();

    const [, init] = fetchMock.mock.calls[0];
    expect(init.body).toBeInstanceOf(FormData);
    const fd = init.body as FormData;
    expect(fd.get('firstName')).toBe('Ana');
    expect(fd.get('email')).toBe('ana@example.com');
    expect(fd.get('cv')).toBeInstanceOf(File);
  });

  it('shows duplicate-email message when backend returns 409', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({
        error: { code: 'EMAIL_ALREADY_EXISTS', message: 'dup' },
      }),
    });

    const user = userEvent.setup();
    render(<AddCandidatePage onBack={jest.fn()} />);
    await fillRequiredFields(user);
    await user.upload(screen.getByLabelText(/^CV/) as HTMLInputElement, makePdf());
    await user.click(screen.getByRole('button', { name: /Añadir candidato/i }));

    expect(
      await screen.findByText(/Ya existe un candidato con este email/i),
    ).toBeInTheDocument();
  });

  it('shows a generic message on network/server failure', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    const user = userEvent.setup();
    render(<AddCandidatePage onBack={jest.fn()} />);
    await fillRequiredFields(user);
    await user.upload(screen.getByLabelText(/^CV/) as HTMLInputElement, makePdf());
    await user.click(screen.getByRole('button', { name: /Añadir candidato/i }));

    expect(
      await screen.findByText(/No se pudo conectar con el servidor/i),
    ).toBeInTheDocument();
  });

  it('disables submit button while the request is in flight', async () => {
    let resolveFetch: (v: unknown) => void = () => undefined;
    fetchMock.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const user = userEvent.setup();
    render(<AddCandidatePage onBack={jest.fn()} />);
    await fillRequiredFields(user);
    await user.upload(screen.getByLabelText(/^CV/) as HTMLInputElement, makePdf());
    await user.click(screen.getByRole('button', { name: /Añadir candidato/i }));

    expect(await screen.findByRole('button', { name: /Enviando/i })).toBeDisabled();

    await act(async () => {
      resolveFetch({ ok: true, json: async () => ({ id: 1 }) });
    });
  });
});
