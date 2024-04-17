import AuthDetails from '../libs/AuthDetails';
import logo from '../assets/linkify-low-1.png';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
const Header = () => {
    const { user } = AuthDetails();
    const { logout } = useLogout();
    const handleClick = () => {
        logout();
    };
    return (
        <>
            <div className="header">
                <div className="header__left">
                    <img src={logo} alt="linkify-logo" />
                </div>
                <div className="header__right">
                    <Link to={user ? '/profile' : '/auth'}>
                        <button>{user ? user.username : 'Get Started'}</button>
                    </Link>
                    {user && (
                        <button id="danger-button" onClick={handleClick}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
