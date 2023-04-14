import React from 'react';
import Head from "next/head";
import {Box, Text} from "@chakra-ui/react";
import UploadImagesGrid from "@/components/UploadImagesGrid";
import ImageUploader from "@/components/ImageUploader/ImageUploader";

/**
 * Upload page renders an image upload area and a list of uploaded images.
 */
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
                <ImageUploader/>
            </Box>

            <Text fontSize='3xl' mb={3} fontWeight={700}>
                Images you uploaded
            </Text>

            <UploadImagesGrid/>
        </>
    );
}

export default Upload;