import type {AppProps} from 'next/app'
import {ChakraProvider, useToast} from '@chakra-ui/react'
import {SWRConfig} from "swr/_internal";
import Layout from "@/components/Layout";

/**
 * App component wraps nested components with ChakraProvider, Layout, SWRConfig with global error handler.
 */
export default function App({Component, pageProps}: AppProps) {
    const toast = useToast()
    return (
        <ChakraProvider>
            <SWRConfig value={{
                onError: (error, key) => {
                    if (error.status !== 403 && error.status !== 404) {
                        toast({
                            title: error.message,
                            description: JSON.stringify(error.response.data),
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                }
            }}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SWRConfig>
        </ChakraProvider>
    )
}
