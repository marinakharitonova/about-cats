import userEvent from '@testing-library/user-event'
import {screen, waitFor} from "@testing-library/react";
import React from "react";
import VotingButtons from "@/components/VotingButtons/VotingButtons";
import {getRandomImageHandlers} from "@/lib/testing/mockHandlers/getRandomImage";
import server from "@/lib/testing/server";
import {unstable_serialize} from "swr";
import {RANDOM_IMAGE_REQUEST_PARAMS} from "@/pages";
import {renderWithSWRConfig} from "@/lib/testing/customRenders/renderWithSWRConfig";
import {voteSucces, voteWithError} from "@/lib/testing/mockHandlers/vote";

const randomImageReqFallback = {
    [unstable_serialize(['/api/images', RANDOM_IMAGE_REQUEST_PARAMS])]: {
        images: [
            {
                "breeds": [],
                "categories": [],
                "id": "e3c",
                "url": "https://25.media.tumblr.com/tumblr_m1yuqjfdy31qejbiro1_500.jpg"
            }
        ],
        imagesCount: null
    }
}

const setupTest = () => {
    renderWithSWRConfig(<VotingButtons/>, {fallback: randomImageReqFallback})
    const loveBtn = screen.getByRole('button', {name: /love it/i})
    const nopeBtn = screen.getByRole('button', {name: /nope it/i})

    return {loveBtn, nopeBtn}
}

const checkButtonsCorrectness = async (loveBtn: HTMLElement, nopeBtn: HTMLElement) => {
    expect(loveBtn).toBeDisabled()
    expect(nopeBtn).toBeDisabled()

    await waitFor(() => expect(loveBtn).toBeEnabled())
    await waitFor(() => expect(nopeBtn).toBeEnabled())
}
describe('VotingButtons component', () => {

    it('should renders', async () => {

        const {loveBtn, nopeBtn} = setupTest()

        expect(loveBtn).toBeInTheDocument()
        expect(nopeBtn).toBeInTheDocument()
        expect(loveBtn).toBeEnabled()
        expect(nopeBtn).toBeEnabled()
    })

    it('should make the button disabled while the image vote request is in progress', async () => {
        server.use(...getRandomImageHandlers, voteSucces())
        const user = userEvent.setup()

        const {loveBtn, nopeBtn} = setupTest()

        // vote for the image
        await user.click(loveBtn)

        await checkButtonsCorrectness(loveBtn, nopeBtn)

    })

    it('should not break on failure voting request', async () => {
        server.use(...getRandomImageHandlers, voteWithError())
        const user = userEvent.setup()

        const {loveBtn, nopeBtn} = setupTest()

        await user.click(nopeBtn)
        await checkButtonsCorrectness(loveBtn, nopeBtn)
    })
})

export {}