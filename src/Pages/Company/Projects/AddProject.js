import React, {useState} from "react";
import { useParams, Navigate} from 'react-router-dom';
import { Container, Box, Stack, Paper, TextField, Button, Typography} from '@mui/material';
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


const AddProject = ({isAuthenticated}) => {
    const {companyId} = useParams()
    const [projectCreated, setProjectCreated] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        front: '',
        back: '',
    })
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`http://localhost:8000/accounts/company/${companyId}/projects/add`, formData, {
            headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`
          }
          })
        } catch (e) {
            Swal.fire({
                icon: 'error',
                text: 'Wystąpił błąd przy dodawaniu projektu',
            })
          return false;
        }
        Swal.fire({
            icon: 'success',
            text: 'Dodałeś projekt do swojej firmy!',
        }).then(okay => {
            if(okay){
                window.location.reload();
            }
        })
        setProjectCreated(true);
    };
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
                        <Typography>DODAJ PROJEKT</Typography>
                    </Item>
                </Stack>
            </Box>
            <form onSubmit={e => onSubmit(e)}>
                <Box sx={{
                    padding: 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Stack spacing={2}>
                        <TextField 
                            id="title"
                            type="text"
                            label="Tytuł projektu"
                            variant="outlined"
                            margin="dense"
                            value={formData.title}
                            onChange={event => onChange(event)}
                            name="title"
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
                            id="front" 
                            type="text"
                            label="Technologia Frontendowa"
                            name="front"
                            value={formData.front}
                            onChange={event => onChange(event)}
                            variant="outlined"
                            margin="dense"
                            required
                        />
                    </Stack>
                    <Stack spacing={2}>
                        <TextField
                            id="back" 
                            type="text"
                            label="Technologia Backendowa"
                            name="back"
                            value={formData.back}
                            onChange={event => onChange(event)}
                            variant="outlined"
                            margin="dense"
                            required
                        />
                    </Stack>
                    <Stack spacing={4}>
                        <Button variant="contained" type="submit">DODAJ</Button>
                    </Stack>    
                </Box>
            </form>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userID: state.auth.user.id
});

export default connect(mapStateToProps, {})(AddProject);