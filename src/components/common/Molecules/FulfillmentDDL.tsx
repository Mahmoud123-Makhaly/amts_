'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { Actions } from '@libs/actions';
import { DropDown, IDropDown, IDropDownItem } from '@components';
import { useAppStore } from '@app/hooks';

export interface IFulfillmentDDL extends Omit<IDropDown, 'menuItems'> {
  children?: React.ReactNode;
  headerClassName?: string;
}

const FulfillmentDDL = (props: IFulfillmentDDL) => {
  const { children, headerClassName, ...rest } = props;
  const [fulfillmentCenter, setFulfillmentCenter] = useState<any | undefined>(undefined);
  const { changePreloader } = useAppStore(state => ({
    changePreloader: state.layout.changePreloader,
  }));

  const initialFulfillmentCenterId = '8e4e375e-5b8a-41a6-9477-925b3eaf1e91';
  const initialFulfillmentCenterName = 'اكتوبر';

  const onFulfillmentCenterChange = useCallback(
    async (id: string, name?: string) => {
      changePreloader && changePreloader('enable');
      const saveSelectedInventoryStatus = await Actions.session.addInventoryToStoreSettings({
        id,
        name,
      });

      if (saveSelectedInventoryStatus) window.location.reload();
    },
    [changePreloader],
  );

  useEffect(() => {
    if (!fulfillmentCenter) {
      const loadFulfillmentCenters = async () => {
        const {
          data: response,
          serverError,
          validationErrors,
        } = await Actions.fulfillmentCenters.getDefaultInventory();

        if (response?.data) setFulfillmentCenter(response.data);
      };
      loadFulfillmentCenters();
    }
  }, [fulfillmentCenter, onFulfillmentCenterChange]);

  return <div className="text-primary p-2 fullfillment-button">{children}</div>;
};
export default FulfillmentDDL;
