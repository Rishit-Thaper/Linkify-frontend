import AllLinks from '../components/AllLinks';
import LinkForm from '../components/LinkForm';
import Preview from '../components/Preview';
import { AuthChecker } from '../libs/AuthChecker';

const Home = () => {
    AuthChecker();
    return (
        <div>
            This is homepage
            <Preview />
            <AllLinks />
            <LinkForm />
        </div>
    );
};

export default Home;
