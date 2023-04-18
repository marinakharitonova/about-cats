import {Center, Text} from "@chakra-ui/react";

function Error({statusCode}: { statusCode: number }) {
    return (
        <Center>
            <Text fontSize='3xl'>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </Text>
        </Center>
    )
}

Error.getInitialProps = ({res, err}: { res: any, err: any }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return {statusCode}
}

export default Error