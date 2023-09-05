/* eslint-disable no-unused-vars */
interface ResponseResult<T> {
  code: number;
  success: boolean;
  msg: string;
  data: T;
}
