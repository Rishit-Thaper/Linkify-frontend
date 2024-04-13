import { createProfile, updateProfile } from '../../services/ApiServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthDetails from '../../libs/AuthDetails';

export const useProfileMutations = () => {
    const queryClient = useQueryClient();
    const { token } = AuthDetails();
    const createProfileQuery = useMutation({
        mutationFn: (formData: FormData) => {
            return createProfile(formData, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
    const updateProfileQuery = useMutation({
        mutationFn: (data: { bio: string | undefined; dateOfBirth: string | undefined; avatar: File | null }) => {
            return updateProfile(data?.bio, data?.dateOfBirth, data?.avatar, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });

    // const updateAvatarQuery = useMutation({
    //     mutationFn: (avatar: string) => {
    //         return updateAvatar(avatar, token!);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['profile'] });
    //     },
    // });

    return {
        createProfileQuery,
        updateProfileQuery,
        // updateAvatarQuery,
    };
};
