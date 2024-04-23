'use client';

import React from 'react';
import Image from 'next/image';

import user from '@assets/svgs/fi-rs-user.svg';
import location from '@assets/svgs/shipAddress.svg';
import phone from '@assets/svgs/fi-rs-phone-pause.svg';
import house from '@assets/svgs/home.svg';
import { Label } from 'reactstrap';
interface IShippingAddressProps {
  data: any;
  children?: React.ReactNode;
  selectInput?: (text: string) => void;
}
const ShippingAddress = (props: IShippingAddressProps) => {
  const { data, children, selectInput } = props;

  return (
    <Label htmlFor={data.id} className="border rounded p-2 w-100" onClick={() => selectInput && selectInput!(data.id!)}>
      <div className="p-2">
        <div className="flex-between border-bottom mb-3 pb-2">
          <div className="d-flex align-items-center">
            <div>
              <Image src={house} alt={'house'} width={0} height={0} className="mx-2" />
            </div>
            <p className="ps-2">{data?.name}</p>
          </div>
          <div className="d-flex  align-items-center pe-2">{children}</div>
        </div>
        <div className="font-12">
          <div className="border rounded p-2 d-flex my-2  align-items-center">
            <div className="pe-3">
              <Image src={user} alt={'user'} width={0} height={0} />
            </div>
            <p className="pe-2"> {data?.lastName}</p>
            <p>{data?.firstName}</p>
          </div>
          <div className="border rounded p-2 d-flex my-2  align-items-center">
            <div className="pe-3">
              <Image src={location} alt={'location'} width={0} height={0} />
            </div>
            <p>{data?.line1}</p>
          </div>
          <div className="border rounded p-2 d-flex  align-items-center">
            <div className="pe-3">
              <Image src={phone} alt={'phone'} width={0} height={0} />
            </div>
            <p>{data?.phone}</p>
          </div>
        </div>
      </div>
    </Label>
  );
};

export default ShippingAddress;
