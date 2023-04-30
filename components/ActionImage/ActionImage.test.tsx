import {render, screen} from "@testing-library/react";
import ActionImage from "@/components/ActionImage/ActionImage";
import {AiFillHeart} from "react-icons/ai";
import userEvent from "@testing-library/user-event";

const setupTest = (isDisabled: boolean) => {
    const mockCb = jest.fn()

    render(<ActionImage isDisabled={isDisabled} icon={<AiFillHeart/>} onClick={mockCb}>
        <span>mock</span>
    </ActionImage>)

    const actionBtn = screen.getByTestId("action-image-btn")
    const user = userEvent.setup()

    return {actionBtn, user, mockCb}
}

describe('ActionImage component', () => {
    it('should call the callback when button clicked', async () => {
        const {actionBtn, user, mockCb} = setupTest(false)

        await user.click(actionBtn)
        expect(mockCb).toHaveBeenCalledTimes(1)
    })

    it('should must have an disabled button if an appropriate prop is passed', async () => {
        const {actionBtn, user, mockCb} = setupTest(true)

        expect(actionBtn).toBeDisabled()
        await user.click(actionBtn)
        expect(mockCb).not.toHaveBeenCalled()
    })
})

export {}