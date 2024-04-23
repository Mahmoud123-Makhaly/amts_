export interface IRepoError {
  code: string;
  message: string;
  trace?: Array<IRepoError>;
  exception?: unknown;
}
interface IDataOrError<T> {
  data: T | undefined;
  error: IRepoError | undefined;
}
export type Result<T> = IDataOrError<T> & ({ data: T; error?: never } | { data?: never; error: IRepoError });
