import React, {useContext, useState} from 'react';
import {Skeleton} from "@chakra-ui/react";
import ImagePreloader from "@/components/ImagePreloader";
import {UserIdContext} from "@/pages/_app";
import {delFetcher, postFetcher} from "@/lib/fetchers/fetchers";
import useSWRMutation from "swr/mutation";
import {useRandomImage} from "@/lib/hooks/useRandomImage";
import VotingImageCore from "@/components/VotingImageCore/VotingImageCore";
import {Arguments, useSWRConfig} from "swr"
import {IFavorites} from "@/types/IFavorites";
import {RANDOM_IMAGE_REQUEST_PARAMS} from "@/pages";

interface IFavoriteMutationArg {
    image_id: string
    sub_id: string
}

function VotingImage() {
    const {mutate} = useSWRConfig()
    const [isFavorite, setIsFavorite] = useState(false)
    const [favoriteImageId, setFavoriteImageId] = useState(-1)

    const {image} = useRandomImage(RANDOM_IMAGE_REQUEST_PARAMS)
    const userId = useContext(UserIdContext)

    //const [favImagesId, setFavImagesId] = useSessionStorage("catsFavImagesId", [] as string[])

    const {
        trigger: triggerAddFav,
        isMutating: isMutatingAddFav
    } = useSWRMutation<any, any, any, IFavoriteMutationArg>('/api/favourites', postFetcher)

    const {
        trigger: triggerRemoveFav,
        isMutating: isMutatingRemoveFav
    } = useSWRMutation(`/api/favourites/${favoriteImageId}`, delFetcher)

    const toggleFavorite = async () => {
        const matcher = (key: Arguments) => Array.isArray(key) && key[0] === '/api/favourites' && key[1].sub_id === userId && key[0].page === 0
        if (isFavorite) {
            try {
                await triggerRemoveFav()
                setFavoriteImageId(-1)
                setIsFavorite(false)

                await mutate(
                    key => matcher(key),
                    undefined,
                    {
                        populateCache: (_, currentData: IFavorites) => ({
                            ...currentData,
                            imagesCount: currentData.imagesCount ? currentData.imagesCount - 1 : 0,
                            images: currentData.images.filter(image => image.id !== favoriteImageId)
                        }),
                        revalidate: false
                    }
                )
            } catch {
            }
        } else {
            try {
                const res = await triggerAddFav({image_id: image!.id, sub_id: userId})
                setFavoriteImageId(res.id)
                setIsFavorite(true)

                await mutate(
                    key => matcher(key),
                    undefined,
                    {
                        populateCache: (_, currentData: IFavorites) => ({
                            ...currentData,
                            imagesCount: currentData.imagesCount ? currentData.imagesCount + 1 : 1,
                            images: [{
                                created_at: new Date().toISOString(),
                                id: res.id,
                                image:
                                    {
                                        id: image!.id,
                                        url: image!.url
                                    },
                                image_id: image!.id,
                                sub_id: userId,
                                user_id: ""
                            }, ...currentData.images]
                        }),
                        revalidate: false
                    }
                )

            } catch {
            }
        }
    }

    return (
        <>
            {image &&
                <ImagePreloader key={image.url} width={'500px'} height={'500px'}>
                    {
                        onLoadCb => <VotingImageCore src={image.url}
                                                     onLoadCb={onLoadCb}
                                                     isFavorite={isFavorite}
                                                     onClick={toggleFavorite}
                                                     isDisabled={isMutatingAddFav || isMutatingRemoveFav}
                        />
                    }
                </ImagePreloader>
            }
        </>
    );
}

export default VotingImage;
