import ErrorCheckout from './ErrorCheckout.json';

const defaultError = {
  DEF: {
    en: 'Oops! Something went wrong. Please try again later.',
    ar: 'عذرًا! حدث خطأ ما. الرجاء المحاولة مرة أخرى لاحقًا.',
  },
};

export class ErrorService {
  private constructor() {}
  public static get(code: string, obj?: { [k: string]: string }, lang: 'ar' | 'en' = 'en'): string {
    const error =
      new Map([...Object.entries(defaultError), ...new Set(Object.entries(ErrorCheckout))]).get(code) ??
      defaultError.DEF;

    const errorMsg = error[lang];

    return !obj
      ? errorMsg
      : error[lang].replace(
          new RegExp(`{${Object.keys(obj).join('},{')}}`),
          matched => obj[matched.replace('{', '').replace('}', '')],
        );
  }
}
