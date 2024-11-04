import React from "react";
import ProfileInfo from "../Components/ProfileInfo.js";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useEffect } from "react";
const Profiles = () => {

    const navigate = useNavigate();
    const [profileData, setProfileData] = React.useState({});

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (token == null) {
                    navigate('/sign-in');
                } else {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    };
                    const response = await axios.get('https://localhost:7135/api/User/profile', config);
                    if (response.status === 200) {
                        setProfileData(response.data);
                        console.log(response.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        getProfileData();
    }, [sessionStorage.getItem('token')]);
    return (
        <div style={{ marginTop: '20px'}}>
            <div style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                {profileData && <ProfileInfo{...profileData} />}
            </div>
        </div>
    )
}

export default Profiles