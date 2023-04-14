import React, {useContext} from 'react';
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useUploads} from "@/lib/hooks/useUploads";
import ImagesGrid from "@/components/ImagesGrid";
import ImagesGridItem from "@/components/ImagesGridItem";
import UploadsRemover from "@/components/UploadsRemover";

type UploadGridItemProps = {
    src: string
    imageId: string
}

/**
 * UploadImagesGrid component renders an images grid for Upload page.
 */
function UploadImagesGrid() {
    const userId = useContext(UserIdContext)
    const {images, isLoading} = useUploads({limit: 100, sub_id: userId, order: "DESC", page: 0})

    const uploadItems = images && images.map(image =>
        <UploadGridItem key={image.id} src={image.url} imageId={image.id}/>)

    return (
        <ImagesGrid alertText={`No images uploaded yet`} isLoading={isLoading} items={uploadItems}/>
    );
}

/**
 * UploadGridItem component renders a piece of UploadImagesGrid.
 */
const UploadGridItem = ({src, imageId}: UploadGridItemProps) => {
    return (
        <UploadsRemover imageId={imageId}>
            <ImagesGridItem src={src}/>
        </UploadsRemover>
    )
}

export default UploadImagesGrid;