import {Link, LinkProps} from "@chakra-ui/next-js";
import {useRouter} from 'next/router'
import React from 'react'

interface NavLinkProps extends LinkProps {
    children?: string | React.ReactNode
    activeProps?: Omit<LinkProps, 'href'>
}

function NavLink({activeProps, children, ...props}: NavLinkProps) {
    const router = useRouter()
    const isActive = router.pathname === props.href

    const linkProps = isActive ? {...activeProps, ...props} : {...props}

    return (
        <Link {...linkProps}>
            {children}
        </Link>
    )
}

export default NavLink
