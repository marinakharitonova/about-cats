import React from 'react';
import {HStack} from "@chakra-ui/react";
import NavLink from "@/components/NavLink";
import {Link} from "@chakra-ui/next-js";

const linksNames = [
    {
        url: '',
        name: 'Vote'
    }, {
        url: 'breeds',
        name: 'Breeds'
    }, {
        url: 'images',
        name: 'Images'
    },
    {
        url: 'favorites',
        name: 'Favorites'
    },
]

/**
 * Navbar component renders the application's navigation links
 */
function Navbar() {
    return (
        <HStack spacing='24px'>
            {linksNames.map(linkName =>
                <Link key={linkName.name} href={'/' + linkName.url} color='blue.400' _hover={{color: 'blue.500'}}
                         >{linkName.name}</Link>)}
        </HStack>
    );
}

export default Navbar;