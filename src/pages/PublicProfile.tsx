import { useQuery } from '@tanstack/react-query';
// import React from 'react';
import { useParams } from 'react-router-dom';
import { getPublicProfile } from '../services/ApiServices';

const PublicProfile = () => {
    const { username } = useParams();
    console.log(username);
    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getPublicProfile(username!),
    });
    console.log(data);
    return <div>public profile</div>;
};

export default PublicProfile;
