import React, { Fragment } from "react";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from "../actions/auth";

const Navbar = ({ logout, isAuthenticated }) => {

    const guest = () => {
        return (
            <Fragment>
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
            </Fragment>
        );
    };

    const auth = () => {
        return (
            <Fragment>
                <Box sx={{ display: { xs: 'none', sm: 'block' }, padding: 2 }}>
                    <Typography>
                        <a 
                            href='/company' 
                            style={{ 
                                textDecoration: 'none', 
                                color: 'white' 
                            }}
                        >
                            Firmy
                        </a>
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography>
                        <a 
                            href='/' 
                            style={{ 
                                textDecoration: 'none', 
                                color: 'white' 
                            }}
                            onClick={logout}
                        >
                            Wyloguj
                        </a>
                    </Typography>
                </Box>
            </Fragment>
        );
    };

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
                    {isAuthenticated ? auth() : guest()}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout } ) (Navbar);