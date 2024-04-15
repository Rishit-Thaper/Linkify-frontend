import { useQuery } from '@tanstack/react-query';
import { useLinkMutations } from '../hooks/linkMutations/useLinkMutations';
import { getAllLinks } from '../services/ApiServices';
import AuthDetails from '../libs/AuthDetails';
import { LinkType } from '../@types/global';
import React from 'react';
import { toast } from 'react-toastify';
import { useLinkContext } from '../hooks/useLinkContext';
import { Link } from 'react-router-dom';

const AllLinks = () => {
    const { deleteLinkMutation } = useLinkMutations();
    const { setSelectedLinkId } = useLinkContext();
    const { token } = AuthDetails();
    const { data } = useQuery({
        queryKey: ['links'],
        queryFn: () => getAllLinks(token!),
    });
    const linkData: LinkType[] = data?.data;
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
                linkData.map((link: LinkType, index: number) => (
                    <React.Fragment key={index}>
                        <div className="link" key={index}>
                            <Link to={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank">
                                <span>{link.title}</span>
                            </Link>{' '}
                            <button className="danger" onClick={() => deleteLink(link._id)}>
                                Delete
                            </button>
                            <button onClick={() => setSelectedLinkId(link._id)}>Update</button>
                        </div>
                    </React.Fragment>
                ))
            ) : (
                <p>No links found!!</p>
            )}
        </div>
    );
};

export default AllLinks;
