'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { Actions } from '@libs/actions';
import { Preloader, Loader, FulfillmentDDL, Modal } from '@components';
import { useAppStore, useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

type Props = {
  children: ReactNode;
};

const RootTemplate = (props: Props) => {
  const { children } = props;
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { setUser, user } = useAppStore(state => ({
    setUser: state.appAccount.setUser,
    user: state.appAccount.user,
  }));

  useEffect(() => {
    const setupAppAccount = async () => {
      let appUser: DTO.IUserDTO | undefined = undefined;
      if (!user && !(await Actions.session.isSessionActive())) {
        if (session && session.isAuthorized && session.user) {
          appUser = session.user;
        } else {
          const { data: _user, serverError, validationErrors } = await Actions.account.getCurrentUser();
          if (_user?.data) {
            appUser = _user.data;
          }
        }
        if (appUser) {
          const setupSessionStatus = await Actions.session.setupSession(appUser);
        }
      }
      if (!user && (await Actions.session.isSessionActive())) {
        const activeSessionUser = await Actions.session.getSessionUserData();
        if (activeSessionUser) setUser && setUser(activeSessionUser);
      }
    };
    setupAppAccount();
  }, [session, setUser, user]);

  useEffect(() => {
    if (user) {
      const checkInventoryExistence = async () => {
        const savedInventory = await Actions.session.getSessionAppSettingValueByKey<{ id: string; name: string }>(
          'INV',
        );
        if (!savedInventory || !savedInventory.id) setModalOpen(true);
      };
      checkInventoryExistence();
    }
  }, [user]);

  return (
    <React.Fragment>
      <Preloader />
      {user ? children : <Loader />}
      {/* <Modal isOpen={modalOpen} size="lg" className="fullfillment-modal">
        <div className="py-4 flex-col-start px-2 px-lg-5">
          <h4 className="pb-3 border-bottom w-100">CHOOSE_AREA</h4>
          <FulfillmentDDL
            headerClassName="bg-white text-primary border-primary p-2 w-100 flex-between"
            className="w-100 mt-3"
          >
            <div className="flex-between gap-1 font-15 w-100">
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-chevron-down text-primary"></i>
                <p>DEFAULT_SELECT</p>
              </div>
              <Image src='/public/svgs/location.svg' alt={'location'} width={20} height={20} className="justify-self-end" />
            </div>
          </FulfillmentDDL>
        </div>
      </Modal> */}
    </React.Fragment>
  );
};
export default RootTemplate;
