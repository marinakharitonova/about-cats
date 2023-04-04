import Head from 'next/head'
import Image from 'next/image'
import {Button, Skeleton, Wrap} from "@chakra-ui/react";
import useSWRImmutable from 'swr/immutable'
import useSWRMutation from 'swr/mutation'
import {AiFillHeart, AiOutlineDislike, AiOutlineHeart, AiOutlineLike} from "react-icons/ai";
import {useState} from 'react';
import {IImage} from "@/types/Iimage";
import {delFetcher, getFetcher, imagesFetcher, postFetcher} from "@/lib/fetchers/fetchers";

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

    const {data, isLoading, mutate, isValidating} = useSWRImmutable<IImage[]>(['/api/images', {order: 'RANDOM'}], imagesFetcher)

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
        triggerVote({image_id: data![0].id, value})
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
                    {data && <Image
                        key={data[0].url}
                        src={data[0].url}
                        alt="Cat"
                        style={{objectFit: 'contain', height: '500px', opacity: isValidating ? '0.5' : '1'}}
                        width="500"
                        height="500"
                        priority={true}
                        onLoad={() => setIsImageLoaded(true)}
                    />}
                </Skeleton>
                <Wrap spacing='12px'>
                    <Button colorScheme='green' isLoading={isVoteBtnLoading} leftIcon={<AiOutlineLike/>}
                            onClick={() => vote(1)}>Love it</Button>
                    <Button colorScheme='red' isLoading={isVoteBtnLoading} leftIcon={<AiOutlineDislike/>}
                            onClick={() => vote(-1)}>Nope it</Button>
                    <Button colorScheme='teal'
                            isLoading={isFavBtnLoading}
                            leftIcon={isFav ? <AiFillHeart/> : <AiOutlineHeart/>}
                            onClick={() => toggleFavorite(data![0].id)}
                    >{isFav ? 'Remove from' : 'Add to'} favorites</Button>
                </Wrap>
            </Wrap>
        </>
    )
}
