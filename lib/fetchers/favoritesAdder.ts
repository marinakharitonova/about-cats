import axios from "axios";
import {IFavoriteMutationArg} from "@/types/IFavoriteMutationArg";

export const favoritesAdder = (url: string, {arg}: { arg: IFavoriteMutationArg }) => axios.post(url, arg).then(res => res.data)