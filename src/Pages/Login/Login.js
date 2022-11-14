import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
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

const Login = ({ login }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log(email, password)
        login(email, password);
    };

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
                        <Item>Nie masz konta? <Link to='/register'> Zarejestruj się!</Link></Item>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}

export default connect(null, { login }) (Login);