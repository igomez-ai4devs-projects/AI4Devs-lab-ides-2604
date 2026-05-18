import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CandidateForm } from '../components/CandidateForm/CandidateForm';
import { useCandidateForm, validateForm } from '../hooks/useCandidateForm';

const Wrapper = ({ onSubmit }: { onSubmit?: jest.Mock }) => {
  const form = useCandidateForm();
  return <CandidateForm form={form} submitting={false} onSubmit={onSubmit ?? jest.fn()} />;
};

describe('CandidateForm: education list', () => {
  it('adds and removes education rows; disables remove when only one remains', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    expect(screen.getAllByLabelText(/Institución/i)).toHaveLength(1);

    const removeBtn = screen.getByRole('button', { name: /Eliminar formación 1/i });
    expect(removeBtn).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /\+ Añadir formación/i }));
    expect(screen.getAllByLabelText(/Institución/i)).toHaveLength(2);

    expect(screen.getByRole('button', { name: /Eliminar formación 1/i })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: /Eliminar formación 2/i }));
    expect(screen.getAllByLabelText(/Institución/i)).toHaveLength(1);
    expect(screen.getByRole('button', { name: /Eliminar formación 1/i })).toBeDisabled();
  });
});

describe('CandidateForm: education date validation', () => {
  it('reports endDate before startDate via validateForm', () => {
    const errors = validateForm({
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.co',
      phone: '+34600000000',
      address: 'x',
      educations: [
        {
          institution: 'X',
          degree: 'Y',
          startDate: '2020-01-01',
          endDate: '2019-01-01',
        },
      ],
      workExperiences: [],
      cv: new File(['x'], 'cv.pdf', { type: 'application/pdf' }),
    });
    expect(errors['educations.0.endDate']).toBeDefined();
  });
});
