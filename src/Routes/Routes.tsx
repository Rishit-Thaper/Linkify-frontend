import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import CreateProfile from '../pages/CreateProfile';

const RouterComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/createProfile" element={<CreateProfile />} />
        </Routes>
    );
};

export default RouterComponent;
