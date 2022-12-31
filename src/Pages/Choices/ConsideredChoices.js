import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const ConsideredChoices = ({isAuthenticated, isAdmin}) => {
    const [choices, setChoices] = useState([]);
    const [didFetch, setDidFetch] = useState(false);

    const getChoices = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams/choices/considered`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setChoices(res);
    }

    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getChoices();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    if(isAdmin===false) {
        return <Navigate to='/home'/>
    }

    return (
        <Container sx={{
            justifyContent: 'center',
            marginTop: 5
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                
            </Box>
            <Box>
                {choices.map(choices => (
                    <Card 
                        key={choices.id} 
                        sx={{
                            padding: 2, 
                            margin: 2,
                            }}
                    >
                    <CardContent>
                        <Typography variant="h5">Wybory Team'u: {choices.teamName}</Typography>
                        <Typography mt={1}>1. {choices.first}</Typography>
                        <Typography>2. {choices.second}</Typography>
                        <Typography>3. {choices.third}</Typography>
                        <Typography>4. {choices.fourth}</Typography>
                        <Typography mt={2}>Finalny wybór: {choices.final}</Typography>
                        <Card sx={{padding: 1, marginTop: 1}}>
                        <Typography>Data dokonania wyborów: {choices.date}</Typography>
                        {choices.is_considered===true 
                            ?
                                <Typography mt={1}>Status wyborów: Rozpatrzone
                                    <CheckIcon
                                        sx={{
                                            paddingLeft: 1,
                                            verticalAlign: 'middle',
                                        }} 
                                        color='success'
                                    />
                                </Typography>
                            :
                            null
                        }
                        </Card>
                    </CardContent>
                </Card>
                ))}
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.user.is_superuser
});

export default connect(mapStateToProps, {})(ConsideredChoices);