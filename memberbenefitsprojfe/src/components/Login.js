import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import SessionStorageInit from "./SessionStorageInit";

function Login() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Get item from session storage after component mounts
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []); // Run only once on mount

    const storeUser = (user) => {
        // Set item in session storage
        sessionStorage.setItem('user', JSON.stringify(user));
        setUserData(user);
    };

    const handleGoogleSuccess = (credentialResponse) => {
        // console.log('Google login successful:', credentialResponse);
        // console.log('Not decoded: ',credentialResponse.credential);
        const decoded = jwtDecode(credentialResponse.credential);
        // console.log('Decoded JWT:', decoded);
        // TODO: Send the `credentialResponse.credential` to your backend for verification

        //store in session if success
        storeUser(decoded);
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
                                {}
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
