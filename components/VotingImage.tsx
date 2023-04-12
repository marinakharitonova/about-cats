import React from 'react';
import ImagePreloader from "@/components/ImagePreloader";
import {useRandomImage} from "@/lib/hooks/useRandomImage";
import {RANDOM_IMAGE_REQUEST_PARAMS} from "@/pages";
import Image from "next/image";
import FavoringImage from "@/components/FavoringImage/FavoringImage";

function VotingImage() {
    const {image} = useRandomImage(RANDOM_IMAGE_REQUEST_PARAMS)

    return (
        <>
            {image &&
                <ImagePreloader key={image.url} width={'500px'} height={'500px'}>
                    {
                        onLoadCb => <FavoringImage imageId={image.id} size={100} src={image.url}>
                            <Image
                                src={image.url}
                                alt="Cat"
                                style={{
                                    objectFit: 'cover',
                                    height: '500px',
                                }}
                                width="500"
                                height="500"
                                priority={true}
                                onLoad={onLoadCb}
                            />
                        </FavoringImage>
                    }
                </ImagePreloader>
            }
        </>
    );
}

export default VotingImage;