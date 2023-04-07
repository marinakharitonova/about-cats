import {instance} from "@/lib/axiosInstance";
import {ICategory} from "@/types/ICategory";

/**
 * Fetch data on all available images categories.
 */
export const fetchCategories = async (): Promise<ICategory[]> => {
    const response = await instance.get<ICategory[]>('categories')

    return response.data
}