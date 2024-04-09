import {
    getProfile,
    getPublicProfile,
    getCompleteProfile,
    updateAvatar,
    createProfile,
    updateProfile,
} from '../../services/ApiServices';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AuthDetails from '../../libs/AuthDetails';

export const useProfileMutations = () => {
    const queryClient = useQueryClient();
    const { user, token } = AuthDetails();
    const userId = user?._id;
    const getProfileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const data = await getProfile(token!);
            return data;
        },
        enabled: !!token,
    });

    const getPublicProfileQuery = useQuery({
        queryKey: ['publicProfile', userId],
        queryFn: async () => {
            const data = await getPublicProfile(userId!);
            return data;
        },
    });

    const getCompleteProfileQuery = useQuery({
        queryKey: ['completeProfile', userId],
        queryFn: async () => {
            const data = await getCompleteProfile(token!);
            return data;
        },
    });
    const createProfileQuery = useMutation({
        mutationFn: (data: { dateOfBirth: string; bio: string; avatar: string }) => {
            return createProfile(data.dateOfBirth, data.bio, data.avatar, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
    const updateProfileQuery = useMutation({
        mutationFn: (data: { dateOfBirth: string; bio: string }) => {
            return updateProfile(data.dateOfBirth, data.bio, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });

    const updateAvatarQuery = useMutation({
        mutationFn: (avatar: string) => {
            return updateAvatar(avatar, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });

    return {
        getProfileQuery,
        getPublicProfileQuery,
        getCompleteProfileQuery,
        createProfileQuery,
        updateProfileQuery,
        updateAvatarQuery,
    };
};
