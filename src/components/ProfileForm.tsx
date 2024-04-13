import { useForm, SubmitHandler } from 'react-hook-form';
import { useProfileMutations } from '../hooks/profileMutations/useProfileMutations';
import { Profile } from '../@types/global';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import userPicture from '../assets/user.png';
const ProfileForm = () => {
    const { createProfileQuery } = useProfileMutations();
    const [selectedImage, setSelectedImage] = useState<string>();
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

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const imageUrl = URL.createObjectURL(e.target.files![0]);
        setSelectedImage(imageUrl);
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
            {selectedImage ? <img src={selectedImage} width={100} /> : <img src={userPicture} width={100} />}
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
                    onChange={handleImageSelect}
                />
                <br />
                {errors.avatar && <span>{errors.avatar.message}</span>}
                <button type="submit">Create Profile</button>
            </form>
        </>
    );
};

export default ProfileForm;
