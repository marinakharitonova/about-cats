import React, {useContext} from 'react';
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useUploads} from "@/lib/hooks/useUploads";
import ImagesGrid from "@/components/ImagesGrid";
import {UPLOAD_IMAGES_LIMIT} from "@/pages/upload";
import {canLoadMore} from "@/lib/canLoadMore";
import {FAV_IMAGES_LIMIT} from "@/pages/favorites";
import DeletingImage from "@/components/DeletingImage";

type UploadImagesGridProps = {
    page: number
    successCb: (canLoadMore: boolean) => void
}

/**
 * UploadImagesGrid component renders an images grid for Upload page.
 */
function UploadImagesGrid({page, successCb}: UploadImagesGridProps) {
    const userId = useContext(UserIdContext)
    const {images, isLoading} = useUploads({limit: UPLOAD_IMAGES_LIMIT, sub_id: userId, order: "DESC", page},
        {onSuccess: data => successCb(canLoadMore(FAV_IMAGES_LIMIT, page, data.imagesCount))})

    return (
        <ImagesGrid images={images} alertText={`No images uploaded yet`} isLoading={isLoading}>
            {
                (children, imageId) => <DeletingImage key={imageId} imageId={imageId}>
                    {children}
                </DeletingImage>
            }
        </ImagesGrid>
    );
}

export default UploadImagesGrid;