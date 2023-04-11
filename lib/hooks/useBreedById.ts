import useSWR, {SWRConfiguration} from "swr";
import {IBreed} from "@/types/IBreed";
import {getFetcher} from "@/lib/fetchers/fetchers";

export const useBreedById = (breedId: string, config?: SWRConfiguration) => {
    const {
        data,
        isValidating,
    } = useSWR<IBreed>(`/api/breeds/${breedId}`, getFetcher, config)

    return {
        breedInfo: data,
        isBreedValidating: isValidating
    }
}