import React from 'react';
import {Button, Wrap} from "@chakra-ui/react";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import useSWRMutation from "swr/mutation";
import {useRandomImage} from "@/lib/hooks/useRandomImage";
import {RANDOM_IMAGE_REQUEST_PARAMS} from "@/pages";
import {IVoteMutationArg} from "@/types/IVoteMutationArg";
import {voteAdder} from "@/lib/fetchers/voteAdder";

/**
 * VotingButtons renders the voting buttons for the Vote page.
 */
function VotingButtons() {

    const {image, mutateImage, isImageValidating} = useRandomImage(RANDOM_IMAGE_REQUEST_PARAMS)

    const vote = async (value: number) => {
        try {
            await triggerVote({image_id: image!.id, value})
            await mutateImage()
        } catch {
        }
    }

    const {
        trigger: triggerVote,
        isMutating: isMutatingVote
    } = useSWRMutation<any, any, string, IVoteMutationArg>('/api/votes', voteAdder)

    const isVoteBtnLoading = isMutatingVote || isImageValidating

    return (
        <Wrap spacing='12px'>
            <Button colorScheme='green' isLoading={isVoteBtnLoading} leftIcon={<AiOutlineLike/>}
                    onClick={() => vote(1)}>Love it</Button>
            <Button colorScheme='red' isLoading={isVoteBtnLoading} leftIcon={<AiOutlineDislike/>}
                    onClick={() => vote(-1)}>Nope it</Button>
        </Wrap>
    );
}

export default VotingButtons;