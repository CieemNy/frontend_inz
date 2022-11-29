import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Container, Typography, Divider, Button } from '@mui/material';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const CompanyDetail = ({isAuthenticated}) => {
    const {teamId} = useParams()
    const [team, setTeam] = useState([]);
    const [members, setMembers] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    const [join, setJoin] = useState(false);

    const getTeam = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams/${teamId}`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setTeam(res);
    }
    const getMembers = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams/${teamId}/members`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setMembers(res);
    }
    const joinTeam = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`http://localhost:8000/accounts/teams/${teamId}/join`, {
            headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`
          },
        })
        } catch (e) {
          alert(e)
          return false;
        }
        Swal.fire({
            icon: 'success',
            text: 'Dołączyłeś do zespołu!',
        })
        setJoin(true);
    };

    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getTeam();
            getMembers();
        }
    }, [didFetch])

    const showJoinButton = () => {
        return (
            <>
                <Divider sx={{marginTop: 2}}/>
                <form onSubmit={e => joinTeam(e)}>
                    <Button sx={{marginTop: 2}} variant="contained" type="submit">Dołącz</Button>
                </form>
            </>
        );
    }

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
                        <Typography>Nazwa Team'u</Typography>
                        <Typography 
                            variant='h5'
                        >
                            {team.name}
                        </Typography>
                        <Typography mt={2}>Lider</Typography>
                        <Typography 
                            variant='h5'
                        >
                            {team.leader}
                        </Typography>
                        <Typography mt={2}>Zajęte miejsca</Typography>
                        <Typography 
                            variant='h5'
                        >
                            {team.occupied_places}
                        </Typography>
                        <Typography mt={2}>Limit miejsc</Typography>
                        <Typography
                            variant='h5'
                        >
                            {team.places} 
                        </Typography>
                        <Divider sx={{marginTop: 2}}/>
                        <Typography mt={2} variant='h5'>Członkowie</Typography>
                        {members.map(members => (
                            <Typography key={members.id} mt={2}>
                                {members.member}
                            </Typography>
                        ))}
                        {team.occupied_places !== team.places ? showJoinButton() : null}
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