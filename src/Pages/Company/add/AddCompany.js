import React, {useState} from "react";
import { Navigate} from 'react-router-dom';
import { Container, Box, Stack, Paper, TextField, Button, Typography, MenuItem} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from "axios";
import { connect } from "react-redux";
import Swal from 'sweetalert2';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
  }));

const AddCompany = ({isAuthenticated, isCompanyOwner}) => {
    const [companyCreated, setCompanyCreated] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        contact_number: '',
        contact_email: '',
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
            Swal.fire({
                icon: 'error',
                text: 'Wystąpił błąd!',
            })
          return false;
        }
        Swal.fire({
            icon: 'success',
            text: 'Stworzyłeś Wizytówkę Firmy!',
        }).then(okay => {
            if(okay){
                setCompanyCreated(true);
            }
        })
    };

    if(companyCreated) {
      return <Navigate to='/company'/>
    }

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    if (isCompanyOwner===true) {
        return <Navigate to='/'/>
    }

    return (
        <Container sx={{
            justifyContent: 'center',
            marginTop: 5
        }}>
              <Box>
                  <Stack spacing={2}>
                      <Item>
                          <Typography>STWÓRZ WIZYTÓWKĘ FIRMY</Typography>
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
                              id="places" 
                              label="Dostępne miejsca dla drużyn"
                              name="places"
                              value={formData.places}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                              select
                          >
                            <MenuItem key={4} value={4}>
                                4
                            </MenuItem>
                            <MenuItem key={5} value={5}>
                                5
                            </MenuItem>
                        </TextField>
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
    isAuthenticated: state.auth.isAuthenticated,
    isCompany: state.auth.user.is_company,
    isLeader: state.auth.user.is_leader,
    isMember: state.auth.user.is_member,
    isCompanyOwner: state.auth.user.is_companyOwner
});

export default connect(mapStateToProps, {})(AddCompany);