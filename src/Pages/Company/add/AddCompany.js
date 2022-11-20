import React, {useState} from "react";
import { Navigate} from 'react-router-dom';
import { Container, Box, Stack, Paper, TextField, Button, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from "axios";
import { connect } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
  }));

const AddCompany = ({isAuthenticated}) => {
    const [companytCreated, setCompanyCreated] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        contact_number: '',
        contact_email: '',
        main_front: '',
        main_back: '',
        available_places: '',
        places: '',
    })
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:8000/accounts/company/add', formData, {
            headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`
          }
          })
        } catch (e) {
          alert(e)
        }
        setCompanyCreated(true);
    };

    if(companytCreated) {
      return <Navigate to='/company'/>
    }

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    return (
        <Container sx={{
            justifyContent: 'center',
            marginTop: 15
        }}>
              <Box>
                  <Stack spacing={2}>
                      <Item>
                          <Typography>DODAJ FIRME</Typography>
                      </Item>
                  </Stack>
              </Box>
              <form onSubmit={e => onSubmit(e)}>
                  <Box sx={{
                      padding: 2,
                      alignItems: "center",
                      justifyContent: "center"
                  }}>
                      <Stack spacing={2}>
                          <TextField 
                              id="name"
                              type="text"
                              label="Nazwa Firmy"
                              variant="outlined"
                              margin="dense"
                              value={formData.name}
                              onChange={event => onChange(event)}
                              name="name"
                              required
                          />
                      </Stack>
                      <Stack spacing={2}>
                          <TextField
                              id="description" 
                              type="text"
                              label="Opis"
                              name="description"
                              value={formData.description}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              multiline
                              rows={2}
                              maxRows={4}
                              required
                          />
                      </Stack>
                      <Stack spacing={2}>
                          <TextField
                              id="contact_number" 
                              type="text"
                              label="Numer Kontaktowy"
                              name="contact_number"
                              value={formData.contact_number}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                          />
                      </Stack>
                      <Stack spacing={2}>
                          <TextField
                              id="contact_email" 
                              type="text"
                              label="E-mail Kontaktowy"
                              name="contact_email"
                              value={formData.contact_email}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                          />
                      </Stack>
                      <Stack spacing={2}>
                          <TextField
                              id="main_front" 
                              type="text"
                              label="Główna technologia Frontendowa"
                              name="main_front"
                              value={formData.main_front}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                          />
                      </Stack>
                      <Stack spacing={2}>
                          <TextField
                              id="main_back" 
                              type="text"
                              label="Główna technologia Backendowa"
                              name="main_back"
                              value={formData.main_back}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                          />
                      </Stack>
                      <Stack spacing={2}>
                          <TextField
                              id="available_places" 
                              type="number"
                              label="Dostępne miejsca"
                              name="available_places"
                              value={formData.available_places}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                              InputProps={{
                                inputProps: { 
                                    type: 'number',
                                    max: 5, 
                                    min: 4 
                                }
                            }}
                          />
                      </Stack>
                      <Stack spacing={2}>
                          <TextField
                              id="places" 
                              type="number"
                              label="Dostępne miejsca dla drużyn"
                              name="places"
                              value={formData.aplaces}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                              InputProps={{
                                inputProps: { 
                                    type: 'number',
                                    max: 5, 
                                    min: 4 
                                }
                            }}
                          />
                      </Stack>
                      <Stack spacing={4}>
                          <Button variant="contained" type="submit">DODAJ</Button>
                      </Stack>    
                  </Box>
              </form>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(AddCompany);