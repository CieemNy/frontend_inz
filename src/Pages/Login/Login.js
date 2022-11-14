import React, {useState} from "react";
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import { Container, Box, Stack, Paper, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { login } from "../../actions/auth";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
  }));

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Navigate to='/home'/>
    }

    return (
        <Container sx={{
            justifyContent: 'center',
            marginTop: 25
        }}>
            <Box>
                <Box>
                    <Stack spacing={2}>
                        <Item>
                            <Typography>LOGOWANIE</Typography>
                        </Item>
                    </Stack>
                </Box>
                <form onSubmit={e => onSubmit(e)}>
                    <Box sx={{
                        padding: 2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Stack spacing={2}>
                            <TextField 
                                id="outlined-basic"
                                type="email"
                                label="Email"
                                variant="outlined"
                                margin="dense"
                                value={formData.email}
                                onChange={event => onChange(event)}
                                name="email"
                                required
                            />
                        </Stack>
                        <Stack spacing={2}>
                            <TextField
                                id="outlined-basic" 
                                type="password"
                                label="Hasło"
                                name="password"
                                value={formData.password}
                                onChange={event => onChange(event)}
                                variant="outlined"
                                margin="normal"
                                required
                            />
                        </Stack>
                        <Stack spacing={4}>
                            <Button variant="contained" type="submit">Zaloguj</Button>
                        </Stack>    
                    </Box>
                </form>
                <Box 
                    sx={{
                        padding: 5,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Stack spacing={2}>
                        <Box>
                            <Item>
                                <Typography sx={{padding: 1}}>
                                    Nie masz konta?
                                </Typography>
                                <Button variant="contained">
                                    <Link 
                                        to='/register'
                                        style={{ 
                                            textDecoration: 'none', 
                                            color: 'white' 
                                        }}
                                    >
                                        Zarejestruj się!
                                    </Link>
                                </Button> 
                            </Item>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login }) (Login);