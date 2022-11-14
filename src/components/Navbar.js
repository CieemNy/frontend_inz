import React from "react";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const Navbar = () => {

    const guest = () => {

    }

    const auth = () => {

    }
    
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
                        <Typography>
                            <Link 
                                to='/' 
                                style={{ 
                                    textDecoration: 'none', 
                                    color: 'white' 
                                }}>
                                Logowanie
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, padding: 2 }}>
                        <Typography>
                            <Link 
                                to='/register'
                                style={{ 
                                    textDecoration: 'none', 
                                    color: 'white' 
                                }}
                            >
                                Rejestracja
                            </Link>
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;