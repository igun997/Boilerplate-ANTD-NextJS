export interface ResponseErrorValidation {
  message: string;
  errors: { [key: string]: string[] };
  code: number;
  msg: string;
}

export interface ResponsePagination {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ResponseCommon {
  code: number;
  data: any;
  msg: string;
}
