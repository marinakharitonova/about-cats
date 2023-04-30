import {rest} from "msw";

function getRandomImage() {
    return rest.get(
        `/api/images`,
        (req, res, ctx) => {
            const order = req.url.searchParams.get('order')
            const size = req.url.searchParams.get('size')
            return res(
                ctx.status(200),
                ctx.delay(200),
                ctx.json({
                    images: [{
                        breeds: [],
                        id: "ac5",
                        url: "https://cdn2.thecatapi.com/images/ac5.jpg",
                        width: 565,
                        height: 551
                    }],
                    imagesCount: null
                }),
            )
        }
    )
}

export const getRandomImageHandlers = [getRandomImage()];