import React from 'react';
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {HStack, Text, VStack} from "@chakra-ui/react";

const STARS_COUNT = 5

/**
 * StarsRating component renders 5 stars icons with the given number of filled stars and a character name
 */
function StarsRating({count, name}: { count: number, name: string }) {
    const starsIcons = []
    for (let i = 0; i < STARS_COUNT; i++) {
        starsIcons.push(i < count ? <AiFillStar key={name + i}/> : <AiOutlineStar key={name + i}/>)
    }
    return (
        <VStack align='column'>
            <Text>{name}</Text>
            <HStack >{starsIcons}</HStack >
        </VStack>
    );
}

export default StarsRating;