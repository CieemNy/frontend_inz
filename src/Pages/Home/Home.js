import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Box, Card, Typography, Button, CardContent, CardActions} from '@mui/material';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Home = ({isAuthenticated}) => {
    const [userData, setUserData] = useState([]);
    const [userCompany, setUserCompany] = useState([]);
    const [userTeam, setUserTeam] = useState([]);
    const [userTeamChoices, setUserTeamChoices] = useState([]);
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

    const getUserTeamChoices = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/user/team/choices`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setUserTeamChoices(res);
    }

    useEffect(() => {
        if(!didFetch){
            setDidFetch(true);
            getUserCompany();
            getUserTeam();
            getUserTeamChoices();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    const createCompany = () => {
        return (
            <Card 
                sx={{
                    display: 'flex', 
                    padding: 2, 
                    margin: 2,
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6">Jeste?? Przedstawicielem Firmy? Kliknij przycisk obok, ??eby doda?? wizyt??wk?? swojej firmy</Typography>
                <Button 
                    sx={{
                        marginLeft: 5,
                        backgroundColor: 'green',
                        ':hover': {
                            backgroundColor: 'green',
                        }
                    }}
                    variant="contained"
                    href='/company/add'
                >
                    Dodaj
                </Button>
            </Card>
        );
    };

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
                            <Typography mt={2}>Szczeg????y twojej firmy</Typography>
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
                                        Szczeg????y
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
                    <Typography>Tw??j Zesp????</Typography>
                    {userTeam.map(userTeam => (
                        <>
                            <Typography>{userTeam.name}</Typography>
                            {userData.is_leader === true 
                                ?
                                <>
                                    <Typography>Kod dost??pu do twojego zespo??u:</Typography>
                                    <Typography>{userTeam.access_code}</Typography>
                                </>
                                : 
                            null}
                            <Typography mt={2}>Szczeg????y twojego zespo??u</Typography>
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
                                        Szczeg????y
                                    </Button>
                                    
                                </Link>
                            </CardActions>
                            {userTeam.occupied_places < userTeam.places ? 
                                <Typography mt={2}>Wybory zespo??u mog?? zosta?? okre??lone gdy zesp???? jest skompletowany</Typography>
                                :
                                null
                            }
                            {userData.is_leader===true && userData.is_madeChoices===false && (userTeam.places===userTeam.occupied_places) ?
                            <>
                                <Typography mt={2}>Okre??l wybory</Typography>
                                <CardActions
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Link
                                        to={`/team/${userTeam.id}/choices/add`}
                                        state={{userTeam: userTeam.user}}
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
                            <>
                                {userTeamChoices.map(userTeamChoices => (
                                    <>
                                        <Typography mt={2}>Wybory zespo??u dokonane przez Lidera</Typography>
                                        <Typography>1. {userTeamChoices.first}</Typography>
                                        <Typography>2. {userTeamChoices.second}</Typography>
                                        <Typography>3. {userTeamChoices.third}</Typography>
                                        <Typography>4. {userTeamChoices.fourth}</Typography>
                                        <Typography mt={2}>Wyb??r ostateczny dokonany przez Administratora</Typography>
                                        <Typography variant="h5">{userTeamChoices.final}</Typography>
                                    </>
                                ))}
                            </>
                            }
                        </>
                    ))}
                </CardContent>
            </Card>
        );
    };

    const adminWelcome = () => {
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
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button 
                            variant="contained"
                            sx={{
                                backgroundColor: 'green',
                                ':hover': {
                                    backgroundColor: 'green',
                                }
                            }}
                            href='final/choices'
                        >
                            Rozpatrz wybory dru??yn
                        </Button>
                    </CardActions>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button 
                            variant="contained"
                            href='final/choices/considered'
                        >
                            Rozpatrzone wybory dru??yn
                        </Button>
                    </CardActions>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button 
                            variant="contained"
                            sx={{
                                backgroundColor: 'green',
                                ':hover': {
                                    backgroundColor: 'green',
                                }
                            }}
                            href='final/choices/list'
                        >
                            Finalna lista przypisanych dru??yn do firm
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
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
                {userData.is_company===true && userData.is_verified===true && userData.is_companyOwner===false ? createCompany() : null}
                {userData.is_company===true && userData.is_verified===true && userData.is_companyOwner===true ? companyWelcome() : null}
                {userData.is_leader===true || userData.is_member===true ? teamWelcome() : null}
                {userData.is_leader===false && userData.is_member===false && userData.is_company===false && userData.is_superuser===false ?
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
                {userData.is_superuser===true ? adminWelcome() : null}
            </Box>
        </Container>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);