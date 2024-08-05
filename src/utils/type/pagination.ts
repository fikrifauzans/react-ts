export interface Pagination {
    currentPage: number | null,
    limit: number | null,
    nextPage: number | null,
    prevPage: number | null,
    totalCount: number | null,
    totalPages: number | null,
    beginData: number | null,
    endData: number | null
}

export const defaultRowPerPageOptions: Array<number> = [5, 10, 25, 30]