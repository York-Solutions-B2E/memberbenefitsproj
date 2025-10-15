import React from 'react';
import {Button} from 'react-bootstrap';
import {useNavigate} from "react-router";

//onSignOut prop not use for this specific project but useful and needed for reusability
const SignOutButton = ({onSignOut, variant = 'link', size = 'md', className = ''}) => {
    // todo: on signOut need to clear session storage and nav back to login page
    const navigate = useNavigate();
    function mocksignout() {
        sessionStorage.removeItem('user');
        navigate('/');
        console.log("SignOutButton");
    }

    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            onClick={mocksignout}
        >
            Sign out
        </Button>
    );
};

export default SignOutButton;
