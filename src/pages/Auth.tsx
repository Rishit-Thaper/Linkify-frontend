import { useEffect, useState } from 'react';
import Form from '../components/Form';
import { SIGNUP, LOGIN } from '../constants/AppConstants';
import AuthDetails from '../libs/AuthDetails';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const { isAuthenticated } = AuthDetails();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const [formType, setFormType] = useState<string>(SIGNUP);
    return (
        <div className="auth-div">
            <h1>Connect with Linkify: Join or Log in</h1>
            <div className="auth">
                <button onClick={() => setFormType(SIGNUP)} id="signup">
                    Sign up
                </button>
                <button onClick={() => setFormType(LOGIN)} id="login">
                    Log in
                </button>
                <Form formType={formType} />
            </div>
        </div>
    );
};

export default Auth;
