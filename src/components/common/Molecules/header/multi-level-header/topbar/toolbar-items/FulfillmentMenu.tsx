'use client';

import React, { useEffect } from 'react';

import { FulfillmentDDL, ImageMaker } from '@components';
import { Actions } from '@libs/actions';
import { useAppStore } from '@app/hooks';

const FulfillmentMenu = () => {
  const { setSelectedInventory, selectedInventory } = useAppStore(state => ({
    setSelectedInventory: state.appAccount.setSelectedInventory,
    selectedInventory: state.appAccount.selectedInventory,
  }));

  useEffect(() => {
    if (!selectedInventory) {
      const reloadSelectedInventory = async () => {
        const savedInventory = await Actions.session.getSessionAppSettingValueByKey<{
          id: string;
          name: string;
          geoLocation?: string;
          line1?: string;
          phone?: string;
        }>('INV');
        if (savedInventory)
          setSelectedInventory &&
            setSelectedInventory({
              id: savedInventory.id,
              name: savedInventory.name,
              geoLocation: savedInventory.geoLocation,
              address: { phone: savedInventory.phone, line1: savedInventory.line1 },
            });
      };
      reloadSelectedInventory();
    }
  }, [selectedInventory, setSelectedInventory]);

  return (
    <React.Fragment>
      {selectedInventory && (
        <FulfillmentDDL headerClassName="bg-white text-primary border-0 p-2 fullfillment-button">
          <div className="d-flex align-items-center gap-1 font-15 border-start ps-1">
            <ImageMaker src="/images/svgs/header/location.svg" alt={'location'} />
          </div>
        </FulfillmentDDL>
      )}
    </React.Fragment>
  );
};

export default FulfillmentMenu;
