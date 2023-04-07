/**
 * canLoadMore function returns a boolean flag indicating whether the photo can still be uploaded.
 */
export const canLoadMore = (limit: number, currentPage: number, totalCount: number | null): boolean => {
    const displayedImagesCount = limit * currentPage + limit

    return Boolean(totalCount && totalCount > displayedImagesCount)
}