import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Container} from "react-bootstrap";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./bgimage.css"
import image from "./memberbenefit.png";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./util/ProtectedRoutes";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/dashboard",
        element: (<ProtectedRoutes>
            <Dashboard/>
            </ProtectedRoutes>
        )
    }
])
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={"11830788307-7343nfjrodf4ml27293ptjqp8a3us1hc.apps.googleusercontent.com"}>
            <Container style={{"all": "unset"}}>
                <div className="healthcare-background" style={{'--bg-image': `url(${image})`}}>
                    <div className="background-overlay"></div>
                    <div className="background-content">
                        <RouterProvider router={router}/>
                    </div>
                </div>
            </Container>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
