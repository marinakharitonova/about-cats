import React from 'react';
import {Box, Button} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import Image from "next/image";
import styles from "./VotingImageCore.module.css"

type VotingImageCoreProps = {
    src: string
    onLoadCb: () => void
    isFavorite: boolean
    onClick: () => void
    isDisabled: boolean
}

function VotingImageCore({src, onLoadCb, isFavorite, onClick, isDisabled}: VotingImageCoreProps) {
    return (
        <Box className={styles.wrapper}>
            <Box bg={'gray.50'} className={styles.shadow}/>
            <Button leftIcon={
                isFavorite
                    ? <Icon as={AiFillHeart} w={100} h={100} color='red.500'/>
                    : <Icon as={AiOutlineHeart} w={100} h={100} color='red.500'/>}
                    variant='link'
                    className={styles.button}
                    onClick={onClick}
                    isDisabled={isDisabled}
            />
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
                onLoad={onLoadCb}
            />
        </Box>
    );
}

export default VotingImageCore;