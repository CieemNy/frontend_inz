import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Container, Typography, Divider, Button, Stack, TextField } from '@mui/material';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const CompanyDetail = ({isAuthenticated, isLeader, isMember, isCompany}) => {
    const {teamId} = useParams()
    const [team, setTeam] = useState([]);
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        accessCode: ''
    })
    const [didFetch, setDidFetch] = useState(false);

    const onChange = e => setFormData({ formData, [e.target.name]: e.target.value });

    const getTeam = async () => {
        const {data: res} = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/teams/${teamId}`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setTeam(res);
    }
    const getMembers = async () => {
        const {data: res} = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/teams/${teamId}/members`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setMembers(res);
    }
    const joinTeam = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/teams/${teamId}/join`, formData, {
            headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`
          },
        })
        } catch (e) {
            Swal.fire({
                icon: 'error',
                text: 'Wystąpił błąd!',
            })
          return false;
        }
        Swal.fire({
            icon: 'success',
            text: 'Dołączyłeś do zespołu!',
        }).then(okay => {
            if(okay){
                window.location.reload();
            }
        })
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
                    <Stack sx={{marginTop: 2}} spacing={2}>
                          <TextField 
                              id="access_code"
                              type="text"
                              label="Kod dostępu"
                              variant="outlined"
                              margin="dense"
                              value={formData.accessCode}
                              onChange={event => onChange(event)}
                              name="access_code"
                              required
                          />
                      </Stack>
                    <Stack spacing={4}>
                        <Button sx={{marginTop: 2}} variant="contained" type="submit">Dołącz</Button>
                    </Stack>
                </form>
            </>
        );
    }

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    if (isCompany===true) {
        return <Navigate to='/'/>
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
                    <CardContent 
                        sx={{
                            padding: 2,
                            justifyContent: 'center',
                            textAlign: 'center',

                        }}
                    >
                        <Typography>Nazwa Zespołu</Typography>
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
                        <Typography mt={2} variant='h5'>Członkowie Zespołu</Typography>
                        {members.map(members => (
                            <Typography key={members.id} mt={2}>
                                {members.member}
                            </Typography>
                        ))}
                        {(isLeader===false && isMember===false && team.occupied_places<=team.places) ? showJoinButton() : null}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLeader: state.auth.user.is_leader,
    isMember: state.auth.user.is_member,
    isCompany: state.auth.user.is_company,
});

export default connect(mapStateToProps, {})(CompanyDetail);