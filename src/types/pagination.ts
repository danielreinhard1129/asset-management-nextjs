export interface PaginationMeta {
  hasNext: boolean;
  hasPrevious: boolean;
  page: number;
  perPage: number;
  total: number;
}

export interface PageableResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  all?: boolean;
}
