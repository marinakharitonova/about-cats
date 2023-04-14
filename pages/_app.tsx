import type {AppProps} from 'next/app'
import {ChakraProvider, useToast} from '@chakra-ui/react'
import {SWRConfig} from "swr/_internal";
import Layout from "@/components/Layout";
import {makeId} from "@/lib/makeId";
import React, {useEffect} from "react";
import {useLocalStorage} from "@/lib/hooks/useLocalStorage";
import {FavoritesContext} from "@/lib/context/FavoritesContext";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {IFavorite} from "@/types/IFavorite";
import Loading from "@/components/Loading";

const newUserId = makeId(8)

export const IMAGES_LIMIT = 20
export const FAV_LIMIT = 100

/**
 * App component wraps nested components with ChakraProvider, Layout, UserIdContext SWRConfig with global error handler.
 */
export default function App({Component, pageProps}: AppProps) {
    const [userId, setUserId] = useLocalStorage("catsAppUserId", '');
    const [favorites, setFavorites] = useLocalStorage<IFavorite[] | null>("catsAppFavorites", null);

    useEffect(() => {
        if (!userId) {
            setUserId(newUserId)
        }
    })

    const toast = useToast()
    return (
        <ChakraProvider>
            <UserIdContext.Provider value={userId}>
                <FavoritesContext.Provider value={{favorites, setFavorites}}>
                    <SWRConfig value={{
                        onError: (error, key) => {
                            if (error.status !== 403 && error.status !== 404) {
                                toast({
                                    title: error.message,
                                    description: JSON.stringify(error?.response?.data),
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true,
                                })
                            }
                        },
                        keepPreviousData: true,
                        revalidateOnFocus: false
                    }}>
                        <Layout>
                            <Loading>
                                <Component {...pageProps} />
                            </Loading>
                        </Layout>
                    </SWRConfig>
                </FavoritesContext.Provider>
            </UserIdContext.Provider>
        </ChakraProvider>
    )
}
