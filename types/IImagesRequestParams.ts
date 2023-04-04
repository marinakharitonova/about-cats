export interface IImagesRequestParams {
    order?: 'RANDOM' | 'ASC' | 'DESC'
    page?: number
    limit?: number
    category_ids?: string
    breed_ids?: string
    has_breeds?: number
}