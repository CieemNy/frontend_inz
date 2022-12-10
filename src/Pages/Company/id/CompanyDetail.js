import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Container, Typography } from '@mui/material';
import { connect } from 'react-redux';


const CompanyDetail = ({isAuthenticated}) => {
    const {companiesId} = useParams()
    const [company, setCompany] = useState([]);
    const [projects, setProjects] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    const getCompany = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/company/${companiesId}`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setCompany(res);
    }
    const getProjects = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/company/${companiesId}/projects/`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setProjects(res);
    }

    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getCompany();
            getProjects();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
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
            <Card 
                sx={{
                    display: 'flex', 
                    padding: 2, 
                    margin: 2,
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6">PROJEKTY OFEROWANE PRZEZ FIRMĘ DO ZREALIZOWANIA</Typography>
            </Card>
            <Box>
                {projects.map(projects => (
                    <Card 
                        key={projects.id} 
                        sx={{
                            padding: 2, 
                            margin: 2,
                            }}
                    >
                        <CardContent>
                            <Typography variant="h6">{projects.title}</Typography>
                            <Typography mt={2}>Opis Projektu:</Typography>
                            <Typography> {projects.description}</Typography>
                            <Typography mt={2}>Preferowana technologia Frontendowa: {projects.front}</Typography>
                            <Typography mt={1}>Preferowana technologia Backendowa: {projects.back}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(CompanyDetail);