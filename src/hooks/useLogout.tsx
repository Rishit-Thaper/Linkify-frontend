import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.clear();
        navigate('/auth');
        console.log('Logout');
    };
    return { logout };
};
