'use client';

import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useSession } from 'next-auth/react';

import { Actions } from '@libs/actions';
import { DTO } from '@tot/core/types';
import { useTranslate, useToast } from '@app/hooks';
import { ButtonMaker, SubmitButton } from '@components';
import { Utils } from '@libs';

interface IRemoveAddress {
  onDismiss: () => void;
  address: DTO.IMemberAddressDTO;
}
const RemoveAddressModal = (props: IRemoveAddress) => {
  const { onDismiss, address } = props;
  const t = useTranslate('COMP_Remove_Address_Modal');
  const { data: session } = useSession();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const {
      data: deleteStatus,
      serverError,
      validationErrors,
    } = await Actions.account.deleteMyAddress({
      memberId: session?.user?.memberId ?? '',
      address: { ...(Utils.cleanEmpty(address) as DTO.IMemberAddressDTO), key: address.id! },
    });
    setIsLoading(false);

    if (serverError || validationErrors || deleteStatus?.error || !deleteStatus?.data)
      toast.error(t('GENERIC_ERR_MSG'), { position: 'top-center' });
    else {
      onDismiss();
    }
  };

  return (
    <div className="flex-col">
      <div className="text-end w-100 p-2">
        <i
          className="fa-solid fa-xmark close-icon text-light-gray pointer border rounded-circle outline-icon-20"
          onClick={onDismiss}
        ></i>
      </div>
      <i className="bg-danger p-3 rounded-5  mb-3">
        <i className="fa-regular fa-xl fa-trash-can icon border-0 text-white h-auto "></i>
      </i>
      <p className="fw-bold">{t('REMOVE_ADDRESS')}</p>
      <p className="text-muted">{t('DO_REMOVE_ADDRESS')}</p>
      <Row className="w-100 mt-3">
        <Col>
          <SubmitButton
            design="bg-danger text-black border-0"
            text={t('CONFIRM_REMOVE')}
            onClick={async () => {
              await handleDelete();
            }}
            isLoading={isLoading}
            disabled={isLoading}
            block
          />
        </Col>
        <Col>
          <ButtonMaker outline text={t('CANCEL')} block onClick={onDismiss} design="text-primary" />
        </Col>
      </Row>
    </div>
  );
};

export default RemoveAddressModal;
