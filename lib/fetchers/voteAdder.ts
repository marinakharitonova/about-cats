import axios from "axios";
import {IVoteMutationArg} from "@/types/IVoteMutationArg";

export const voteAdder = (url: string, {arg}: { arg: IVoteMutationArg }) => axios.post(url, arg).then(res => res.data)