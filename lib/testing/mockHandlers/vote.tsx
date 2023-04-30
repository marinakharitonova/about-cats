import {rest} from "msw";

export function voteSucces() {
    return rest.post(
        '/api/votes',
        (req, res, ctx) => {

            return res(
                ctx.status(200),
                ctx.delay(200),
                ctx.json({
                    "country_code": "US",
                    "id": 36491,
                    "image_id": "e3c",
                    "message": "SUCCESS",
                    "value": 1
                }),
            )
        }
    )
}

export function voteWithError() {
    return rest.post(
        '/api/votes',
        (req, res, ctx) => {

            return res(
                ctx.status(400),
                ctx.delay(200)
            )
        }
    )
}