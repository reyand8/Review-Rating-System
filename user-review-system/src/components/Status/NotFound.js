import {Box, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import ErrorIcon from '@mui/icons-material/Error';


const PaperError = styled(Paper)(({ theme }) => ({
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin:'auto',
}));

const ErrorText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    margin: '12px 0',
    textAlign: 'center',
}));

const StyledErrorIcon = styled(ErrorIcon)(({ theme }) => ({
    fontSize: 60,
    marginTop: '18px',
    fill: theme.palette.error.main,
}));

const NotFound = () => {
    return (
        <Box sx={{ flexGrow: 1, marginTop: 2}}>
            <PaperError>
                <StyledErrorIcon />
                <ErrorText>Not Found</ErrorText>
            </PaperError>
        </Box>
    );
};

export default NotFound;