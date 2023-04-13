/**
 * canLoadMore function returns a boolean flag indicating whether the photo can still be uploaded.
 */
export const canLoadMore = (limit: number, currentPage: number, totalCount: number | null): boolean => {
    const displayedImagesCount = limit * currentPage + limit

    //console.log(`page: ${currentPage}, result:${Boolean(totalCount && totalCount > displayedImagesCount)}`);

    return Boolean(totalCount && totalCount > displayedImagesCount)
}