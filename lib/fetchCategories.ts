import {instance} from "@/lib/axiosInstance";
import {ICategory} from "@/types/ICategory";

export const fetchCategories = async (): Promise<ICategory[]> => {
    const response = await instance.get<ICategory[]>('categories')

    return response.data
}