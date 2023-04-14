import useSWR, {SWRConfiguration} from "swr";
import {IBreed} from "@/types/IBreed";
import {fetcher} from "@/lib/fetchers/fetcher";

export const useBreedById = (breedId: string, config?: SWRConfiguration) => {
    const {
        data,
        isValidating,
    } = useSWR<IBreed>(`/api/breeds/${breedId}`, fetcher, config)

    return {
        breedInfo: data,
        isBreedValidating: isValidating
    }
}