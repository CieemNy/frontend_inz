import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Box, Card, CardContent, Button, Container, Typography, CardHeader } from '@mui/material';

const Company = () => {
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
                <Card 
                    sx={{
                        display: 'flex', 
                        padding: 2, 
                        margin: 2
                    }}
                >
                    <Typography variant="h6">Jesteś Przedstawicielem Firmy? Kliknij przycisk obok, żeby dodać wizytówkę swojej firmy</Typography>
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
            </Box>
            <Box>
                {companies.map(companies => (
                    <Card 
                        key={companies.id} 
                        sx={{
                            display: 'flex',
                            padding: 2, 
                            margin: 2,
                            alignItems: 'flex-end',
                            }}
                    >
                        <CardContent>
                            <Typography variant="h4">{companies.name}</Typography>
                            <Typography>{companies.description}</Typography>
                        </CardContent>
                        <CardContent 
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Button variant="contained">Szczegóły</Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    )
}

export default Company;