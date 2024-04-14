import { useQuery } from '@tanstack/react-query';
import { getCompleteProfile } from '../services/ApiServices';
import AuthDetails from '../libs/AuthDetails';
import { CompleteProfile, Link } from '../@types/global';
import userPicture from '../assets/user.png';

import React from 'react';
const Preview = () => {
    const { token } = AuthDetails();
    const { data } = useQuery({
        queryKey: ['completeProfile'],
        queryFn: () => getCompleteProfile(token!),
    });
    const completeProfile: CompleteProfile = data?.data[0];
    console.log('complete profile', completeProfile);
    console.log(completeProfile?.bio);
    return (
        <>
            {completeProfile && (
                <div>
                    {completeProfile.avatar ? (
                        <img src={completeProfile?.avatar} width={100} alt="Avatar" />
                    ) : (
                        <img src={userPicture} width={100} alt="Avatar" />
                    )}
                    <p>{completeProfile.bio}</p>
                    {completeProfile.users && (
                        <>
                            <p>{completeProfile.users[0].username}</p>
                            <p>{completeProfile.users[0].email}</p>
                        </>
                    )}
                    <p>{completeProfile.dateOfBirth}</p>
                    {completeProfile.links && completeProfile.links.length > 0 ? (
                        completeProfile.links.map((link: Link, index: number) => (
                            <React.Fragment key={index}>
                                <p>{link.title}</p>
                                <p>{link.url}</p>
                            </React.Fragment>
                        ))
                    ) : (
                        <p>No links found!!</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Preview;
