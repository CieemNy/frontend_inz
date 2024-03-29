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

const AddCompany = ({isAuthenticated, isLeader, isMember, isCompany}) => {
    const [teamCreated, setTeamCreated] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        access_code: '',
        places: '',
    })
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/teams/create`, formData, {
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
            text: 'Stworzyłeś Zespół!',
        }).then(okay => {
            if(okay){
                setTeamCreated(true);
            }
        })
    };

    if(teamCreated) {
      return <Navigate to='/teams'/>
    }

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    if (isCompany===true) {
        return <Navigate to='/'/>
    }

    if (isLeader || isMember) {
        return <Navigate to='/teams'/>
    }

    return (
        <Container sx={{
            justifyContent: 'center',
            marginTop: 5
        }}>
              <Box>
                  <Stack spacing={2}>
                      <Item>
                          <Typography>DODAJ ZESPÓŁ</Typography>
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
                              label="Nazwa Zespołu"
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
                              id="access_code"
                              type="text"
                              label="Kod dostępu"
                              variant="outlined"
                              margin="dense"
                              value={formData.access_code}
                              onChange={event => onChange(event)}
                              name="access_code"
                              required
                          />
                      </Stack>
                      <Stack spacing={2}>
                        <TextField
                              id="places" 
                              label="Dostępne miejsca w drużynie"
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
                            <MenuItem key={6} value={6}>
                                6
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
    isLeader: state.auth.user.is_leader,
    isMember: state.auth.user.is_member,
    isCompany: state.auth.user.is_company
});

export default connect(mapStateToProps, {})(AddCompany);