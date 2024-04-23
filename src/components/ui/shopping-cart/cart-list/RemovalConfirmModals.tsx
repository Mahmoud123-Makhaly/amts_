'use client';

import React from 'react';
import { Row, Col } from 'reactstrap';

import { ButtonMaker, Modal } from '@components';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

interface RemovalConfirmModalsProps {
  setCartRemoval: React.Dispatch<
    React.SetStateAction<{
      remove: boolean;
      clear: boolean;
      lineItemId: string;
    }>
  >;
  cartRemoval: {
    remove: boolean;
    clear: boolean;
    lineItemId: string;
  };
  handleRemoveCartItem: () => Promise<void>;
  handleClearCart: () => Promise<void>;
}

const RemovalConfirmModals = ({
  setCartRemoval,
  cartRemoval,
  handleRemoveCartItem,
  handleClearCart,
}: RemovalConfirmModalsProps) => {
  const t = useTranslate('COMP_Product_Summary');

  return (
    <React.Fragment>
      <Modal isOpen={cartRemoval.remove}>
        <div className="flex-col px-3">
          <div className=" w-100  ">
            <i
              className="fa-solid fa-xmark close-icon text-dark-gray pointer"
              onClick={() => setCartRemoval({ ...cartRemoval, remove: false })}
            ></i>
          </div>
          <Row className="text-center w-100">
            <p className="fw-bold w-100 font-20 fw-bold pb-4   border-bottom">{t('REMOVE_CART_ITEM_MESSAGE')}</p>
            <p>{t('REMOVE_CONFIRMATION')}</p>
          </Row>
          <div className="w-100 mt-3  ">
            <ButtonMaker design="bg-danger border-0 " text={t('CONFIRM_REMOVE')} block onClick={handleRemoveCartItem} />

            <ButtonMaker
              text={t('CANCEL')}
              onClick={() => setCartRemoval({ ...cartRemoval, remove: false })}
              design=" mt-2"
              block
            />
          </div>
        </div>
      </Modal>

      <Modal isOpen={cartRemoval.clear}>
        <div className="flex-col">
          <div className="text-end w-100 p-2">
            <i
              className="fa-solid fa-xmark close-icon text-gray pointer"
              onClick={() => setCartRemoval({ ...cartRemoval, clear: false })}
            ></i>
          </div>
          <i className="bg-danger p-3 rounded-5  mb-3">
            <i className="fa-regular fa-xl fa-trash-can icon border-0 text-white h-auto "></i>
          </i>
          <p className="fw-bold">{t('CLEAR_CART_MESSAGE')}</p>
          <Row className="w-100 mt-3">
            <Col>
              <ButtonMaker design="bg-danger border-0" text={t('CONFIRM_CLEAR')} onClick={handleClearCart} block />
            </Col>
            <Col>
              <ButtonMaker
                text={t('CANCEL')}
                block
                onClick={() => setCartRemoval({ ...cartRemoval, clear: false })}
                design="text-primary bg-transparent"
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default RemovalConfirmModals;
