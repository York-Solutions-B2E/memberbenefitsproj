import React, {useState} from 'react';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailPasswordSubmit = (event) => {
        event.preventDefault();
        console.log('Manual login submitted:', {email, password});
        // TODO: Add your backend authentication logic here
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google login successful:', credentialResponse);
        console.log('Not decoded: ',credentialResponse.credential);
        const decoded = jwtDecode(credentialResponse.credential);
        console.log('Decoded JWT:', decoded);
        // TODO: Send the `credentialResponse.credential` to your backend for verification
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
                            <h2 className="text-center mb-4">Log In</h2>

                            {/* Standard Email/Password Form */}
                            <Form onSubmit={handleEmailPasswordSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label column={"sm"}>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label column={"sm"}>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mb-3">
                                    Log In
                                </Button>
                            </Form>

                            <hr/>

                            {/* Google SSO Button */}
                            <div className="d-grid gap-2">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleFailure}
                                    text="Log In with Google"
                                />
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
