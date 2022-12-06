import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Box, Card, Typography, Button, CardContent, CardActions} from '@mui/material';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Home = ({isAuthenticated}) => {
    const [userData, setUserData] = useState([]);
    const [userCompany, setUserCompany] = useState([]);
    const [userTeam, setUserTeam] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    useEffect(()=>{
        const getUser = async () => {
            const {data: res} = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
            setUserData(res);
        }
        getUser();
    }, [])
    const getUserCompany = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/user/company`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setUserCompany(res);
    }
    const getUserTeam = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/user/team`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setUserTeam(res);
    }
    useEffect(() => {
        if(!didFetch){
            setDidFetch(true);
            getUserCompany();
            getUserTeam();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }
    const companyWelcome = () => {
        return (
            <Card 
                sx={{
                    display: 'flex', 
                    padding: 2, 
                    margin: 2,
                    justifyContent: 'center',
                    minWidth: 300,
                    minHeight: 300
                }}
            >
                <CardContent
                    sx={{
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h6" gutterBottom>Witaj {userData.name} {userData.surname}!</Typography>
                    <Typography>Twoja firma</Typography>
                    {userCompany.map(userCompany => (
                        <>
                            <Typography>{userCompany.name}</Typography>
                            <Typography mt={2}>Szczegóły twojej firmy</Typography>
                            <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Link
                                    to={`/company/${userCompany.id}`}
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
                            <Typography mt={2}>Dodawanie projektu</Typography>
                            <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Link
                                    to={`/company/${userCompany.id}/project/add`}
                                    state={{userCompany: userCompany.user}}
                                    style={{ 
                                        textDecoration: 'none', 
                                        color: 'white' 
                                    }}
                                >
                                    <Button
                                        sx={{
                                            backgroundColor: 'green',
                                            ':hover': {
                                                backgroundColor: 'green',
                                            }
                                        }}
                                        variant="contained"
                                    >
                                        Dodaj
                                    </Button>
                                </Link>
                            </CardActions>
                        </>
                    ))}
                </CardContent>
            </Card>
        );
    };
    const teamWelcome = () => {
        return (
            <Card 
                sx={{
                    display: 'flex', 
                    padding: 2, 
                    margin: 2,
                    justifyContent: 'center',
                    minWidth: 300,
                    minHeight: 300
                }}
            >
                <CardContent
                    sx={{
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h6" gutterBottom>Witaj {userData.name} {userData.surname}!</Typography>
                    <Typography>Twój Zespół</Typography>
                    {userTeam.map(userTeam => (
                        <>
                            <Typography>{userTeam.name}</Typography>
                            <Typography mt={2}>Szczegóły twojego zespołu</Typography>
                            <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Link
                                    to={`/teams/${userTeam.id}`}
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
                            {userData.is_leader===true ?
                            <>
                                <Typography mt={2}>Określ wybory</Typography>
                                <CardActions
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Link
                                        to={`/team/${userTeam.id}/choices/add`}
                                        style={{ 
                                            textDecoration: 'none', 
                                            color: 'white' 
                                        }}
                                    >
                                        <Button
                                            sx={{
                                                backgroundColor: 'green',
                                                ':hover': {
                                                    backgroundColor: 'green',
                                                }
                                            }}
                                            variant="contained"
                                        >
                                            Dodaj
                                        </Button>
                                    </Link>
                                </CardActions>
                            </>
                            :
                            null
                            }
                        </>
                    ))}
                </CardContent>
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
                {userData.is_company===true ? companyWelcome() : null}
                {userData.is_leader===true || userData.is_member===true ? teamWelcome() : null}
                {userData.is_leader===false && userData.is_member===false && userData.is_company===false ?
                    <CardContent
                    sx={{
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h6" gutterBottom>Witaj {userData.name} {userData.surname}!</Typography>
                </CardContent>
                :
                null
                }
            </Box>
        </Container>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);