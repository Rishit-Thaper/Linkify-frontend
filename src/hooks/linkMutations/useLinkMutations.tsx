import { getSingleLink, getAllLinks, createLink, updateLink, deleteLink } from '../../services/ApiServices';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AuthDetails from '../../libs/AuthDetails';

export const useLinkMutations = (linkId: string) => {
    const queryClient = useQueryClient();
    const { token } = AuthDetails();

    const getAllLinksQuery = useQuery({
        queryKey: ['links'],
        queryFn: async () => {
            const data = await getAllLinks(token!);
            return data;
        },
        enabled: !!token,
    });

    const getSingleLinkQuery = useQuery({
        queryKey: ['link', linkId],
        queryFn: async () => {
            const data = await getSingleLink(linkId, token!);
            return data;
        },
        enabled: !!token,
    });

    const createLinkMutation = useMutation({
        mutationFn: (data: { title: string; url: string }) => {
            return createLink(data.title, data.url, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        },
    });

    const updateLinkMutation = useMutation({
        mutationFn: (data: { title: string; url: string }) => {
            return updateLink(data.title, data.url, linkId, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        },
    });

    const deleteLinkMutation = useMutation({
        mutationFn: (linkId: string) => {
            return deleteLink(linkId, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        },
    });

    return {
        getAllLinksQuery,
        getSingleLinkQuery,
        createLinkMutation,
        updateLinkMutation,
        deleteLinkMutation,
    };
};
