import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import axios from "axios";

export const imagesFetcher = (api: [string, IImagesRequestParams]) => axios.get(api[0], {params: api[1]}).then(res => res.data)