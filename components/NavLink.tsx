import {Link, LinkProps} from "@chakra-ui/next-js";
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'

interface NavLinkProps extends LinkProps {
    children?: string | React.ReactNode
    activeProps?: Omit<LinkProps, 'href'>
}

function NavLink({activeProps, children, ...props}: NavLinkProps) {
    const router = useRouter()
    const isActive = router.pathname === props.href

    //const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const handleStart = (url: string) => {
            console.log(router);
            setLoading(true);
        }
        const handleComplete = (url: string) => setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    if (isActive) {
        return (
            <Link {...props} {...activeProps}>
                {children}
            </Link>
        )
    }

    return (
        <Link {...props}>
            {children}
        </Link>
    )
}

export default NavLink
