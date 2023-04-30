import Footer from "@/components/Footer/Footer";
import {render, screen} from "@testing-library/react";

describe('Footer component', () => {
    it('should renders', () => {
        render(<Footer/>)

        expect(screen.getByRole('link', {name: /marinakharitonova/i})).toBeInTheDocument()
        expect(screen.getByText('2023')).toBeInTheDocument()
    })
})

export {}