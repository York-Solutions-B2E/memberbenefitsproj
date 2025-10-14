import React, {useEffect} from 'react';
import {useNavigate} from "react-router";

function Dashboard({props}) {
    const activeSession = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        console.log(activeSession);
        if (!activeSession?.email_verified){
            console.log(activeSession);
            navigate('/login');
        }
    },[]);
    return (
        <div>
            hello from dashboard
        </div>
    );
}

export default Dashboard;