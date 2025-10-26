import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from "react-router";
import {API_BASE_URL} from "../util/globalVar";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        // Get item from session storage after component mounts
        const storedUser = sessionStorage.getItem('user');
        console.log(storedUser);
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            // maybe a better practice to check the sub/token i.e "1203989049039"
            // redirect to dashboard if session was previously logged in
            console.log("user data", userData);
            // if (userData?.email_verified) {
            //     console.log("tried to nav")
            //     navigate('/dashboard');
            // }
        }
    }, []); // Run only once on mount

    const handleGoogleSuccess = async (credentialResponse) => {
        // console.log('Google login successful:', credentialResponse);
        console.log('Not decoded: ', credentialResponse.credential);
        const decoded = jwtDecode(credentialResponse.credential);
        // console.log('Decoded JWT:', decoded);
        // TODO: Send the `credentialResponse.credential` to your backend for verification

        const response = await fetch(API_BASE_URL + 'auth/google', {
            method: 'POST',
            body: credentialResponse.credential
        })

        if (response.ok) {
            sessionStorage.setItem('user', JSON.stringify(decoded));
            navigate('/dashboard');
        }
        //store in session if success
        // Set item in session storage

        // render dashboard upon successful login
    };

    const handleGoogleFailure = () => {
        console.log('Google login failed');
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login Portal</h2>

                            <hr/>

                            {/* Google SSO Button */}
                            <div className="d-grid gap-2">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleFailure}
                                    text="Log In with Google"
                                />
                                {/*some error message display here*/}
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
