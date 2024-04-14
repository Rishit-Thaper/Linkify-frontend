import AllLinks from '../components/AllLinks';
import Preview from '../components/Preview';
import { AuthChecker } from '../libs/AuthChecker';

const Home = () => {
    AuthChecker();
    return (
        <div>
            This is homepage
            <Preview />
            <AllLinks />
        </div>
    );
};

export default Home;
