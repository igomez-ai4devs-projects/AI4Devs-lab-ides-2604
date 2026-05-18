import { createCandidate, ApiError, API_BASE_URL } from '../services/candidatesApi';
import { CandidateInput } from '../types/candidate';

const validInput: CandidateInput = {
  firstName: 'Ana',
  lastName: 'García',
  email: 'ana@example.com',
  phone: '+34 600 000 000',
  address: 'Calle Falsa 123',
  educations: [
    {
      institution: 'UPM',
      degree: 'Ing',
      startDate: '2015-09-01',
      endDate: '2019-06-30',
    },
  ],
  workExperiences: [],
};

const makePdfFile = () =>
  new File(['%PDF-1.4'], 'cv.pdf', { type: 'application/pdf' });

describe('candidatesApi.createCandidate', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    (global as unknown as { fetch: jest.Mock }).fetch = fetchMock;
  });

  it('sends FormData with JSON-encoded educations/workExperiences and the CV', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, ...validInput, cvOriginalName: 'cv.pdf' }),
    });

    const cv = makePdfFile();
    await createCandidate(validInput, cv);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${API_BASE_URL}/api/candidates`);
    expect(init.method).toBe('POST');
    const fd = init.body as FormData;
    expect(fd).toBeInstanceOf(FormData);
    expect(fd.get('firstName')).toBe('Ana');
    expect(fd.get('email')).toBe('ana@example.com');
    expect(fd.get('educations')).toBe(JSON.stringify(validInput.educations));
    expect(fd.get('workExperiences')).toBe(JSON.stringify(validInput.workExperiences));
    expect(fd.get('cv')).toBe(cv);
  });

  it('maps API error response to ApiError with code, status and details', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'Ya existe un candidato con este email',
        },
      }),
    });

    await expect(createCandidate(validInput, makePdfFile())).rejects.toMatchObject({
      name: 'ApiError',
      status: 409,
      code: 'EMAIL_ALREADY_EXISTS',
      message: 'Ya existe un candidato con este email',
    });
  });

  it('throws ApiError NETWORK_ERROR when fetch rejects', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    const err = await createCandidate(validInput, makePdfFile()).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toMatchObject({ code: 'NETWORK_ERROR', status: 0 });
  });
});
