import React, {useContext, useEffect, useState} from 'react';
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useUploads} from "@/lib/hooks/useUploads";
import ImagesGrid from "@/components/ImagesGrid";
import ImagesGridItem from "@/components/ImagesGridItem";
import UploadsRemover from "@/components/UploadsRemover";
import {FAV_UPLOADS_LIMIT} from "@/pages/_app";
import styles from './Pagination/Pagination.module.css'

import ReactPaginate from 'react-paginate';
import {GrFormNextLink, GrFormPreviousLink} from "react-icons/gr";
import {Box, Grid, VStack} from "@chakra-ui/react";
import {number} from "prop-types";

type UploadGridItemProps = {
    src: string
    imageId: string
}

/**
 * UploadImagesGrid component renders an images grid for Upload page.
 */
function UploadImagesGrid() {
    const userId = useContext(UserIdContext)

    const [page, setPage] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const {images, isLoading, imagesCount} = useUploads({limit: FAV_UPLOADS_LIMIT, sub_id: userId, order: "DESC", page})

    useEffect(() => {
        if (!imagesCount) return
        const newNumberOfPages = Math.ceil(imagesCount / FAV_UPLOADS_LIMIT)
        if (newNumberOfPages === numberOfPages) return;
        setNumberOfPages(newNumberOfPages)
    }, [imagesCount, numberOfPages])

    const handlePageClick = (event: { selected: number }) => {
        setPage(event.selected)
    };

    const onDelLastImage = () => {
        const isLastPage = page === numberOfPages - 1
        const isLastImageOnPage = images && images.length === 1

        if (isLastImageOnPage && isLastPage) {
            if (page - 1 >= 0) setPage(page - 1)
        }
    }

    const uploadItems = images && images.map(image =>
        <UploadsRemover key={image.id} imageId={image.id} onDelLastImage={onDelLastImage}>
            <ImagesGridItem src={image.url}/>
        </UploadsRemover>)

    return (
        <>
            <Box>
                <VStack spacing={6} minH={'752px'} mb={6}>
                    <ImagesGrid alertText={`No images uploaded yet`} isLoading={isLoading} items={uploadItems}/>
                </VStack>
                {
                    images && images.length > 0 &&
                    <ReactPaginate
                        forcePage={page}
                        nextLabel={<GrFormNextLink/>}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={numberOfPages}
                        previousLabel={<GrFormPreviousLink/>}
                        renderOnZeroPageCount={null}
                        pageClassName={styles.item}
                        pageLinkClassName={styles.link}
                        previousClassName={styles.item}
                        previousLinkClassName={styles.link}
                        nextClassName={styles.item}
                        nextLinkClassName={styles.link}
                        breakClassName={styles.item}
                        breakLinkClassName={styles.link}
                        containerClassName={styles.pagination}
                        activeClassName={styles.active}
                        disabledClassName={styles.disabledItem}
                        disabledLinkClassName={styles.disablesLink}
                    />
                }
            </Box>
        </>
    )
}

export default UploadImagesGrid;