import axios from 'axios'
import {IImagesRequestParams} from "@/types/IImagesRequestParams";

/**
 * A Promise returning functions to fetch data with SWR hooks
 */
export const getFetcher = (url: string) => axios.get(url).then(res => res.data)

export const imagesFetcher = (api: [string, IImagesRequestParams]) => axios.get(api[0], {params: api[1]}).then(res => res.data)

export const postFetcher = (url: string, {arg}: { arg: unknown }) => axios.post(url, arg).then(res => res.data)

export const delFetcher = (url: string) => axios.delete(url).then(res => res.data)