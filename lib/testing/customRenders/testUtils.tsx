import React from "react";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {SWRConfig} from "swr";

export const UserIdContextProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <UserIdContext.Provider value={'test-user'}>
            {children}
        </UserIdContext.Provider>
    )
}

export const SWRConfigProvider = ({children, swrOptions}: { children: React.ReactNode, swrOptions?: any }) => {
    const options = {dedupingInterval: 0, provider: () => new Map(), ...swrOptions}
    return (
        <SWRConfig value={options}>
            {children}
        </SWRConfig>
    )
}