import React from 'react';
import {Box, Container, Flex} from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";

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
            <footer style={{marginTop: 'auto'}}>
                <Box bg='gray.50' paddingY={4}>
                    <Container maxW='5xl'>
                        footer
                    </Container>
                </Box>
            </footer>
        </Flex>
    );
}

export default Layout;