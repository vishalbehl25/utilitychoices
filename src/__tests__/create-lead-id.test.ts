/** @jest-environment node */

async function loadCreateLeadId() {
  jest.resetModules();
  const mod = await import('@/lib/enquiry/build-enquiry-record');
  return mod.createLeadId;
}

describe('createLeadId', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('returns UCL{timestamp} format', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1_780_914_906_846);
    const createLeadId = await loadCreateLeadId();

    expect(createLeadId()).toBe('UCL1780914906846');
  });

  it('generates strictly increasing sequential IDs', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1_780_914_906_846);
    const createLeadId = await loadCreateLeadId();

    const first = createLeadId();
    const second = createLeadId();
    const third = createLeadId();

    expect(first).toBe('UCL1780914906846');
    expect(second).toBe('UCL1780914906847');
    expect(third).toBe('UCL1780914906848');
  });

  it('stays unique when Date.now returns the same millisecond', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1_780_914_906_846);
    const createLeadId = await loadCreateLeadId();

    const ids = new Set([createLeadId(), createLeadId(), createLeadId()]);

    expect(ids.size).toBe(3);
    expect([...ids]).toEqual([
      'UCL1780914906846',
      'UCL1780914906847',
      'UCL1780914906848',
    ]);
  });
});
