export type InputDynamicPropertyValueType = {
  /** Culture name ("en-US") for multilingual property */
  cultureName?: string;
  /** Language ("en-US") for multilingual property */
  locale?: string;
  /** Dynamic property name */
  name: string;
  /** Dynamic property value. ID must be passed for dictionary item */
  value?: any;
};
