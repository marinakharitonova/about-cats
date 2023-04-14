import {mutate} from "swr";
import {IUploads} from "@/types/IUploads";
import {IMAGES_LIMIT} from "@/pages/_app";
import {useContext} from "react";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {IUpload} from "@/types/IUpload";

export const useUploadsMutator = () => {
    const userId = useContext(UserIdContext)

    const addUploads = async (image: IUpload) => {
        await mutate(key => Array.isArray(key) && key[0] === '/api/uploads' && key[1].sub_id === userId && key[1].page === 0,
            undefined,
            {
                populateCache: (_, currentData: IUploads) => {
                    const newImage = {
                        breed_ids: null,
                        breeds: [],
                        created_at: new Date().toISOString(),
                        height: image.height,
                        id: image.id,
                        original_filename: image.original_filename,
                        sub_id: userId,
                        url: image.url,
                        width: image.width
                    }
                    return {
                        ...currentData,
                        imagesCount: currentData.imagesCount ? currentData.imagesCount + 1 : 1,
                        images: currentData.imagesCount && currentData.imagesCount >= IMAGES_LIMIT
                            ? [newImage, ...currentData.images.slice(0, -1)]
                            : [newImage, ...currentData.images]
                    }
                },
                revalidate: false
            }
        )
        await mutate(key => Array.isArray(key) && key[0] === '/api/uploads' && key[1].sub_id === userId && key[1].page !== 0,
            undefined,
            {revalidate: true}
        )
    }

    const removeUploads = async (page: number, imageId: string) => {
        await mutate(key => Array.isArray(key) && key[0] === '/api/uploads' && key[1].sub_id === userId && key[1].page === page,
            undefined,
            {
                populateCache: (_, currentData: IUploads) => ({
                    ...currentData,
                    imagesCount: currentData?.imagesCount ? currentData.imagesCount - 1 : 0,
                    images: currentData.images.filter(image => image.id !== imageId)
                }),
                revalidate: true
            })

        await mutate(key => Array.isArray(key) && key[0] === '/api/uploads' && key[1].sub_id === userId && key[1].page > page,
            undefined,
            {revalidate: true}
        )
    }


    return {addUploads, removeUploads}
}