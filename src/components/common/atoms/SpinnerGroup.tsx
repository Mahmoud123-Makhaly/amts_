'use client';

import React from 'react';
import { Spinner } from 'reactstrap';

const SpinnerGroup = ({ count = 3 }: { count?: number }) => {
  return (
    <React.Fragment>
      {Array(count)
        .fill(0)
        .map((v, indx) => (
          <Spinner
            key={`spinner-${indx}`}
            className="m-1"
            color="primary"
            type="grow"
            style={{ width: '20px', height: '20px' }}
          >
            Loading...
          </Spinner>
        ))}
    </React.Fragment>
  );
};
export default SpinnerGroup;
