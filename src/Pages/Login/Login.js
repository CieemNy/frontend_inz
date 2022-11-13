import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {email, password} = formData;
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});
    const onSubmit = event => {
        event.preventDeafult();
    }
}

export default connect() (Login);