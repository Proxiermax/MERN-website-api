export interface PaginationData {
  currPage: number;
  pageSize: number;
}

export interface PaginationMeta {
  currPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  next: number;
  prev: number;
}

export interface Pagination<T> {
  data: T[];
  meta: PaginationMeta;
}