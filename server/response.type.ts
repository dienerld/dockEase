export type ResponseApi<T = any> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
