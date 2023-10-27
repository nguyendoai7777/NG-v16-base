export interface BaseResponse<T> {
  status: number;
  code: number;
  message: string;
  data: T;
}
