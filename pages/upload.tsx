import React from 'react';
import Head from "next/head";
import FileUploader from "@/components/FileUploader/FileUploader";
import {Box, Text} from "@chakra-ui/react";
import ImagesPaginator from "@/components/ImagesPaginator";
import UploadImagesGrid from "@/components/UploadImagesGrid";

export const UPLOAD_IMAGES_LIMIT = 20

function Upload() {
    return (
        <>
            <Head>
                <title>Upload a cat image</title>
            </Head>

            <Text fontSize='3xl' mb={3} fontWeight={700}>
                Upload a cat image
            </Text>

            <Box mb={12}>
                <FileUploader/>
            </Box>

            <Text fontSize='3xl' mb={3} fontWeight={700}>
                Images you uploaded
            </Text>

            <UploadImagesGrid/>
        </>
    );
}

export default Upload;