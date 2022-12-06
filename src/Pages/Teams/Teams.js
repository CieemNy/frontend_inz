import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Button, Container, Typography } from '@mui/material';

const Teams = ({isAuthenticated, isLeader, isMember, isCompany}) => {
    const [teams, setTeams] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    const getTeams = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setTeams(res);
    }
    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getTeams();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }
    if (isCompany===true) {
        return <Navigate to='/'/>
    }
    const memberOrLeader = () => {
        return (
            <Card 
                sx={{
                    display: 'flex', 
                    padding: 2, 
                    margin: 2,
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6">Chcesz założyć swój zespół? Kliknij przycisk obok</Typography>
                <Button 
                    sx={{
                        marginLeft: 5,
                        backgroundColor: 'green',
                        ':hover': {
                            backgroundColor: 'green',
                        }
                    }}
                    variant="contained"
                    href='/teams/add'
                >
                    Dodaj
                </Button>
            </Card>
        );
    };
    return (
        <Container sx={{
            justifyContent: 'center',
            marginTop: 15
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {isLeader===false && isMember===false && isCompany===false ? memberOrLeader() : null}
            </Box>
            <Box>
                {teams.map(teams => (
                    <Card 
                        key={teams.id} 
                        sx={{
                            padding: 2, 
                            margin: 2,
                            }}
                    >
                        <CardContent>
                            <Typography variant="h4">{teams.name}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography>Lider: {teams.leader}</Typography>
                            <Typography>Zajęte miejsca: {teams.occupied_places}</Typography>
                            <Typography>Miejsca w drużynie: {teams.places}</Typography>
                            <Typography>Data założenia: {teams.creation_date}</Typography>
                        </CardContent>
                        <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                }}
                            >
                                <Link
                                    to={`/teams/${teams.id}`}
                                    style={{ 
                                        textDecoration: 'none', 
                                        color: 'white' 
                                    }}
                                >
                                    <Button variant="contained" >
                                        Szczegóły
                                    </Button>
                                </Link>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLeader: state.auth.user.is_leader,
    isMember: state.auth.user.is_member,
    isCompany: state.auth.user.is_company
});

export default connect(mapStateToProps, {})(Teams);