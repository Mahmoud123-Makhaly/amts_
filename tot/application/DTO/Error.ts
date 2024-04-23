export interface IErrorParameterTypeDTO {
  /** key */
  key: string;
  /** Value */
  value: string;
}
export interface IValidationErrorTypeDTO {
  /** Error code */
  errorCode?: string;
  /** Error msg */
  errorMessage?: string;
  errorParameters?: Array<IErrorParameterTypeDTO>;
  /** Object id */
  objectId?: string;
  /** Object type */
  objectType?: string;
}
