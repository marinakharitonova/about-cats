import React, {useContext} from 'react';
import {Icon} from "@chakra-ui/icons";
import {AiFillDelete} from "react-icons/ai";
import useSWRMutation from "swr/mutation";
import {deleter} from "@/lib/fetchers/deleter";
import ActionImage from "@/components/ActionImage/ActionImage";
import {mutate} from "swr";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {IUploads} from "@/types/IUploads";

type DeletingImageProps = {
    children: React.ReactNode,
    imageId: string
    onDelLastImage: () => void
}

/**
 * UploadsRemover wraps an image in a container with functionality to remove the uploaded image.
 */
function UploadsRemover({children, imageId, onDelLastImage}: DeletingImageProps) {
    const userId = useContext(UserIdContext)

    const {
        trigger,
        isMutating
    } = useSWRMutation<string, any, string>(`/api/images/${imageId}`, deleter)

    const deleteImage = async () => {
        try {
            await trigger()
            onDelLastImage()
            await mutate((key) => Array.isArray(key) && key[0] === '/api/uploads' && key[1].sub_id === userId,
                undefined,
                {
                    populateCache: (_, currentData: IUploads) => ({
                        ...currentData,
                        imagesCount: currentData?.imagesCount ? currentData.imagesCount - 1 : 0,
                        images: currentData.images.filter(image => image.id !== imageId)
                    }),
                    revalidate: true
                }
            )
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