import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ComparisonFilters {
  company: string;
  interestRate: string;
  charges: string;
  loanFee: string;
  maxLoanAmount: string;
  downloadSpeed: string;
}

interface ComparisonState {
  creditCards: Pick<ComparisonFilters, 'company' | 'interestRate' | 'charges'>;
  homeLoan: Pick<ComparisonFilters, 'interestRate' | 'loanFee' | 'maxLoanAmount'>;
  nbn: Pick<ComparisonFilters, 'company' | 'downloadSpeed'>;
  personalLoan: Pick<ComparisonFilters, 'interestRate'>;
}

const initialState: ComparisonState = {
  creditCards: { company: '', interestRate: '', charges: '' },
  homeLoan: { interestRate: '', loanFee: '', maxLoanAmount: '' },
  nbn: { company: '', downloadSpeed: '' },
  personalLoan: { interestRate: '' },
};

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    setCreditCardFilter: (
      state,
      action: PayloadAction<{ key: keyof ComparisonState['creditCards']; value: string }>,
    ) => {
      state.creditCards[action.payload.key] = action.payload.value;
    },
    setHomeLoanFilter: (
      state,
      action: PayloadAction<{ key: keyof ComparisonState['homeLoan']; value: string }>,
    ) => {
      state.homeLoan[action.payload.key] = action.payload.value;
    },
    setNbnFilter: (
      state,
      action: PayloadAction<{ key: keyof ComparisonState['nbn']; value: string }>,
    ) => {
      state.nbn[action.payload.key] = action.payload.value;
    },
    setPersonalLoanFilter: (
      state,
      action: PayloadAction<{ key: keyof ComparisonState['personalLoan']; value: string }>,
    ) => {
      state.personalLoan[action.payload.key] = action.payload.value;
    },
    resetFilters: (state, action: PayloadAction<keyof ComparisonState>) => {
      const key = action.payload;
      if (key === 'creditCards') state.creditCards = { ...initialState.creditCards };
      else if (key === 'homeLoan') state.homeLoan = { ...initialState.homeLoan };
      else if (key === 'nbn') state.nbn = { ...initialState.nbn };
      else if (key === 'personalLoan') state.personalLoan = { ...initialState.personalLoan };
    },
  },
});

export const {
  setCreditCardFilter,
  setHomeLoanFilter,
  setNbnFilter,
  setPersonalLoanFilter,
  resetFilters,
} = comparisonSlice.actions;
export default comparisonSlice.reducer;

export const selectComparison = (state: { comparison: ComparisonState }) => state.comparison;
