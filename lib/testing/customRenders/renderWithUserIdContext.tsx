import React from "react";
import {render, RenderOptions} from "@testing-library/react";
import {UserIdContextProvider} from "@/lib/testing/customRenders/testUtils";


export const renderWithUserIdContext = (ui: React.ReactElement, swrOptions?: any, options?: RenderOptions) => {
    return render(ui, {wrapper: UserIdContextProvider, ...options})
}

export * from '@testing-library/react'