import AllLinks from '../components/AllLinks';
import LinkForm from '../components/LinkForm';
import Preview from '../components/Preview';
import { AuthChecker } from '../libs/AuthChecker';
import AuthDetails from '../libs/AuthDetails';

const Home = () => {
    const { user } = AuthDetails();
    AuthChecker();
    return (
        <div className="dashboard">
            <div className="dashboard-left">
                <div className="welcome">
                    <h2>Hi {user?.username}, Welcome to Linkify!</h2>
                </div>
                <div className="link-form">
                    <LinkForm />
                </div>
                <div className="share-profile">
                    <input type="text" value={`localhost:5713/${user?.username}`} disabled />
                    <br />
                    <button>Share Profile</button>
                </div>
                <div className="qr-div">
                    <button>Download and Share QR Code</button>
                </div>
                <button>Share Feedback</button>
            </div>
            <div className="dashboard-center">
                <AllLinks />
            </div>
            <div className="dashboard-right">
                <Preview />
            </div>
        </div>
    );
};

export default Home;
