import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {
   fetchDrugSearchResults,
   setSelectedDrug,
   setSearchBarDisplayMode,
   fetchSpellingSuggestions,
} from '../store/slices/drugsSlice';
import {
   getDrugSearchResults,
   getSpellingSuggestionsResults,
   getSearcBarhDisplayMode,
} from '../store/slices/selectors';
import { makeStringSEOFriendly } from '../utils';

const SearchBar = () => {
   const [showResultsDiv, setShowResultsDiv] = useState(false);
   const [searchInput, setSearchInput] = useState('');
   const dispatch = useDispatch();
   const searchResults = useSelector(getDrugSearchResults);
   const spellingResults = useSelector(getSpellingSuggestionsResults);
   const displayMode = useSelector(getSearcBarhDisplayMode);

   const navigate = useNavigate();

   const onSubmit = useCallback(() => {
      if (searchInput) {
         dispatch(fetchDrugSearchResults(searchInput));
         dispatch(setSearchBarDisplayMode('search'));
         setShowResultsDiv(true);
      }
   }, [searchInput, dispatch]);

   useEffect(() => {
      const keyDownHandler = (event) => {
         if (event.key === 'Enter') {
            onSubmit();
         }
      };

      document.addEventListener('keydown', keyDownHandler);

      return () => {
         document.removeEventListener('keydown', keyDownHandler);
      };
   }, [onSubmit]);

   useEffect(() => {
      if (displayMode === 'spelling') {
         dispatch(fetchSpellingSuggestions(searchInput));
      }
   }, [displayMode]);

   const onClickAway = () => {
      setShowResultsDiv(false);
   };

   const onDrugClick = (drug) => {
      dispatch(setSelectedDrug(drug));
      // make drug name url friendly
      const name = encodeURIComponent(makeStringSEOFriendly(drug.name));
      navigate(`/drugs/${name}`);
   };

   return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
         <Box
            sx={{
               width: '50%',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
         >
            <Typography
               sx={{ marginBottom: 2 }}
               align="center"
               variant="h4"
               component="h1"
            >
               Search for Drugs!
            </Typography>

            <ClickAwayListener onClickAway={onClickAway}>
               <Box sx={{ width: '85%' }}>
                  <TextField
                     label="Search Drugs"
                     id="search-drugs"
                     sx={{ width: '100%' }}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment>
                              <IconButton
                                 sx={{ p: '10px' }}
                                 aria-label="Search Drugs"
                                 onClick={onSubmit}
                              >
                                 <SearchIcon />
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                     onChange={(event) =>
                        setSearchInput(event.target.value.trim())
                     }
                     value={searchInput}
                  />
                  {showResultsDiv && (
                     <List
                        sx={{
                           boxShadow: 4,
                           padding: '.5rem ',
                           overflowY: 'auto',
                           maxHeight: '250px',
                        }}
                     >
                        {displayMode === 'not-found' && (
                           <Typography variant="body2">Not Found</Typography>
                        )}
                        {displayMode === 'search' &&
                           searchResults.map((result) => {
                              return (
                                 <ListItem disablePadding key={result.rxcui}>
                                    <ListItemButton
                                       component="a"
                                       onClick={() => onDrugClick(result)}
                                    >
                                       <ListItemText primary={result.name} />
                                    </ListItemButton>
                                 </ListItem>
                              );
                           })}
                        {displayMode === 'spelling' &&
                           spellingResults.map((result) => {
                              return (
                                 <ListItem disablePadding key={result}>
                                    <ListItemButton
                                       component="a"
                                       onClick={() => setSearchInput(result)}
                                    >
                                       <ListItemText primary={result} />
                                    </ListItemButton>
                                 </ListItem>
                              );
                           })}
                     </List>
                  )}
               </Box>
            </ClickAwayListener>
         </Box>
      </Box>
   );
};

export default SearchBar;
