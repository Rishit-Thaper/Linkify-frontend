import AllLinks from '../components/AllLinks';
import LinkForm from '../components/LinkForm';
import Preview from '../components/Preview';
import ShareProfile from '../components/ShareProfile';
import { AuthChecker } from '../libs/AuthChecker';
import AuthDetails from '../libs/AuthDetails';
import QRCodeComponent from '../components/QRCode';

const Home = () => {
    const handleDownloadQR = () => {
        const qrComponent = document.querySelector('.qr-div');
        if (qrComponent) {
            qrComponent.querySelector('div')?.querySelector('button')?.click();
        }
    };

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
                    <ShareProfile />
                </div>
                <div className="qr-div">
                    <QRCodeComponent />
                    <button onClick={handleDownloadQR}>Download and Share QR Code</button>
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
