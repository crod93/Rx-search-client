import { memo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const DrugCard = (props) => {
   const { title, drugData = [] } = props;

   if (drugData.length === 0) return null;

   return (
      <Card sx={{ maxWidth: '500px', flexGrow: 1 }}>
         <CardContent>
            <Typography
               variant="h4"
               gutterBottom
               sx={{ textTransform: 'capitalize' }}
            >
               {title}
            </Typography>
            <Divider />
            <Box sx={{ maxHeight: '500px', overflowY: 'scroll' }}>
               {drugData.map((data) => {
                  const { title, value } = data;
                  return (
                     <Box key={value} sx={{ textTransform: 'capitalize' }}>
                        {title && (
                           <Typography
                              component="span"
                              variant="subtitle1"
                              sx={{ fontWeight: 'bold', marginRight: 1 }}
                           >
                              {title}:
                           </Typography>
                        )}
                        {value && (
                           <Typography component="span" variant="body1">
                              {value}
                           </Typography>
                        )}
                     </Box>
                  );
               })}
            </Box>
         </CardContent>
      </Card>
   );
};

export default memo(DrugCard);
