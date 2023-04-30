import React from "react";
import {render, RenderOptions} from "@testing-library/react";
import {SWRConfigProvider} from "@/lib/testing/customRenders/testUtils";

export const renderWithSWRConfig = (ui: React.ReactElement, swrOptions?: any, options?: RenderOptions) => {

    const SWRConfigWrapper = ({children}: { children: React.ReactNode }) => {
        return <SWRConfigProvider swrOptions={swrOptions}>
            {children}
        </SWRConfigProvider>
    }

    return render(ui, {wrapper: SWRConfigWrapper, ...options})
}

export * from '@testing-library/react'