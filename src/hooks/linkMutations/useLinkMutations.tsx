import { createLink, updateLink, deleteLink } from '../../services/ApiServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthDetails from '../../libs/AuthDetails';

export const useLinkMutations = () => {
    const queryClient = useQueryClient();
    const { token } = AuthDetails();

    const createLinkMutation = useMutation({
        mutationFn: (data: { title: string; url: string }) => {
            return createLink(data.title, data.url, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
            queryClient.invalidateQueries({ queryKey: ['completeProfile'] });
        },
    });

    const updateLinkMutation = useMutation({
        mutationFn: (data: { title: string; url: string; linkId: string }) => {
            return updateLink(data.title, data.url, data.linkId, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
            queryClient.invalidateQueries({ queryKey: ['completeProfile'] });
        },
    });

    const deleteLinkMutation = useMutation({
        mutationFn: (linkId: string) => {
            return deleteLink(linkId, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
            queryClient.invalidateQueries({ queryKey: ['completeProfile'] });
        },
    });

    return {
        createLinkMutation,
        updateLinkMutation,
        deleteLinkMutation,
    };
};
