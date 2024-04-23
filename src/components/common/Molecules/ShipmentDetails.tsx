import React from "react";

import { useTranslate } from "@app/hooks";
interface IShippingDetailsProps {
  data?: any;
}
const ShipmentDetails = (props: IShippingDetailsProps) => {
  const { data } = props;
  const t = useTranslate("COMP_ShippingDetails");
  return <div className="border rounded p-3"></div>;
};

export default ShipmentDetails;
