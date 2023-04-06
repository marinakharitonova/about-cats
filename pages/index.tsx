import Head from 'next/head'
import Image from 'next/image'
import {Button, Skeleton, Wrap} from "@chakra-ui/react";
import useSWRImmutable from 'swr/immutable'
import useSWRMutation from 'swr/mutation'
import {AiFillHeart, AiOutlineDislike, AiOutlineHeart, AiOutlineLike} from "react-icons/ai";
import {useState} from 'react';
import {IImage} from "@/types/Iimage";
import {delFetcher, getFetcher, imagesFetcher, postFetcher} from "@/lib/fetchers/fetchers";
import ImagePreloader from "@/components/ImagePreloader";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {IImages} from "@/types/IImages";

interface IVoteMutationArg {
    image_id: string
    sub_id?: string
    value: number
}

interface IFavoriteMutationArg {
    image_id: string
    sub_id?: string
}

/**
 * Home page renders a random cat image and a group of buttons to interact with the image:
 * vote (up and down)
 * add/remove to favorites
 */
export default function Home() {
    const [favImageId, setFavImageId] = useState(-1)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [isFav, setIsFav] = useState(false)

    const params:IImagesRequestParams = {order: 'RANDOM'}

    const {
        data,
        isLoading,
        mutate,
    } = useSWRImmutable<IImages>(['/api/images', params], imagesFetcher)

    const {
        trigger: triggerVote,
        isMutating: isMutatingVote
    } = useSWRMutation<any, any, any, IVoteMutationArg>('/api/votes', postFetcher)

    const {
        trigger: triggerAddFav,
        isMutating: isMutatingAddFav
    } = useSWRMutation<any, any, any, IFavoriteMutationArg>('/api/favourites', postFetcher)

    const {
        trigger: triggerRemoveFav,
        isMutating: isMutatingRemoveFav
    } = useSWRMutation(`/api/favourites/${favImageId}`, delFetcher)

    const vote = (value: number) => {
        setIsImageLoaded(false)
        triggerVote({image_id: data!.images[0].id, value})
            .then(() => mutate())
            .catch(() => setIsImageLoaded(true))
    }

    const toggleFavorite = (imageId: string) => {
        if (isFav) {
            triggerRemoveFav().then(() => {
                setFavImageId(-1)
                setIsFav(false)
            })
        } else {
            triggerAddFav({image_id: imageId}).then(r => {
                setFavImageId(r.id)
                setIsFav(true)
            })
        }
    }

    const isVoteBtnLoading = isMutatingVote || !isImageLoaded
    const isFavBtnLoading = !isImageLoaded || isMutatingAddFav || isMutatingRemoveFav

    return (
        <>
            <Head>
                <title>Vote for the most cutest cat!</title>
            </Head>

            <Wrap spacing='12px' direction='column'>
                <Skeleton isLoaded={!isLoading} w="500px" h="500px">
                    {data &&
                        <ImagePreloader key={data.images[0].url} width={'500px'} height={'500px'}
                                        render={onLoadingCb =>
                                            <ImageWrapper src={data.images[0].url}
                                                          onLoadingCb={() => {
                                                              onLoadingCb()
                                                              setIsImageLoaded(true)
                                                          }
                                            }/>
                                        }/>
                    }
                </Skeleton>
                <Wrap spacing='12px'>
                    <Button colorScheme='green' isLoading={isVoteBtnLoading} leftIcon={<AiOutlineLike/>}
                            onClick={() => vote(1)}>Love it</Button>
                    <Button colorScheme='red' isLoading={isVoteBtnLoading} leftIcon={<AiOutlineDislike/>}
                            onClick={() => vote(-1)}>Nope it</Button>
                    <Button colorScheme='teal'
                            isLoading={isFavBtnLoading}
                            leftIcon={isFav ? <AiFillHeart/> : <AiOutlineHeart/>}
                            onClick={() => toggleFavorite(data!.images[0].id)}
                    >{isFav ? 'Remove from' : 'Add to'} favorites</Button>
                </Wrap>
            </Wrap>
        </>
    )
}

type ImageWrapperProps = {
    src: string
    onLoadingCb: () => void
}

const ImageWrapper = ({src, onLoadingCb}: ImageWrapperProps) => {
    return (
        <Image
            src={src}
            alt="Cat"
            style={{
                objectFit: 'cover',
                height: '500px',
            }}
            width="500"
            height="500"
            priority={true}
            onLoad={onLoadingCb}
        />
    )

}
