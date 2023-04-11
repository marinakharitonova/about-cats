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
