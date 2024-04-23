'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider({ locale = 'en' }: { locale: 'en' | 'ar' }) {
  return (
    <ToastContainer
      position={locale === 'en' ? 'top-right' : 'top-left'}
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop
      closeOnClick={true}
      rtl={locale === 'ar'}
      pauseOnFocusLoss
      draggable
      className="mt-10"
      pauseOnHover
      //limit={1}
    />
  );
}
