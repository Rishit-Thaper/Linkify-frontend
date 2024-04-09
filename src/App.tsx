import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComponent from './Routes/Routes';
function App() {
    return (
        <Router>
            <RouterComponent />
        </Router>
    );
}

export default App;
