import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Button, Container, Typography } from '@mui/material';


const Choices = ({isAuthenticated, isAdmin}) => {
    const [choices, setChoices] = useState([]);
    const [didFetch, setDidFetch] = useState(false);

    const getChoices = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams/choices`,{
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
                
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.user.is_superuser
});

export default connect(mapStateToProps, {})(Choices);