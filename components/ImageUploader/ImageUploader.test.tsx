import {screen, waitForElementToBeRemoved} from "@testing-library/react";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import React from "react";
import userEvent from "@testing-library/user-event";
import server from "@/lib/testing/server";
import {uploadSuccess, uploadWithError} from "@/lib/testing/mockHandlers/uploadImage";
import {renderWithSWRConfigAndUserContext} from "@/lib/testing/customRenders/renderWithSWRConfigAndUserContext";

const setupTest = () => {
    const user = userEvent.setup()
    renderWithSWRConfigAndUserContext(<ImageUploader/>)

    return {user}
}

const makeUploadImageTest = async () => {
    const {user} = setupTest()

    expect(screen.getByText(/Drag here/)).toBeInTheDocument()

    const testImageFile = new File(["hello"], "hello.png", {type: "image/png"});
    await user.upload(screen.getByTestId('image-uploader'), testImageFile)

    expect(screen.getAllByText(/loading/i)).toHaveLength(2)

    await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i))
}


describe('ImageUploader component', () => {
    it('should show and hide loading status on successful image upload', async () => {
        server.use(uploadSuccess())

        await makeUploadImageTest()

    })

    it('should not break on failure image upload', async () => {
        server.use(uploadWithError())

        await makeUploadImageTest()
    })
})