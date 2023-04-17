import React, {useContext} from 'react';
import Upload from 'rc-upload';
import useSWRMutation from "swr/mutation";
import {imageUploader} from "@/lib/fetchers/imageUploader";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {RcFile} from "rc-upload/es/interface";
import {Spinner, Text, useToast, VStack} from "@chakra-ui/react";
import {BeforeUploadFileType, UploadRequestOption} from "rc-upload/lib/interface";
import styles from './ImageUploader.module.css'
import {AiOutlineCloudUpload} from "react-icons/ai";
import {Icon} from "@chakra-ui/icons";
import {IUpload} from "@/types/IUpload";
import {IUploadResponse} from "@/types/IUploadResponse";
import {useUploadsMutator} from "@/lib/hooks/useUploadsMutator";

/**
 * FileUploader renders an area for uploading cats images using drag and drop.
 */
function ImageUploader() {
    const {
        trigger,
        isMutating
    } = useSWRMutation<IUploadResponse, any, string, FormData>('/api/upload', imageUploader)

    const toast = useToast()

    const userId = useContext(UserIdContext)
    const {addUploads} = useUploadsMutator()

    const customRequest = async ({
                                     file,
                                     onSuccess,
                                 }: UploadRequestOption) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("sub_id", userId)
        try {
            const response = await trigger(formData)
            // @ts-ignore
            onSuccess && onSuccess(response, file)
        } catch {

        }

        return {
            abort() {
                console.log('upload progress is aborted.');
            }
        }
    }

    const beforeUpload = (file: RcFile): BeforeUploadFileType | Promise<void | BeforeUploadFileType> => {
        return new Promise((resolve, reject) => {
            const fileExt = file.name.split('.').pop()
            if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg') {
                resolve(file);
            } else {
                toast({
                    title: 'Image upload error',
                    description: 'Wrong file extension selected!',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                reject()
            }
        })
    }

    const onSuccess = async (response: IUpload, file: RcFile) => {
        toast({
            title: 'Image uploaded',
            description: `Image "${file.name}" successfully uploaded!`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        await addUploads(response)
    }

    return (
        // @ts-ignore
        <Upload onSuccess={onSuccess}
                type={'drag'}
                accept={'.png, .jpg, .jpeg'}
                customRequest={customRequest}
                beforeUpload={beforeUpload}
                className={isMutating ? styles.uploaderDisabled + ' ' + styles.uploader : styles.uploader}
                disabled={isMutating}
        >
            <VStack h={'100%'} justifyContent={'center'}>
                {
                    !isMutating && <>
                        <Text fontSize='2xl'>
                            <Text as='b'>Drag here</Text> your file or <Text as='b'>Click here</Text> to upload
                        </Text>
                        <Icon as={AiOutlineCloudUpload} w={`100px`} h={`100px`} color='blue.300'/>
                    </>
                }

                {
                    isMutating && <>
                        <Text fontSize='2xl' mb={2}>Loading...</Text>
                        <Spinner color='blue.300' w={`50px`} h={`50px`}/>
                    </>
                }
            </VStack>
        </Upload>
    );
}

export default ImageUploader;