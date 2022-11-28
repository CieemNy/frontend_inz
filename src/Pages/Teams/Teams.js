import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Button, Container, Typography } from '@mui/material';

const Teams = ({isAuthenticated, isLeader, isMember}) => {
    const [teams, setTeams] = useState([]);
    const [didFetch, setDidFetch] = useState(false);
    const getTeams = async () => {
        const {data: res} = await axios.get(`http://localhost:8000/accounts/teams`,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        setTeams(res);
    }
    useEffect(() => {
        if(!didFetch){
            setDidFetch(true)
            getTeams();
        }
    }, [didFetch])

    if (isAuthenticated===false) {
        return <Navigate to='/'/>
    }

    return (
        <div>Teams</div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLeader: state.auth.user.is_leader,
    isMember: state.auth.user.is_member
});

export default connect(mapStateToProps, {})(Teams);