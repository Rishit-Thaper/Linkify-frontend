import { useQuery } from '@tanstack/react-query';
import { getCompleteProfile } from '../services/ApiServices';
import AuthDetails from '../libs/AuthDetails';
import { CompleteProfile, LinkType } from '../@types/global';
import userPicture from '../assets/user.png';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import linkifyLogo from '../assets/linkify-mid-black.png';
const Preview = () => {
    const { token } = AuthDetails();
    const { data } = useQuery({
        queryKey: ['completeProfile'],
        queryFn: () => getCompleteProfile(token!),
    });
    const { user } = AuthDetails();
    const completeProfile: CompleteProfile = data?.data[0];
    console.log('complete profile', completeProfile);
    console.log(completeProfile?.bio);
    return (
        <>
            <div>
                <div className="image-container">
                    {completeProfile?.avatar ? (
                        <img src={completeProfile?.avatar} width={100} alt="Avatar" />
                    ) : (
                        <img src={userPicture} width={100} alt="Avatar" />
                    )}
                </div>
                {user && (
                    <>
                        <p id="username">@{user.username}</p>
                        <span id="bio">{completeProfile?.bio}</span>

                        <p id="email">
                            {user.email}{' '}
                            {completeProfile && (
                                <span>
                                    {'| '}🎂 {format(new Date(completeProfile?.dateOfBirth), 'MMMM d, yyyy')}
                                </span>
                            )}
                        </p>
                    </>
                )}

                {completeProfile ? (
                    <>
                        {completeProfile?.links && completeProfile?.links.length > 0 ? (
                            <div className="links-div">
                                {completeProfile?.links
                                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                                    .map((link: LinkType, index: number) => (
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
                            <p>No links found!!</p>
                        )}
                    </>
                ) : (
                    <p>Create a profile first</p>
                )}
            </div>
            <img className="bottom-logo" src={linkifyLogo} alt="" width={120} />
        </>
    );
};

export default Preview;
