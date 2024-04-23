import React from 'react';
import { useTranslate } from '@app/hooks';
import { Tabs } from '@components';
import PendingInspection from './pending-inspection/PendingInspection';
import InprogressInspection from './inprogress-inspection/InprogressInspection';
import { CompletedInspection } from './completed-inspection';
import Empty from './Empty';

const MyBookings = () => {
  const t = useTranslate('COMP_My_Bookings');
  return (
    <div className="mt-4">
      <Tabs
        className="frameless"
        align="between"
        tabs={[
          {
            header: t('INSPECTION_COMPLETED'),
            content: <CompletedInspection />,
          },
          {
            header: t('PENDING_INSPECTION'),
            content: <PendingInspection />,
          },
          {
            header: t('INPROGRESS_INSPECTION'),
            content: <InprogressInspection />,
          },
          {
            header: t('CANCELED_INSPECTION'),
            content: <Empty />,
          },
        ]}
      />
    </div>
  );
};

export default MyBookings;
