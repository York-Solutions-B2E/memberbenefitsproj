import {Navigate} from "react-router-dom";

function ProtectedRoutes({children}) {

    const user = sessionStorage.getItem('user');
    // console.log("protected routes",user);
    return user ? children : <Navigate to={'/login'}/>;
}

export default ProtectedRoutes;