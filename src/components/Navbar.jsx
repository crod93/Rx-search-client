import { useLocation, Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MedicationSharpIcon from '@mui/icons-material/MedicationSharp';

const Navbar = () => {
   const { pathname } = useLocation();
   // meant to be scaleable in the possibility of more pages
   const pageName = (() => {
      if (pathname === '/') {
         return 'Search';
      }
      if (pathname.includes('drugs')) {
         return 'Details';
      }
      return '';
   })();

   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <MedicationSharpIcon />

               <Typography
                  variant="h6"
                  noWrap
                  component={RouterLink}
                  to="/"
                  sx={{
                     marginRight: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                     textTransform: 'capitalize',
                  }}
               >
                  Rx Search
               </Typography>

               <Box
                  sx={{
                     flexGrow: 1,
                     justifyContent: 'center',
                     display: 'flex',
                  }}
               >
                  <Typography variant="h6">Drugs {pageName}</Typography>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default Navbar;
