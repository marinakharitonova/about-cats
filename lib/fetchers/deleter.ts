import axios from "axios";

export const deleter = (url: string) => axios.delete(url).then(res => res.data)