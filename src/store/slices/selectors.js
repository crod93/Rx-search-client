import { createSelector } from 'reselect';
import slice from './drugsSlice';

const getDrugSlice = (state) => state[slice.name];

export const getDrugSearchResults = createSelector(
   getDrugSlice,
   (state) => state.searchResults
);

export const getSpellingSuggestionsResults = createSelector(
   getDrugSlice,
   (state) => state.spellingSuggestions
);

export const getSelectedDrug = createSelector(
   getDrugSlice,
   (state) => state.selectedDrug
);

export const getDrugNDCStatus = createSelector(
   getDrugSlice,
   (state) => state.drugDataNDCStatus
);

export const getDrugNDCs = (rxcui, state) => {
   return state.drugs.drugNDCs[rxcui];
};

export const getSearcBarhDisplayMode = createSelector(
   getDrugSlice,
   (state) => state.searchBarDisplayMode
);
