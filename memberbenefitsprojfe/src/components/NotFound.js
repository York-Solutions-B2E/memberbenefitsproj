// NotFound.jsx
import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center d-flex align-items-center justify-content-center vh-100">
            <Row>
                <Col>
                    <Link to="/dashboard">
                        <Button variant="primary" onClick={() => navigate('/')}>
                            🚀 Take Me Home
                        </Button>
                    </Link>
                    <h1 style={{fontSize: '8rem'}}>🤷‍♂️ 404</h1>
                    <h2 className="mb-4">Page Not Found</h2>
                    <p className="lead">
                        Looks like you're lost in space 🌌 or the page moved while you blinked 👀.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
