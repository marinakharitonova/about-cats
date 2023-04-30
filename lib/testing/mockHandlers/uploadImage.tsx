import {rest} from "msw";

export function uploadSuccess() {
    return rest.post(
        '/api/upload',
        (req, res, ctx) => {

            return res(
                ctx.status(200),
                ctx.delay(200),
                ctx.json({
                    "id": "9ccXTANkb",
                    "url": "https://cdn2.thecatapi.com/images/9ccXTANkb.jpg",
                    "pending": 0,
                    "approved": 1
                }),
            )
        }
    )
}

export function uploadWithError() {
    return rest.post(
        '/api/upload',
        (req, res, ctx) => {

            return res(
                ctx.status(400),
                ctx.delay(200),
            )
        }
    )
}