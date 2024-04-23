import React from 'react';

import { ServicesDetails } from '@components';

const page = ({ params }: { params: { slug: string } }) => {
  return <ServicesDetails />;
};

export default page;
