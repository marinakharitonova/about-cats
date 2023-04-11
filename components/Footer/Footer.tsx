import React from 'react';
import {Box, Container, Link} from "@chakra-ui/react";
import {AiFillGithub} from "react-icons/ai";
import { Text } from '@chakra-ui/react';

function Footer() {
    return (
        <footer style={{marginTop: 'auto'}}>
            <Box bg='gray.50' paddingY={4}>
                <Container maxW='5xl'>
                    <Link href={'https://github.com/marinakharitonova'} isExternal display={'flex'} alignItems={'center'}
                          _hover={{textDecoration: 'none'}} color={'blue.400'}>
                        <AiFillGithub/> <Text ml={'5px'}>marinakharitonova</Text>
                    </Link>
                    <Text color={'blue.400'}>2023</Text>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer;