import ProfileForm from '../components/ProfileForm';
import { AuthChecker } from '../libs/AuthChecker';

const CreateProfile = () => {
    AuthChecker();
    return <ProfileForm />;
};

export default CreateProfile;
