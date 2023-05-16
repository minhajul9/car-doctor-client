import  { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SocialLogin = ({from}) => {

    const {googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            // console.log(result.user);
            navigate(from || '/', { replace: true })
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <div className='text-center'>
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;