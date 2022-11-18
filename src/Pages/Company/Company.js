import axios from 'axios';
import React, {useEffect, useState} from 'react';

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
    console.log(companies)
    return (
        <div>Company</div>
    )
}

export default Company;