import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { Container, Box, Stack, Paper, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "black",
  }));

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {email, password} = formData;
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});
    const onSubmit = event => {
        event.preventDeafult();
    }
    return (
        <Container fixed>
            <Box>
                <Stack spacing={2}>
                    <Item>Logowanie</Item>
                </Stack>
                <form onSubmit={event => onSubmit(event)}>
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
                                defaultValue={email}
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
                                defaultValue={password}
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
                <Stack spacing={2}>
                    <Item>Nie masz konta? <Link to='/register'> Zarejestruj się!</Link></Item>
                </Stack>
            </Box>
        </Container>
    );
}

export default Login;