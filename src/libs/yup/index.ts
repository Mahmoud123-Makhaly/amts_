import * as yup from 'yup';
import { Maybe, AnyObject, Flags, Schema } from 'yup';

yup.addMethod<typeof yup.StringSchema>(yup.StringSchema, 'isPasswordStrong', function (options, errorMessage) {
  return this.test('test-is-password-strong', errorMessage, function (value) {
    const { path, createError } = this;
    let _msg = errorMessage ?? '';
    let isStrong = true;

    // if field optional
    if (typeof value === 'undefined' && !options?.required) {
      return true;
    }

    if (!String(value) && options?.required) {
      isStrong = false;
      _msg += ';required';
    }

    if (options?.min) {
      if (!/.{8,}/.test(String(value))) {
        isStrong = false;
        _msg += ';min';
      }
    }

    if (options?.minLowercase) {
      if (!/[a-z]/.test(String(value))) {
        isStrong = false;
        _msg += ';minLowercase';
      }
    }
    if (options?.minUppercase) {
      if (!/[A-Z]/.test(String(value))) {
        isStrong = false;
        _msg += ';minUppercase';
      }
    }
    if (options?.minNumbers) {
      if (!/\d/.test(String(value))) {
        isStrong = false;
        _msg += ';minNumbers';
      }
    }
    if (options?.minSymbols) {
      if (!/\W/.test(String(value))) {
        isStrong = false;
        _msg += ';minSymbols';
      }
    }

    return (
      isStrong ||
      createError({
        path,
        message: _msg,
      })
    );
  });
});

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    isPasswordStrong(options?: any, errorMessage?: string): yup.StringSchema<TType, TContext>;
  }
}
export default yup;
