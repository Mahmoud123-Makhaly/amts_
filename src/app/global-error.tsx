'use client';

import { useEffect } from 'react';
import { Link } from '../navigation';
import { ButtonMaker } from '../components/index';
import { useRouter } from 'next/router';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {}, [error]);
  return (
    <html>
      <body className="err-body">
        <div className="flex-col gap-4 w-100 h-100">
          <h2>Something went wrong!</h2>
          <ButtonMaker
            onClick={() => {
              reset();
              router.push('/');
            }}
          >
            Try again
          </ButtonMaker>
        </div>
      </body>
    </html>
  );
}
