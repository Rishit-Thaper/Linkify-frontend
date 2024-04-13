import AuthDetails from '../libs/AuthDetails';
import logo from '../assets/linkify-low-1.png';
import { Link } from 'react-router-dom';
const Header = () => {
    const { user } = AuthDetails();
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
                </div>
            </div>
        </>
    );
};

export default Header;
