import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Container, Typography } from '@mui/material';
import { connect } from 'react-redux';


const SelectFinalChoice = ({isAuthenticated, isAdmin}) => {
    const {choiceId} = useParams()
    const [choice, setChoice] = useState([]);
    const [didFetch, setDidFetch] = useState(false);

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
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }
    if(isAdmin===false) {
        return <Navigate to='/home'/>
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
                <Card
                    sx={{
                        minWidth: '500px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    ez
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