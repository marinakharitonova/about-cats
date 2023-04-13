import React from 'react';
import {Icon} from "@chakra-ui/icons";
import {AiFillDelete} from "react-icons/ai";
import useSWRMutation from "swr/mutation";
import {deleter} from "@/lib/fetchers/deleter";
import ActionImage from "@/components/ActionImage/ActionImage";

type DeletingImageProps = {
    children: React.ReactNode,
    imageId: string
}

function DeletingImage({children, imageId}: DeletingImageProps) {

    const {
        trigger,
        isMutating
    } = useSWRMutation<string, any, string>(`/api/images/${imageId}`, deleter)

    const deleteImage = async () => {
        try {
            await trigger()
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

export default DeletingImage;