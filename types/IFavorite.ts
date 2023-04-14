export interface IFavorite {
    created_at: string
    id: number
    image: {
        id: string
        url: string
    }
    image_id: string
    sub_id: string | null
    user_id: string
}