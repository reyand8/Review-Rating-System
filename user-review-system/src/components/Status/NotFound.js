import {Box, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import ErrorIcon from '@mui/icons-material/Error';

import theme from '../../assets/theme';

const PaperError = styled(Paper)(({ theme }) => ({
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'center',
    margin:'auto',
}));

const NotFound = () => {
    return (
        <Box sx={{ flexGrow: 1, marginTop: 2}}>
            <PaperError sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ErrorIcon sx={{fontSize: 60, mt: 7, fill: theme.palette.error.main}}  />
                <Typography sx={{fontWeight: 'bold', my: 4}}>Not Found</Typography>
            </PaperError>
        </Box>
    );
};

export default NotFound;