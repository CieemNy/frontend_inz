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


const AddProject = () => {
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
            {/* <form onSubmit={e => onSubmit(e)}> */}
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
                            //   value={formData.name}
                            //   onChange={event => onChange(event)}
                            name="titlw"
                            required
                        />
                    </Stack>
                    <Stack spacing={2}>
                        <TextField
                            id="description" 
                            type="text"
                            label="Opis"
                            name="description"
                            //   value={formData.description}
                            //   onChange={event => onChange(event)}
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
                            //   value={formData.contact_number}
                            //   onChange={event => onChange(event)}
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
                            //   value={formData.contact_email}
                            //   onChange={event => onChange(event)}
                            variant="outlined"
                            margin="dense"
                            required
                        />
                    </Stack>
                    <Stack spacing={4}>
                        <Button variant="contained" type="submit">DODAJ</Button>
                    </Stack>    
                </Box>
            {/* </form> */}
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isCompany: state.auth.user.is_company,
    isLeader: state.auth.user.is_leader,
    isMember: state.auth.user.is_member
});

export default connect(mapStateToProps, {})(AddProject);