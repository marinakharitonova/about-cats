import React, {useContext, useEffect, useState} from 'react';
import {Box, Button} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import styles from "./FavoritingImage.module.css"
import {useFavorites} from "@/lib/hooks/useFavorites";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {Arguments} from "swr";
import useSWRMutation from "swr/mutation";
import {delFetcher, postFetcher} from "@/lib/fetchers/fetchers";

interface IFavoriteMutationArg {
    image_id: string
    sub_id: string
}

type FavoringImageProps = {
    children: React.ReactNode,
    imageId: string
}

function FavoringImage({children, imageId}: FavoringImageProps) {
    const userId = useContext(UserIdContext)
    const {favorites, isFavoritesLoading} = useFavorites({order: 'DESC', sub_id: userId})

    const [isFavorite, setIsFavorite] = useState(false)
    const [removeId, setRemoveId] = useState(-1)

    useEffect(() => {
        const favoriteImage = favorites?.images.filter(favorite => favorite.image_id === imageId)[0]
        if (favoriteImage){
            setIsFavorite(favoriteImage.image_id === imageId)
            setRemoveId(favoriteImage.id)
        }
    }, [favorites?.images, imageId])

    const {
        trigger: triggerAddFav,
        isMutating: isMutatingAddFav
    } = useSWRMutation<any, any, any, IFavoriteMutationArg>('/api/favourites', postFetcher)

    const {
        trigger: triggerRemoveFav,
        isMutating: isMutatingRemoveFav
    } = useSWRMutation(`/api/favourites/${removeId}`, delFetcher)

    const toggleFavorite = async () => {
        const matcher = (key: Arguments) => Array.isArray(key) && key[0] === '/api/favourites' && key[1].sub_id === userId && key[0].page === 0
        if (isFavorite) {
            try {
                await triggerRemoveFav()
                setRemoveId(-1)
                setIsFavorite(false)

                // await mutate(
                //     key => matcher(key),
                //     undefined,
                //     {
                //         populateCache: (_, currentData: IFavorites) => ({
                //             ...currentData,
                //             imagesCount: currentData.imagesCount ? currentData.imagesCount - 1 : 0,
                //             images: currentData.images.filter(image => image.id !== favoriteImageId)
                //         }),
                //         revalidate: false
                //     }
                // )
            } catch {
            }
        } else {
            try {
                const res = await triggerAddFav({image_id: imageId, sub_id: userId})
                setRemoveId(res.id)
                setIsFavorite(true)

                // await mutate(
                //     key => matcher(key),
                //     undefined,
                //     {
                //         populateCache: (_, currentData: IFavorites) => ({
                //             ...currentData,
                //             imagesCount: currentData.imagesCount ? currentData.imagesCount + 1 : 1,
                //             images: [{
                //                 created_at: new Date().toISOString(),
                //                 id: res.id,
                //                 image:
                //                     {
                //                         id: image!.id,
                //                         url: image!.url
                //                     },
                //                 image_id: image!.id,
                //                 sub_id: userId,
                //                 user_id: ""
                //             }, ...currentData.images]
                //         }),
                //         revalidate: false
                //     }
                // )

            } catch {
            }
        }
    }

    return (
        <Box className={styles.wrapper}>
            <Box bg={'gray.50'} className={styles.shadow}/>
            <Button leftIcon={
                isFavorite
                    ? <Icon as={AiFillHeart} w={100} h={100} color='red.500'/>
                    : <Icon as={AiOutlineHeart} w={100} h={100} color='red.500'/>}
                    variant='link'
                    className={styles.button}
                    onClick={toggleFavorite}
                    isDisabled={isMutatingAddFav || isMutatingRemoveFav}
            />
            {children}
        </Box>
    );
}

export default FavoringImage;