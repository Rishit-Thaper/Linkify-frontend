import { useForm, SubmitHandler } from 'react-hook-form';
import { useProfileMutations } from '../hooks/profileMutations/useProfileMutations';
import { Profile, ProfileType } from '../@types/global';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/ApiServices';
import userPicture from '../assets/user.png';
import { useQuery } from '@tanstack/react-query';
import { getLocalData, saveDataLocal } from '../storage/storage';
import AuthDetails from '../libs/AuthDetails';
import { PROFILE_KEY } from '../constants/AppConstants';
const ProfileForm = () => {
    const { createProfileQuery, updateProfileQuery } = useProfileMutations();
    const [selectedImage, setSelectedImage] = useState<string>();
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const { token } = AuthDetails();

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProfileType>();

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const { data, isError, isPending, error, isSuccess } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile(token!),
    });

    if (!error) {
        saveDataLocal(PROFILE_KEY, data?.data);
    }

    const createProfile: SubmitHandler<ProfileType> = async (formData) => {
        try {
            const formDataWithFile = new FormData();
            formDataWithFile.append('dateOfBirth', formData.dateOfBirth);
            formDataWithFile.append('bio', formData.bio);
            formDataWithFile.append('avatar', selectedImageFile as File);

            await createProfileQuery.mutateAsync(formDataWithFile);
        } catch (error) {
            console.error(error);
        }
    };

    const updateProfile: SubmitHandler<ProfileType> = async (formData) => {
        try {
            const bio = formData.bio as string | undefined;
            const dateOfBirth = formData.dateOfBirth as string | undefined;
            const avatar = selectedImageFile;

            await updateProfileQuery.mutateAsync({ bio, dateOfBirth, avatar });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    const profileData: Profile = getLocalData(PROFILE_KEY)!;

    useEffect(() => {
        if (profileData) {
            setValue('bio', profileData.bio);
            setValue('dateOfBirth', profileData.dateOfBirth);
        }
    }, [profileData, setValue]);

    useEffect(() => {
        if (isPending) {
            toast.loading('Fetching Profile');
        } else if (isSuccess) {
            toast.dismiss();
            toast.success('Profile fetched');
        } else if (isError) {
            toast.dismiss();
            toast.error('Profile Not found');
        }
    }, [isPending, isError, isSuccess]);

    useEffect(() => {
        if (createProfileQuery.isPending || updateProfileQuery.isPending) {
            toast.loading(createProfileQuery.isPending ? 'Creating Profile...' : 'Updating Profile...');
        } else if (createProfileQuery.isSuccess || updateProfileQuery.isSuccess) {
            toast.dismiss();
            toast.success(
                createProfileQuery.isSuccess ? 'Profile Created Successfully' : 'Profile Updated Successfully'
            );
        } else if (createProfileQuery.isError || updateProfileQuery.isError) {
            toast.dismiss();
            toast.error(
                createProfileQuery.isError ? createProfileQuery.error?.message : updateProfileQuery.error?.message
            );
        }
    }, [
        createProfileQuery.isSuccess,
        updateProfileQuery.isPending,
        createProfileQuery.isPending,
        updateProfileQuery.isSuccess,
        createProfileQuery.isError,
        updateProfileQuery.isError,
        createProfileQuery.error?.message,
        updateProfileQuery.error?.message,
    ]);
    if (createProfileQuery.isSuccess || updateProfileQuery.isSuccess) {
        navigate('/');
    }
    return (
        <>
            <div className="profile-div">
                <h1>Update Profile</h1>
                <div className="image-container">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected Image" />
                    ) : profileData?.avatar ? (
                        <img src={profileData.avatar} alt="Profile Avatar" />
                    ) : userPicture ? (
                        <img src={userPicture} alt="Profile Avatar" />
                    ) : null}
                </div>
                <form onSubmit={handleSubmit(profileData ? updateProfile : createProfile)}>
                    <label htmlFor="avatar-upload">Choose Avatar</label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        {...register('avatar', {
                            required: !profileData ? 'Avatar is required' : false,
                        })}
                        style={{ display: 'none' }}
                        onChange={handleImageSelect}
                    />
                    <br />
                    {errors.avatar && <span>{errors.avatar.message}</span>}
                    <br />
                    <input
                        placeholder="Date of Birth"
                        type="date"
                        {...register('dateOfBirth', {
                            required: !profileData ? 'DOB is required' : false,
                        })}
                    />
                    {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
                    <br />
                    <textarea
                        placeholder="Bio"
                        rows={4}
                        cols={50}
                        {...register('bio', {
                            required: !profileData ? 'Bio is required' : false,
                        })}
                    />
                    <br />
                    {errors.bio && <span>{errors.bio.message}</span>}
                    <button type="submit">{profileData ? 'Update Profile' : 'Create Profile'}</button>
                </form>
            </div>
        </>
    );
};

export default ProfileForm;
