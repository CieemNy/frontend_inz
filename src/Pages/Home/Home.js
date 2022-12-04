import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Box, Card, Typography, Button, CardContent, CardActions} from '@mui/material';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Home = ({isAuthenticated}) => {
    const [userData, setUserData] = useState([]);
    const [userCompany, setUserCompany] = useState([]);
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
    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getUserCompany();
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
            </Box>
        </Container>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);