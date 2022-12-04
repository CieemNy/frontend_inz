import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { connect } from 'react-redux';


const CompanyDetail = ({isAuthenticated}) => {
    const {companiesId} = useParams()
    const [company, setCompany] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    const getCompany = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/company/${companiesId}`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setCompany(res);
    }

    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getCompany();
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
                        <Typography>Nazwa firmy</Typography>
                        <Typography 
                            variant='h5'
                        >
                            {company.name}
                        </Typography>
                        <Typography mt={2}>Opis firmy</Typography>
                        <Typography
                            variant='h6' 
                        >
                            {company.description}
                        </Typography>
                        <Typography mt={2}>Przedstawiciel Firmy</Typography>
                        <Typography
                            variant='h6'
                        >
                            {company.companyMan}
                        </Typography>
                        <Typography mt={2}>Mail Kontaktowy</Typography>
                        <Typography
                            variant='h6'
                        >
                            {company.contact_email}
                        </Typography>
                        <Typography mt={2}>Numer Telefonu</Typography>
                        <Typography
                            variant='h6'
                        >
                            {company.contact_number}
                        </Typography>
                        <Typography mt={2}>Limit miejsc</Typography>
                        <Typography
                            variant='h6'
                        >
                            {company.places} 
                        </Typography>
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