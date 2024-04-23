export interface IServiceError {
  code: string;
  message: string;
  trace?: Array<IServiceError>;
  exception?: unknown;
}
interface IDataOrError<T> {
  data: T | undefined;
  error: IServiceError | undefined;
}
export type Result<T> = IDataOrError<T> & ({ data: T; error?: never } | { data?: never; error: IServiceError });
