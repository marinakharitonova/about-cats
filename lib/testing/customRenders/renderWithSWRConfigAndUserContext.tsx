import React from "react";
import {render, RenderOptions} from "@testing-library/react";
import {SWRConfigProvider, UserIdContextProvider} from "@/lib/testing/customRenders/testUtils";

export const renderWithSWRConfigAndUserContext = (ui: React.ReactElement, swrOptions?: any, options?: RenderOptions) => {
    const Wrapper = ({children}: { children: React.ReactNode }) => {
        return (
            <SWRConfigProvider swrOptions={swrOptions}>
                <UserIdContextProvider>
                    {children}
                </UserIdContextProvider>
            </SWRConfigProvider>
        )
    }

    return render(ui, {wrapper: Wrapper, ...options})
}