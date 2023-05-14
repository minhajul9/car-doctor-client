import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)

    if(loading ){
        return <div className="flex justify-center my-6"><progress className="progress w-56"></progress></div>
    }

    if(user){
        return children;
    }

    return (
        <Navigate to='/login'></Navigate>
    );
};

export default PrivateRoute;