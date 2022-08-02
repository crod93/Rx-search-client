import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NotFound = () => {
   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
         }}
      >
         <Typography variant="h4">Not Found</Typography>
      </Box>
   );
};

export default NotFound;
