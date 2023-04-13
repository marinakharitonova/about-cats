import React, {useContext} from 'react';
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useUploads} from "@/lib/hooks/useUploads";
import ImagesGrid from "@/components/ImagesGrid";
import {UPLOAD_IMAGES_LIMIT} from "@/pages/upload";
import {canLoadMore} from "@/lib/canLoadMore";
import {FAV_IMAGES_LIMIT} from "@/pages/favorites";

type UploadImagesGridProps = {
    page: number
    successCb: (canLoadMore: boolean) => void
}

function UploadImagesGrid({page, successCb}: UploadImagesGridProps) {
    const userId = useContext(UserIdContext)
    const {images} = useUploads({limit: UPLOAD_IMAGES_LIMIT, sub_id: userId, order: "DESC", page},
        {onSuccess: data => successCb(canLoadMore(FAV_IMAGES_LIMIT, page, data.imagesCount))})

    return (
        <ImagesGrid images={images} alertText={`No images uploaded yet`}/>
    );
}

export default UploadImagesGrid;