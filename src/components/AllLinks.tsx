import { useQuery } from '@tanstack/react-query';
import { useLinkMutations } from '../hooks/linkMutations/useLinkMutations';
import { getAllLinks } from '../services/ApiServices';
import AuthDetails from '../libs/AuthDetails';
import { LinkType } from '../@types/global';
import { toast } from 'react-toastify';
import { useLinkContext } from '../hooks/useLinkContext';
import { Link } from 'react-router-dom';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { LuExternalLink } from 'react-icons/lu';
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
    const deleteLink = async (linkId: string) => {
        await deleteLinkMutation.mutateAsync(linkId);
        toast.success('Deleted');
    };
    return (
        <div>
            {linkData && linkData.length > 0 ? (
                linkData
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .map((link: LinkType, index: number) => (
                        <div className="link" key={index}>
                            <div>
                                <Link
                                    to={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                    target="_blank"
                                >
                                    <p>{link.title}</p>
                                </Link>{' '}
                            </div>

                            <div className="editor-buttons">
                                <div>
                                    <Link
                                        to={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                        target="_blank"
                                    >
                                        <LuExternalLink />
                                    </Link>{' '}
                                </div>
                                <div onClick={() => setSelectedLinkId(link._id)}>
                                    <BiMessageSquareEdit />
                                </div>
                                <div className="danger" onClick={() => deleteLink(link._id)}>
                                    <IoMdRemoveCircleOutline />
                                </div>
                            </div>
                        </div>
                    ))
            ) : (
                <p>No links found!!</p>
            )}
        </div>
    );
};

export default AllLinks;
