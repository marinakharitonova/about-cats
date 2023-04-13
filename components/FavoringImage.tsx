import React, {useContext} from 'react';
import {Icon} from "@chakra-ui/icons";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {Arguments, mutate} from "swr";
import useSWRMutation from "swr/mutation";
import {delFetcher, postFetcher} from "@/lib/fetchers/fetchers";
import {IFavorites} from "@/types/IFavorites";
import {useFavoriteState} from "@/lib/hooks/useFavoriteState";
import ActionImage from "@/components/ActionImage/ActionImage";

interface IFavoriteMutationArg {
    image_id: string
    sub_id: string
}

type FavoringImageProps = {
    children: React.ReactNode,
    imageId: string
    src: string
    size: number
    removingId?: number
}

function FavoringImage({children, imageId, src, size, removingId}: FavoringImageProps) {
    const userId = useContext(UserIdContext)
    const {
        isFavorite,
        removingId: localRemovingId,
        setIsFavorite,
        setRemovingId,
        isFavoritesLoading
    } = useFavoriteState(imageId, removingId)

    const {
        trigger: triggerAddFav,
        isMutating: isMutatingAddFav
    } = useSWRMutation<any, any, any, IFavoriteMutationArg>('/api/favourites', postFetcher)

    const {
        trigger: triggerRemoveFav,
        isMutating: isMutatingRemoveFav
    } = useSWRMutation(`/api/favourites/${localRemovingId}`, delFetcher)

    const toggleFavorite = async () => {
        const matcher = (key: Arguments) => Array.isArray(key) && key[0] === '/api/favourites' && key[1].sub_id === userId
        if (isFavorite) {
            try {
                await triggerRemoveFav()
                setRemovingId(-1)
                setIsFavorite(false)

                await mutate(
                    key => matcher(key),
                    undefined,
                    {
                        populateCache: (_, currentData: IFavorites) => ({
                            ...currentData,
                            imagesCount: currentData.imagesCount ? currentData.imagesCount - 1 : 0,
                            images: currentData.images.filter(image => image.image_id !== imageId)
                        }),
                        revalidate: false
                    }
                )
            } catch {
            }
        } else {
            try {
                const res = await triggerAddFav({image_id: imageId, sub_id: userId})
                setRemovingId(res.id)
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
                                        id: imageId,
                                        url: src
                                    },
                                image_id: imageId,
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

    const icon = isFavorite
                 ? <Icon as={AiFillHeart} w={`${size}px`} h={`${size}px`} color='red.500'/>
                 : <Icon as={AiOutlineHeart} w={`${size}px`} h={`${size}px`} color='red.500'/>

    const isDisabled = isMutatingAddFav || isMutatingRemoveFav || isFavoritesLoading

    return (
        <ActionImage icon={icon} isDisabled={isDisabled} onClick={toggleFavorite}>
            {children}
        </ActionImage>
    );
}

export default FavoringImage;