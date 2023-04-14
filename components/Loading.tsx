import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {Skeleton} from "@chakra-ui/react";

type LoadingProps = {
    children: React.ReactNode,
}

/**
 * Loading renders a loader for the Vote page until it is loaded from the server.
 */
function Loading({children}: LoadingProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const handleStart = (url: string) => {
            if (url === '/'){
                setLoading(true)
            }
        }
        const handleComplete = (url: string) => {
            if (url === '/'){
                setLoading(false)
            }
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    return <>
        {loading ? <Skeleton w={'500px'} h={'500px'}/> : children}
    </>
}

export default Loading