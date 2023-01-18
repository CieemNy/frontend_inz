import React, {useState, useEffect} from "react";
import { useParams, Navigate, useLocation} from 'react-router-dom';
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

const AddChoices = ({isAuthenticated, isMadeChoices, userID}) => {
    const {teamId} = useParams();
    const [choicesCreated, setChoicesCreated] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    const [formData, setFormData] = useState({
        choice_first: '',
        choice_second: '',
        choice_third: '',
        choice_fourth: '',
    })

    const location = useLocation();
    const { state } = location;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/accounts/teams/${teamId}/choices/add`, formData, {
              headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
            })
          } catch (e) {
            Swal.fire({
                icon: 'error',
                text: 'Wystąpił błąd! Nie możesz w swoich wyborach podać więcej niż raz jednej firmy',
            })
          return false;
          }
          Swal.fire({
            icon: 'success',
            text: 'Dokonałeś wyborów dla swojego zespołu!',
            }).then(okay => {
            if(okay){
                setChoicesCreated(true);
            }
        })
    };

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
            getCompanies();
            setDidFetch(true)
        }
    }, [didFetch])

    if(choicesCreated) {
      return <Navigate to='/home'/>
    }

    if(isMadeChoices===true){
        return <Navigate to='/home'/>
    }
    
    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    if (state.userTeam !== userID) {
        return <Navigate to='/home'/>
    }
    return (
        <Container sx={{
            justifyContent: 'center',
            marginTop: 5
        }}>
              <Box>
                  <Stack spacing={2}>
                      <Item>
                          <Typography>DOKONAJ WYBORÓW FIRM SWOJEGO ZESPOŁU</Typography>
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
                              id="choice_first" 
                              label="Wybór pierwszy"
                              name="choice_first"
                              value={formData.choice_first}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                              select
                          >
                            {companies.map(companies => (
                                <MenuItem key={companies.id} value={companies.id}>{companies.name}</MenuItem>
                            ))}
                        </TextField>
                      </Stack>
                      <Stack spacing={2}>
                        <TextField
                              id="choice_second" 
                              label="Wybór drugi"
                              name="choice_second"
                              value={formData.choice_second}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                              select
                          >
                            {companies.map(companies => (
                                <MenuItem key={companies.id} value={companies.id}>{companies.name}</MenuItem>
                            ))}
                        </TextField>
                      </Stack>
                      <Stack spacing={2}>
                        <TextField
                              id="choice_third" 
                              label="Wybór trzeci"
                              name="choice_third"
                              value={formData.choice_third}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                              select
                          >
                            {companies.map(companies => (
                                <MenuItem key={companies.id} value={companies.id}>{companies.name}</MenuItem>
                            ))}
                        </TextField>
                      </Stack>
                      <Stack spacing={2}>
                        <TextField
                              id="choice_fourth" 
                              label="Wybór czwarty"
                              name="choice_fourth"
                              value={formData.choice_fourth}
                              onChange={event => onChange(event)}
                              variant="outlined"
                              margin="dense"
                              required
                              select
                          >
                            {companies.map(companies => (
                                <MenuItem key={companies.id} value={companies.id}>{companies.name}</MenuItem>
                            ))}
                        </TextField>
                      </Stack>
                      <Stack spacing={4} sx={{marginTop: 2}}>
                          <Button variant="contained" type="submit">Zatwierdź wybory</Button>
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
    isMadeChoices: state.auth.user.is_madeChoices,
    userID: state.auth.user.id
});

export default connect(mapStateToProps, {})(AddChoices);