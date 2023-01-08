export interface ResponsePagination {
  data: any[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
}
