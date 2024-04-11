import { useForm, SubmitHandler } from 'react-hook-form';
import { useProfileMutations } from '../hooks/profileMutations/useProfileMutations';
// import { toast } from 'react-toastify';
import { Profile } from '../@types/global';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
    const { createProfileQuery } = useProfileMutations();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Profile>();

    const createProfile: SubmitHandler<Profile> = async (formData) => {
        try {
            const formDataWithFile = new FormData();
            formDataWithFile.append('dateOfBirth', formData.dateOfBirth);
            formDataWithFile.append('bio', formData.bio);
            formDataWithFile.append('avatar', formData.avatar[0]);
            await createProfileQuery.mutateAsync(formDataWithFile);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (createProfileQuery.isPending) {
            toast.loading('Creating Profile...');
        } else if (createProfileQuery.isSuccess) {
            toast.dismiss();
            toast.success('Profile Created Successfully');
        } else if (createProfileQuery.isError) {
            toast.dismiss();
            toast.error('Profile Creation Failed');
        }
    }, [createProfileQuery.isSuccess, createProfileQuery.isPending, createProfileQuery.isError]);
    if (createProfileQuery.isSuccess) {
        navigate('/');
    }
    return (
        <>
            <form onSubmit={handleSubmit(createProfile)}>
                <input
                    placeholder="Date of Birth"
                    type="date"
                    {...register('dateOfBirth', {
                        required: 'DOB is required',
                    })}
                />
                {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
                <br />
                <input
                    placeholder="Bio"
                    {...register('bio', {
                        required: 'Bio is required',
                        maxLength: 20,
                    })}
                />
                <br />
                {errors.bio && <span>{errors.bio.message}</span>}
                <input
                    placeholder="Avatar"
                    type="file"
                    accept="image/*"
                    {...register('avatar', {
                        required: 'Avatar is required',
                    })}
                />
                <br />
                {errors.avatar && <span>{errors.avatar.message}</span>}
                <button type="submit">Create Profile</button>
            </form>
        </>
    );
};

export default ProfileForm;
