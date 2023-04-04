import React from 'react';
import {Card, CardBody, CardFooter} from "@chakra-ui/card";
import Carousel from "@/components/Carousel/Carousel";
import {Badge, ButtonGroup, Divider, Heading, Link, Stack, Text} from "@chakra-ui/react";
import StarsRating from "@/components/StarsRating";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import {imagesFetcher, getFetcher} from "@/lib/fetchers/fetchers";
import {IBreed} from "@/types/IBreed";
import {IImage} from "@/types/Iimage";
import useSWR from "swr";
import {BREEDS_IMAGES_COUNT} from "@/pages/breeds";

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
    "hairless", "natural", "rare", "rex", "suppressed_tail", "short_legs", "hypoallergenic"
]

/**
 * The transformPropertyName function converts a property name such as "dog_friendly" to "Dog friendly".
 */
const transformPropertyName = (str: string) => {
    const strWithSpaces = str.replace(/_/g, " ")
    return strWithSpaces[0].toUpperCase() + strWithSpaces.slice(1)
}

/**
 * BreedCard components renders information about the breed of a cat:
 * images carousel, breed's name, description, characteristics, peculiarities, links to external resources.
 */
function BreedCard({breedId}: { breedId: string }) {
    const {
        data: breedInfo,
        isValidating: isBreedValidating,
    } = useSWR<IBreed>(`/api/breeds/${breedId}`, getFetcher)

    const {
        data: breedImages,
        isValidating: isBreedImagesValidating
    } = useSWR<IImage[]>(['/api/images', {
        breed_ids: breedId,
        limit: BREEDS_IMAGES_COUNT
    }], imagesFetcher)

    return (
        <Card>
            <CardBody>
                <Carousel cards={breedImages!.map(bi => bi.url)}/>
                <Stack mt='6' spacing='3' transition="0.3s ease"
                       opacity={isBreedValidating || isBreedImagesValidating ? '0.7' : '1'}>
                    <Stack direction='row'>
                        {breedPeculiarities.map(bp => {
                            if (breedInfo?.[bp]) {
                                return <Badge key={bp}>{transformPropertyName(bp)}</Badge>
                            }
                        })}
                    </Stack>
                    <Heading size='md'>{breedInfo?.name}</Heading>
                    <Text>
                        {breedInfo?.description}
                    </Text>
                    <Text>
                        Temperament: {breedInfo?.temperament}
                    </Text>
                    <Text>
                        Origin: {breedInfo?.origin}
                    </Text>
                    <Text>
                        Lifespan: {breedInfo?.life_span} years
                    </Text>
                    <Text>
                        Weight: {breedInfo?.weight.metric} kg
                    </Text>
                    {
                        breedCharacters.map(bc => <StarsRating key={bc}
                                                               count={breedInfo?.[bc] as number}
                                                               name={transformPropertyName(bc)}/>)
                    }
                </Stack>
            </CardBody>
            <Divider/>
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Link href={breedInfo?.cfa_url} isExternal>
                        CFA <ExternalLinkIcon mx='2px'/>
                    </Link>
                    <Link href={breedInfo?.vetstreet_url} isExternal>
                        vetSTREET <ExternalLinkIcon mx='2px'/>
                    </Link>
                    <Link href={breedInfo?.wikipedia_url} isExternal>
                        Wikipedia <ExternalLinkIcon mx='2px'/>
                    </Link>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default BreedCard;