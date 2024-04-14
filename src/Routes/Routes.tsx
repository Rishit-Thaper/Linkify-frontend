import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import CreateProfile from '../pages/CreateProfile';
import Dashboard from '../pages/Dashboard';
import PublicProfile from '../pages/PublicProfile';

const RouterComponent = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<CreateProfile />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/:username" element={<PublicProfile />} />
        </Routes>
    );
};

export default RouterComponent;
