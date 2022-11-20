import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Box, Stack, Paper, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Swal from 'sweetalert2';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
  }));

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        re_password: ''
    });
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { email, name, surname, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (!regex.test(email)){
            alert("Wprowadziłeś niepoprawny adres email!");
            return false
        }
        if (password.length<8){
            alert("Hasło musi mieć conajmniej 8 znaków!")
            return false
        }
        if (password!==re_password){
            setAlert('Passwords do not match', 'error');
            return false
        }
        if (password === re_password){
            register(email, name, surname, password, re_password);
            setAccountCreated(true);
        }
        setTimeout(() => {
            alert("Udana Rejestracja! Możesz się zalogować!")
        }, 2000)
    };

    if (isAuthenticated) {
        return <Navigate to='/home'/>
    }

    if(accountCreated) {
        return <Navigate to='/'/>
    }

    return (
        <Container sx={{
            justifyContent: 'center',
            marginTop: 15
        }}>
            <Box>
                <Box>
                    <Stack spacing={2}>
                        <Item>
                            <Typography>REJESTRACJA</Typography>
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
                                id="email"
                                type="email"
                                label="Email"
                                variant="outlined"
                                margin="dense"
                                value={email}
                                onChange={event => onChange(event)}
                                name="email"
                                required
                            />
                        </Stack>
                        <Stack spacing={2}>
                            <TextField 
                                id="imie"
                                type="text"
                                label="Imie"
                                variant="outlined"
                                margin="dense"
                                value={name}
                                onChange={event => onChange(event)}
                                name="name"
                                required
                            />
                        </Stack>
                        <Stack spacing={2}>
                            <TextField 
                                id="nazwisko"
                                type="text"
                                label="Nazwisko"
                                variant="outlined"
                                margin="dense"
                                value={surname}
                                onChange={event => onChange(event)}
                                name="surname"
                                required
                            />
                        </Stack>
                        <Stack spacing={2}>
                            <TextField
                                id="haslo" 
                                type="password"
                                label="Hasło"
                                name="password"
                                value={password}
                                onChange={event => onChange(event)}
                                variant="outlined"
                                margin="dense"
                                required
                            />
                        </Stack>
                        <Stack spacing={2}>
                            <TextField
                                id="re_haslo" 
                                type="password"
                                label="Potwierdź hasło"
                                name="re_password"
                                value={re_password}
                                onChange={event => onChange(event)}
                                variant="outlined"
                                margin="normal"
                                required
                            />
                        </Stack>
                        <Stack spacing={4}>
                            <Button variant="contained" type="submit">Zarejestruj</Button>
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
                                    Masz konto?
                                </Typography>
                                <Button variant="contained">
                                    <Link 
                                        to='/'
                                        style={{ 
                                            textDecoration: 'none', 
                                            color: 'white' 
                                        }}
                                    >
                                        Zaloguj się!
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

export default connect(mapStateToProps, { setAlert, register }) (Register);