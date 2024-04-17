import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import CreateProfile from '../pages/CreateProfile';
import Dashboard from '../pages/Dashboard';
import PublicProfile from '../pages/PublicProfile';
import Layout from '../components/layout/Layout';

const RouterComponent = () => {
    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route
                path="/auth"
                element={
                    <Layout>
                        <Auth />
                    </Layout>
                }
            />
            <Route
                path="/profile"
                element={
                    <Layout>
                        <CreateProfile />
                    </Layout>
                }
            />
            <Route
                path="/"
                element={
                    <Layout>
                        <Dashboard />
                    </Layout>
                }
            />
            <Route path="/:username" element={<PublicProfile />} />
        </Routes>
    );
};

export default RouterComponent;
