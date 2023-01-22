import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Divider, Container, Typography, Button, Stack, TextField, MenuItem, Grid } from '@mui/material';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';


const SelectFinalChoice = ({isAuthenticated, isAdmin}) => {
    const {choiceId} = useParams()
    const [choice, setChoice] = useState([]);
    const [finalChoiceCreated, setfinalChoiceCreated] = useState(false);
    const [didFetch, setDidFetch] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [availableCompanies, setAvailableCompanies] = useState([]);
    const [formData, setFormData] = useState({
        final_choice: '',
    })

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8000/accounts/teams/choices/${choiceId}/finalchoice`, formData, {
              headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
            })
          } catch (e) {
            Swal.fire({
                icon: 'error',
                text: 'Wystąpił błąd! Brak dostępnych miejsc w wybranej firmie',
            })
          return false;
          }
          Swal.fire({
            icon: 'success',
            text: 'Wybór został zatwierdzony i zapisany!',
            }).then(okay => {
            if(okay){
                setfinalChoiceCreated(true);
            }
        })
    };

    const getCompanies = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/company`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setCompanies(res);
    }

    const getAvailableCompanies = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/company/places`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setAvailableCompanies(res);
    }


    const getChoice = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams/choices/${choiceId}`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setChoice(res);
    }
    
    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getChoice();
            getCompanies();
            getAvailableCompanies();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }
    if(isAdmin===false) {
        return <Navigate to='/home'/>
    }
    if(choice.is_considered===true){
        return <Navigate to='/final/choices'/>
    }
    if(finalChoiceCreated===true){
        return <Navigate to='/final/choices'/>
    }

    return (
        <Container
            sx={{
                justifyContent: 'center',
                marginTop: 5
            }}
        >
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card>
                    <CardContent>
                    <Typography variant="h5">Lista firm będących w systemie</Typography>
                        <Grid container>
                            <Grid item xs={6} sx={{textAlign: 'center'}}>
                                <Typography mt={1}>Nazwa Firmy</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{textAlign: 'center'}}>
                                <Typography mt={1}>Dostępne miejsca</Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{marginTop: 1, marginBottom: 1}}/>
                        {companies.map(companies=>(
                            <Grid container>
                                <Grid item xs={6} md={6} sx={{textAlign: 'center'}}>
                                    <Typography>{companies.name}</Typography>
                                </Grid>
                                <Grid item xs={6} md={6} sx={{textAlign: 'center'}}>
                                    <Typography>{companies.occupied_places}/{companies.places}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            </Box>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card 
                    key={choice.id} 
                    sx={{
                        padding: 2, 
                        margin: 2,
                        }}
                >
                <CardContent>
                    <Typography variant="h5">Wybory Zespołu: {choice.teamName}</Typography>
                    <Typography mt={1}>1. {choice.first}</Typography>
                    <Typography>2. {choice.second}</Typography>
                    <Typography>3. {choice.third}</Typography>
                    <Typography>4. {choice.fourth}</Typography>
                </CardContent>
                <Divider sx={{marginTop: 2}}/>
                <form onSubmit={e => onSubmit(e)}>
                    <Stack sx={{marginTop: 2}} spacing={2}>
                        <TextField 
                            id="final_choice"
                            label="Ostateczny wybór"
                            name="final_choice"
                            value={formData.final_choice}
                            onChange={event => onChange(event)}
                            variant="outlined"
                            margin="dense"
                            required
                            select
                        >
                            {availableCompanies.map(availableCompanies => (
                                <MenuItem key={availableCompanies.id} value={availableCompanies.id}>{availableCompanies.name}</MenuItem>
                            ))}
                        </TextField>
                      </Stack>
                    <Stack spacing={4}>
                        <Button sx={{marginTop: 2}} variant="contained" type="submit">Zatwierdź ostateczny wybór</Button>
                    </Stack>
                </form>
            </Card>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.user.is_superuser
});

export default connect(mapStateToProps, {})(SelectFinalChoice);