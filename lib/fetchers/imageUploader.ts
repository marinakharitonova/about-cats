import axios from "axios";
import {IUploadResponse} from "@/types/IUploadResponse";

export const imageUploader = (url: string, {arg}: { arg: FormData }) => axios.post<IUploadResponse>(url, arg, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}).then(res => res.data)