import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DrugCard from '../components/DrugCard';
import {
   getSelectedDrug,
   getDrugNDCs,
   getDrugNDCStatus,
} from '../store/slices/selectors';
import { fetchNDCs } from '../store/slices/drugsSlice';

const Drugs = () => {
   const dispatch = useDispatch();

   const { name: selectedDrugName } = useSelector(getSelectedDrug);
   const selectedDrugData = useSelector((state) => {
      const { name, rxcui, synonym } = getSelectedDrug(state);

      const drugData = {
         id: rxcui,
         name,
         synonym,
      };

      const formattedDrugData = Object.entries(drugData).map((keyAndValue) => {
         const [key, value] = keyAndValue;

         return {
            title: key,
            value,
         };
      });

      return formattedDrugData;
   });
   const selectedDrugRxcui = useSelector((state) => {
      const { rxcui } = getSelectedDrug(state);

      return rxcui;
   });

   const drugNDCs = useSelector((state) => {
      const ndcs = getDrugNDCs(selectedDrugRxcui, state);

      if (Array.isArray(ndcs)) {
         const formattedNdcs = ndcs.map((ndc) => {
            return { value: ndc };
         });
         return formattedNdcs;
      }
      return [];
   });

   const isLoading = useSelector((state) => {
      const status = getDrugNDCStatus(state);

      return status === 'loading';
   });

   useEffect(() => {
      if (selectedDrugRxcui) {
         dispatch(fetchNDCs(selectedDrugRxcui));
      }
   }, [selectedDrugRxcui, dispatch]);

   return (
      <Box sx={{ marginTop: 5, marginBottom: 3 }}>
         <Box
            sx={{
               marginTop: 3,
               marginBottom: 3,
               display: 'flex',
               justifyContent: 'center',
            }}
         >
            <DrugCard title={selectedDrugName} drugData={selectedDrugData} />
         </Box>
         <Box
            sx={{
               marginTop: 10,
               marginBottom: 3,
               display: 'flex',
               justifyContent: 'center',
            }}
         >
            {!isLoading ? (
               <DrugCard title="Associated NDCs" drugData={drugNDCs} />
            ) : (
               <CircularProgress />
            )}
         </Box>
      </Box>
   );
};

export default Drugs;
