import {IBreed} from "@/types/IBreed";

export interface IUpload {
    breed_ids: string | null
    breeds: IBreed[]
    created_at: string
    height: number
    id: string
    original_filename: string
    sub_id: string
    url: string
    width: number
}