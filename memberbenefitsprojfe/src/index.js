import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Container} from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={"11830788307-7343nfjrodf4ml27293ptjqp8a3us1hc.apps.googleusercontent.com"}>
            <Container >
                <App/>
            </Container>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
