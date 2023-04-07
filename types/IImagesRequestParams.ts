export interface IImagesRequestParams {
    order?: 'RANDOM' | 'ASC' | 'DESC'
    page?: number
    limit?: number
    category_ids?: string
    breed_ids?: string
    has_breeds?: 0 | 1
    mime_types?: 'jpg,gif,png' | 'jpg,png' | 'gif'
    sub_id?: string
    size?: 'small' | 'med' | 'full'
}