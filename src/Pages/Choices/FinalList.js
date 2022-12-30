import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Divider, Container, Typography, Grid } from '@mui/material';
import { connect } from 'react-redux';


const SelectFinalChoice = ({isAuthenticated, isAdmin}) => {
    const [didFetch, setDidFetch] = useState(false);
    const [list, setList] = useState([]);

    const getList = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams/choices/list`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setList(res);
    }
    
    useEffect(() => {
        if(!didFetch){
            setDidFetch(true);
            getList();
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
                <Card>
                    <CardContent>
                    <Typography variant="h5">Finalna lista przypisanych zespołów do firm</Typography>
                        <Grid container>
                            <Grid item xs={6} sx={{textAlign: 'center'}}>
                                <Typography mt={1}>Nazwa Firmy</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{textAlign: 'center'}}>
                                <Typography mt={1}>Nazwa Zespołu</Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{marginTop: 1, marginBottom: 1}}/>
                        {list.map(list=>(
                            <Grid container>
                                <Grid item xs={6} md={6} sx={{textAlign: 'center'}}>
                                    <Typography>{list.final}</Typography>
                                </Grid>
                                <Grid item xs={6} md={6} sx={{textAlign: 'center'}}>
                                    <Typography>{list.teamName}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </CardContent>
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