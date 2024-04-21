import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComponent from './Routes/Routes';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <RouterComponent />
        </Router>
    );
}

export default App;
