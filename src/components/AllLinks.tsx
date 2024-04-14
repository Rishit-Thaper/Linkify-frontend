import { useQuery } from '@tanstack/react-query';
import { useLinkMutations } from '../hooks/linkMutations/useLinkMutations';
import { getAllLinks } from '../services/ApiServices';
import AuthDetails from '../libs/AuthDetails';
import { Link } from '../@types/global';
import React from 'react';
import { toast } from 'react-toastify';

const AllLinks = () => {
    const { deleteLinkMutation } = useLinkMutations();
    const { token } = AuthDetails();
    const { data } = useQuery({
        queryKey: ['links'],
        queryFn: () => getAllLinks(token!),
    });
    const linkData: Link[] = data?.data;
    console.log(linkData);
    const deleteLink = (linkId: string) => {
        deleteLinkMutation.mutateAsync(linkId);
        if (deleteLinkMutation.isSuccess) {
            toast.success('Deleted');
        }
    };
    return (
        <div>
            {linkData && linkData.length > 0 ? (
                linkData.map((link: Link, index: number) => (
                    <React.Fragment key={index}>
                        <p>{link.title}</p>
                        <p>{link.url}</p>
                        <button onClick={() => deleteLink(link._id)}>Delete</button>
                    </React.Fragment>
                ))
            ) : (
                <p>No links found!!</p>
            )}
        </div>
    );
};

export default AllLinks;
