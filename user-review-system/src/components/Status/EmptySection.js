import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';

const PaperWarning = styled(Paper)(({ theme }) => ({
    width: '800px',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        width: '600px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '400px',
    },
    [theme.breakpoints.down('xs')]: {
        width: '200px',
    },
}));

const HeaderText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.messageText,
    fontWeight: 'bold',
    textAlign: 'center',
}));

const MainText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.messageText,
    marginBottom: '26px',
    textAlign: 'center',
}));

const StyledWarningIcon = styled(WarningIcon)(({ theme }) => ({
    fontSize: 60,
    marginTop: '20px',
    fill: theme.palette.warning.messageWarning,
}));

const EmptySection = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <PaperWarning>
                <StyledWarningIcon />
                <HeaderText>
                    This section is empty
                </HeaderText>
                <MainText>
                    Select a user from the list
                </MainText>
            </PaperWarning>
        </Box>
    );
};

export default EmptySection;
