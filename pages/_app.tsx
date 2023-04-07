import type {AppProps} from 'next/app'
import {ChakraProvider, useToast} from '@chakra-ui/react'
import {SWRConfig} from "swr/_internal";
import Layout from "@/components/Layout";
import {makeId} from "@/lib/makeId";
import {createContext, useEffect} from "react";
import {useSessionStorage} from "@/lib/hooks/useSessionStorage";

const newUserId = makeId(8)
export const UserIdContext = createContext(newUserId)

/**
 * App component wraps nested components with ChakraProvider, Layout, UserIdContext SWRConfig with global error handler.
 */
export default function App({Component, pageProps}: AppProps) {
    const [userId, setUserId] = useSessionStorage("catsAppUserId", '');
    useEffect(() => {
        if (!userId) {
            setUserId(newUserId)
        }
    })
    const toast = useToast()
    return (
        <ChakraProvider>
            <UserIdContext.Provider value={userId}>
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
                    },
                    keepPreviousData: true
                }}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </UserIdContext.Provider>
        </ChakraProvider>
    )
}
