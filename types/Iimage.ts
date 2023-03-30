import {IBreed} from "@/types/IBreed";

export interface IImage {
    id: string
    url: string
    width: number
    height: number
    breeds?: IBreed[]
}