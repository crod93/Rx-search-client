import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// functions to support RxNorm API
const ROOT_URL = 'https://rxnav.nlm.nih.gov';

// action thunks to be used in components
export const fetchDrugSearchResults = createAsyncThunk(
   'drugs/fetchDrugSearchResults',
   async (searchTerm, { dispatch }) => {
      try {
         const response = await fetch(
            `${ROOT_URL}/REST/drugs.json?name=${searchTerm}`
         );

         const data = await response.json();

         const {
            drugGroup: { conceptGroup },
         } = data;

         if (!conceptGroup) {
            dispatch(setSearchBarDisplayMode('spelling'));
         }

         return data;
      } catch (error) {
         console.error('There was an error fetching terms', error);
      }
   }
);

export const fetchSpellingSuggestions = createAsyncThunk(
   'drugs/fetchSpellingSuggestions',
   async (searchTerm, { dispatch }) => {
      try {
         const response = await fetch(
            `${ROOT_URL}/REST/spellingsuggestions.json?name=${searchTerm}`
         );

         const data = await response.json();

         const { suggestionGroup } = data;

         const {
            suggestionList: { suggestion },
         } = suggestionGroup;

         if (!suggestion) {
            dispatch(setSearchBarDisplayMode('not-found'));
         }

         return data;
      } catch (error) {
         console.error('There was an error fetching drug results', error);
      }
   }
);

export const fetchNDCs = createAsyncThunk('drugs/fetchNDCs', async (rxcui) => {
   try {
      const response = await fetch(`${ROOT_URL}/REST/rxcui/${rxcui}/ndcs.json`);

      const data = await response.json();

      return data;
   } catch (error) {
      console.error('There was an error fetching ndc results', error);
   }
});

const initialState = {
   searchResults: [],
   selectedDrug: {},
   spellingSuggestions: [],
   drugNDCs: {},
   drugDataNDCStatus: '',
   searchBarDisplayMode: 'search', // search | not-found | spelling
};

export const drugsSlice = createSlice({
   name: 'drugs',
   initialState,
   reducers: {
      setSelectedDrug: (state, action) => {
         state.selectedDrug = action.payload;
      },
      setSearchBarDisplayMode: (state, action) => {
         state.searchBarDisplayMode = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchDrugSearchResults.fulfilled, (state, action) => {
         const {
            drugGroup: { conceptGroup },
         } = action.payload;

         if (conceptGroup) {
            const results = [];
            //combine arrays that contain conceptProperties
            conceptGroup.forEach((group) => {
               if (group.hasOwnProperty('conceptProperties')) {
                  results.push(...group.conceptProperties);
               }
            });
            state.searchResults = results;
         }
      });

      builder.addCase(fetchSpellingSuggestions.fulfilled, (state, action) => {
         const { suggestionGroup } = action.payload;

         const {
            suggestionList: { suggestion },
         } = suggestionGroup;

         if (Array.isArray(suggestion)) {
            state.spellingSuggestions = suggestion;
         }
      });

      builder.addCase(fetchNDCs.fulfilled, (state, action) => {
         const rxcui = action.meta.arg;
         const {
            ndcGroup: {
               ndcList: { ndc },
            },
         } = action.payload;

         if (!state.drugNDCs[rxcui] && Array.isArray(ndc)) {
            state.drugNDCs[rxcui] = [...ndc];
         }
         state.drugDataNDCStatus = 'idle';
      });

      builder.addCase(fetchNDCs.pending, (state) => {
         state.drugDataNDCStatus = 'loading';
      });
   },
});

export const { setSelectedDrug, setSearchBarDisplayMode } = drugsSlice.actions;

export default drugsSlice;
