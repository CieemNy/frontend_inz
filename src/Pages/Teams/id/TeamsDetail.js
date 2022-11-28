import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { connect } from 'react-redux';


const CompanyDetail = ({isAuthenticated}) => {
    const {teamId} = useParams()
    const [team, setTeam] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    const getTeam = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams/${teamId}`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setTeam(res);
    }

    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getTeam();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    return (
        <Container  
            sx={{
                justifyContent: 'center',
                marginTop: 15
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
                    <CardContent 
                        sx={{
                            padding: 2,
                            justifyContent: 'center',
                            textAlign: 'center',

                        }}
                    >
                        
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(CompanyDetail);