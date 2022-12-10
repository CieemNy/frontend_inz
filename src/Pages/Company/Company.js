import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Button, Container, Typography } from '@mui/material';


const Company = ({isAuthenticated, isVerified, isCompany}) => {
    const [companies, setCompanies] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    const getCompanies = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/company`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setCompanies(res);
    }
    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getCompanies();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    if(isCompany===true) {
        return <Navigate to='/'/>
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
                {companies.map(companies => (
                    <Card 
                        key={companies.id} 
                        sx={{
                            padding: 2, 
                            margin: 2,
                            }}
                    >
                        <CardContent>
                            <Typography variant="h4">{companies.name}</Typography>
                            <Typography>Przedstawiciel Firmy: {companies.companyMan}</Typography>
                            <Typography>{companies.description}</Typography>
                        </CardContent>
                        <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                }}
                            >
                                <Link
                                    to={`/company/${companies.id}`}
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
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isVerified: state.auth.user.is_verified,
    isCompany: state.auth.user.is_company
});

export default connect(mapStateToProps, {})(Company);