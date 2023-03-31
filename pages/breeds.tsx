import React from 'react';
import Head from "next/head";
import {loadBreed, loadBreedImages} from "@/lib/loadBreed";
import {IBreed} from "@/types/IBreed";
import {Card, CardBody, CardFooter} from "@chakra-ui/card";
import {Badge, ButtonGroup, Divider, Heading, Link, Stack, Text} from "@chakra-ui/react";
import {ExternalLinkIcon} from '@chakra-ui/icons'
import StarsRating from "@/components/StarsRating";
import {IImage} from "@/types/Iimage";
import Carousel from "@/components/Carousel/Carousel";

type BreedsProps = {
    breed: IBreed
    breedImages: IImage[]
}

const breedCharacters: (keyof IBreed)[] = [
    "adaptability",
    "affection_level",
    "child_friendly",
    "dog_friendly",
    "energy_level",
    "grooming",
    "health_issues",
    "intelligence",
    "shedding_level",
    "social_needs",
    "stranger_friendly",
    "vocalisation",
]

const breedPeculiarities: (keyof IBreed)[] = [
    "hairless", "natural", "rare", "rex", "suppressed_tail", "short_legs"
]

/**
 * The transformPropertyName function converts a property name such as "dog_friendly" to "Dog friendly".
 */
const transformPropertyName = (str: string) => {
    const strWithSpaces = str.replace(/_/g, " ")
    return strWithSpaces[0].toUpperCase() + strWithSpaces.slice(1)
}

function Breeds({breed, breedImages}: BreedsProps) {
    console.log(breedImages);
    return (
        <>
            <Head>
                <title>Breeds</title>
            </Head>

            <Card maxW='2xl'>
                <CardBody>
                    <Carousel cards={breedImages.map(bi => bi.url)}/>
                    <Stack mt='6' spacing='3'>
                        <Stack direction='row'>
                            {breedPeculiarities.map(bp => {
                                if (breed[bp]) {
                                    return <Badge key={bp}>{transformPropertyName(bp)}</Badge>
                                }
                            })}
                        </Stack>
                        <Heading size='md'>{breed.name}</Heading>
                        <Text>
                            {breed.description}
                        </Text>
                        <Text>
                            Temperament: {breed.temperament}
                        </Text>
                        <Text>
                            Origin: {breed.origin}
                        </Text>
                        <Text>
                            Lifespan: {breed.life_span} years
                        </Text>
                        <Text>
                            Weight: {breed.weight.metric} kg
                        </Text>
                        {
                            breedCharacters.map(bc => <StarsRating key={bc}
                                                                   count={breed[bc] as number}
                                                                   name={transformPropertyName(bc)}/>)
                        }
                    </Stack>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Link href={breed.cfa_url} isExternal>
                            CFA <ExternalLinkIcon mx='2px'/>
                        </Link>
                        <Link href={breed.vetstreet_url} isExternal>
                            vetSTREET <ExternalLinkIcon mx='2px'/>
                        </Link>
                        <Link href={breed.wikipedia_url} isExternal>
                            Wikipedia <ExternalLinkIcon mx='2px'/>
                        </Link>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    );
}

export async function getStaticProps() {
    const breed = await loadBreed()
    const breedImages = await loadBreedImages()
    return {props: {breed, breedImages}}
}

export default Breeds;