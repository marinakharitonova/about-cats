import React, {useContext} from 'react';
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useUploads} from "@/lib/hooks/useUploads";
import ImagesGrid from "@/components/ImagesGrid";
import {UPLOAD_IMAGES_LIMIT} from "@/pages/upload";
import DeletingImage from "@/components/DeletingImage";
import ImagesGridItem from "@/components/ImagesGridItem";

type UploadImagesGridProps = {
    page: number
    successCb: (canLoadMore: boolean) => void
}

type UploadGridItemProps = {
    src: string
    imageId: string
}

/**
 * UploadImagesGrid component renders an images grid for Upload page.
 */
function UploadImagesGrid() {
    const userId = useContext(UserIdContext)
    const {images, isLoading} = useUploads({limit: UPLOAD_IMAGES_LIMIT, sub_id: userId, order: "DESC", page: 0})

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
        <DeletingImage imageId={imageId}>
            <ImagesGridItem src={src}/>
        </DeletingImage>
    )
}

export default UploadImagesGrid;