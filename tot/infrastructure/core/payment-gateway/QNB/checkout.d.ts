declare module Checkout {
  export function showEmbeddedPage(tag: string) {}
  export function showPaymentPage() {}
  export function configure({ session: { id: string } }) {}
}
