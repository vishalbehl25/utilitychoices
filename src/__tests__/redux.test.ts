import uiReducer, {
  toggleMobileMenu,
  setMobileMenuOpen,
} from '@/redux/features/ui/uiSlice';
import postcodeReducer, {
  setPostcode,
} from '@/redux/features/postcode/postcodeSlice';

describe('uiSlice', () => {
  it('toggles mobile menu', () => {
    const state = uiReducer(undefined, toggleMobileMenu());
    expect(state.mobileMenuOpen).toBe(true);
    const state2 = uiReducer(state, toggleMobileMenu());
    expect(state2.mobileMenuOpen).toBe(false);
  });

  it('sets mobile menu open state', () => {
    const state = uiReducer(undefined, setMobileMenuOpen(true));
    expect(state.mobileMenuOpen).toBe(true);
  });
});

describe('postcodeSlice', () => {
  it('sets valid postcode', () => {
    const state = postcodeReducer(undefined, setPostcode('2000'));
    expect(state.postcode).toBe('2000');
    expect(state.isValid).toBe(true);
    expect(state.error).toBeNull();
  });

  it('sets invalid postcode with error', () => {
    const state = postcodeReducer(undefined, setPostcode('20'));
    expect(state.isValid).toBe(false);
    expect(state.error).toBeTruthy();
  });

  it('strips non-numeric characters', () => {
    const state = postcodeReducer(undefined, setPostcode('20ab'));
    expect(state.postcode).toBe('20');
  });
});
