import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [userData, setUserData] = useState([]);
    useEffect(()=>{
        const getUser = async () => {
            const {data: res} = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
            setUserData(res);
        }
        getUser();
    }, [])
    return (
        <div>
            tes
        </div>
    );
};

export default Home;