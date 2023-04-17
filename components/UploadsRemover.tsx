import React from 'react';
import {Icon} from "@chakra-ui/icons";
import {AiFillDelete} from "react-icons/ai";
import useSWRMutation from "swr/mutation";
import {deleter} from "@/lib/fetchers/deleter";
import ActionImage from "@/components/ActionImage/ActionImage";
import {useUploadsMutator} from "@/lib/hooks/useUploadsMutator";

type DeletingImageProps = {
    children: React.ReactNode,
    imageId: string
    onDelLastImage: () => void
    page: number
}

/**
 * UploadsRemover wraps an image in a container with functionality to remove the uploaded image.
 */
function UploadsRemover({children, imageId, onDelLastImage, page}: DeletingImageProps) {
    const {removeUploads} = useUploadsMutator()
    const {
        trigger,
        isMutating
    } = useSWRMutation<string, any, string>(`/api/images/${imageId}`, deleter)

    const deleteImage = async () => {
        try {
            onDelLastImage()
            await trigger()
            await removeUploads(page, imageId)
        } catch {

        }
    }

    const icon = <Icon as={AiFillDelete} w={`50px`} h={`50px`} color='gray.900'/>

    return (
        <ActionImage icon={icon} onClick={deleteImage} isDisabled={isMutating}>
            {children}
        </ActionImage>
    );
}

export default UploadsRemover;