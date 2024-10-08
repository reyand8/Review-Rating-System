import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {AppBar, Box, Button, Toolbar} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {styled} from '@mui/material/styles';

import homeImage from '../../assets/img/home_icon.png';

const StyledHomeImg = styled('img')({
    width: '100%',
    height: '60px',
    margin: '10px 0',
});

const StyledAccountIcon = styled(AccountCircleIcon)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    width: '38px',
    height: '38px',
}));

const Header = () => {
    return (
            <>
                <Box sx={{ flexGrow:1 }}>
                    <AppBar position="static">
                        <Toolbar sx={{display:'flex', justifyContent: 'space-between'}}>
                            <RouterLink component={RouterLink} to="/" sx={{ flexGrow: 1 }}>
                                <StyledHomeImg src={homeImage}/>
                            </RouterLink>
                            <Box>
                                <Button component={RouterLink}
                                        to="profile"
                                        size="large"
                                        startIcon={<StyledAccountIcon/>}
                                >
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            </>
        );
};

export default Header;