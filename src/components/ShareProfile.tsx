import AuthDetails from '../libs/AuthDetails';
import { toast } from 'react-toastify';

const ShareProfile = () => {
    const { user } = AuthDetails();
    const profileURL: string = `localhost:5173/${user?.username}`;
    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileURL);
        toast.success('Profile URL copied to clipboard');
    };
    return (
        <>
            <input type="text" value={profileURL} disabled />
            <br />
            <button onClick={copyToClipboard}>Share Profile</button>
        </>
    );
};

export default ShareProfile;
