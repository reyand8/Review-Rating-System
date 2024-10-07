import {Box, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';

import theme from '../../assets/theme';

const PaperWarning = styled(Paper)(({ theme }) => ({
    width: '820px',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
}));

const HeaderText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.messageText,
    fontWeight: 'bold',
}));

const MainText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.messageText,
    marginBottom: '26px'
}));

const EmptySection = () => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <PaperWarning>
                <WarningIcon sx={{fontSize: 60, my: 7, fill: theme.palette.warning.messageWarning}}  />
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