import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPublicProfile } from '../services/ApiServices';
import { CompletePublicProfile } from '../@types/global';
import userPicture from '../assets/user.png';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import linkifyLogo from '../assets/linkify-mid-black.png';
const PublicProfile = () => {
    const { username } = useParams();
    const { data } = useQuery({
        queryKey: ['publicProfile'],
        queryFn: () => getPublicProfile(username!),
    });
    const completeProfile: CompletePublicProfile = data?.data[0];
    const profile = completeProfile?.profile[0];
    const links = completeProfile?.links;
    return (
        <div className="public">
            <div className="publicProfile">
                <div className="image-container">
                    {profile?.avatar ? (
                        <img src={profile?.avatar} width={100} alt="Avatar" />
                    ) : (
                        <img src={userPicture} width={100} alt="Avatar" />
                    )}
                </div>
                <div>
                    <p id="username">@{completeProfile?.username}</p>
                    <span id="bio">{profile?.bio}</span>
                    <p id="email">
                        {completeProfile?.email}{' '}
                        {profile?.dateOfBirth && (
                            <span>
                                {'| '}🎂 {format(new Date(profile?.dateOfBirth), 'MMMM d, yyyy')}
                            </span>
                        )}
                    </p>
                </div>
                {links && links.length > 0 ? (
                    <div className="links-div">
                        {links
                            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                            .map((link, index) => (
                                <div className="link" key={index}>
                                    <Link
                                        to={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                        target="_blank"
                                    >
                                        <button>{link.title}</button>
                                    </Link>{' '}
                                </div>
                            ))}
                    </div>
                ) : (
                    <p>No Links found!!</p>
                )}
                <Link to="/home" target="_blank">
                    <img src={linkifyLogo} alt="Linkify Logo" className="bottom-logo" />
                </Link>
            </div>
        </div>
    );
};

export default PublicProfile;
