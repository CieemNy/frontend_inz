import React from "react";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        System Zapisów na Projekt Zespołowy
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Typography>lorem ipsum</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;