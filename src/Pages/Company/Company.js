import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

const Company = () => {
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        const getCompanies = async () => {
            const {data: res} = await axios.get(`http://localhost:8000/accounts/company`)
            setCompanies(res);
        }
        getCompanies()
        console.log(companies)
    })
    return (
        <div>Company</div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { } ) (Company);