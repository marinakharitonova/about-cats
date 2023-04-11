import React from 'react';
import {Box, Button, Container, Flex, Link} from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import {AiFillGithub} from "react-icons/all";
import Footer from "@/components/Footer/Footer";

type LayoutProps = {
    children: React.ReactNode
}

/**
 * Layout component renders the application's main layout: header, main section, footer
 */
function Layout({children}: LayoutProps) {
    return (
        <Flex minH='100vh' flexDirection='column'>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header>
                <Box bg='gray.50' paddingY={6}>
                    <Container maxW='5xl'>
                        <Navbar/>
                    </Container>
                </Box>
            </header>
            <main>
                <Box>
                    <Container maxW='5xl' paddingY={6}>
                        {children}
                    </Container>
                </Box>
            </main>
            <Footer/>
        </Flex>
    );
}

export default Layout;