import { useQuery } from '@tanstack/react-query';
import { LinkType } from '../@types/global';
import { useLinkMutations } from '../hooks/linkMutations/useLinkMutations';
import { useLinkContext } from '../hooks/useLinkContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getSingleLink } from '../services/ApiServices';
import AuthDetails from '../libs/AuthDetails';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const LinkForm = () => {
    const { setSelectedLinkId, selectedLinkId } = useLinkContext();
    const { token } = AuthDetails();
    const { createLinkMutation, updateLinkMutation } = useLinkMutations();
    const { data } = useQuery({
        queryKey: ['links', selectedLinkId],
        queryFn: () => getSingleLink(selectedLinkId!, token!),
        enabled: !!selectedLinkId,
    });
    console.log('selected link', data);
    const linkData = data?.data;
    console.log(linkData);
    console.log('Selected Link ID', selectedLinkId);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<LinkType>();

    const createLink: SubmitHandler<LinkType> = async (formData) => {
        try {
            await createLinkMutation.mutateAsync(formData);
            toast.success('Link created successfully');
            reset();
        } catch (error) {
            toast.error('Failed to create link');
        }
    };

    const updateLink: SubmitHandler<LinkType> = async (formData) => {
        try {
            await updateLinkMutation.mutateAsync({ link: formData, linkId: selectedLinkId! });
            toast.success('Link updated successfully');
            reset();
            setSelectedLinkId(null);
        } catch (error) {
            toast.error('Failed to update link');
        }
    };

    useEffect(() => {
        if (linkData) {
            setValue('title', linkData?.title);
            setValue('url', linkData?.url);
        }
    }, [linkData, setValue]);

    return (
        <div>
            <form onSubmit={handleSubmit(selectedLinkId ? updateLink : createLink)}>
                <input
                    type="text"
                    placeholder="Add your Title here"
                    {...register('title', {
                        required: !selectedLinkId ? 'Title is required' : false,
                    })}
                />
                <br />
                {errors.title && <span>{errors.title.message}</span>}
                <input
                    type="text"
                    placeholder="Add your URL here"
                    {...register('url', {
                        required: !selectedLinkId ? 'URL is required' : false,
                        pattern: {
                            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i,
                            message: 'Invalid URL',
                        },
                    })}
                />
                <br />
                {errors.url && <span>{errors.url.message}</span>}
                <button type="submit">{selectedLinkId ? 'Update Link' : 'Add Link'}</button>
            </form>
        </div>
    );
};

export default LinkForm;
