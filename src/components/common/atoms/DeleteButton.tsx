import React from 'react';
import { ButtonMaker } from '@components';
import { Spinner } from 'reactstrap';
interface IFavoriteProps {
  isLoading?: boolean;
  className?: string;
  success: boolean;
  setSuccess: () => void;
}
const DeleteButton = (props: IFavoriteProps) => {
  const { success, setSuccess, className, isLoading = false } = props;
  return (
    <div className="wrapper">
      <ButtonMaker design={className} block={false}>
        <i className={`${success ? 'fa-solid' : 'fa-regular'} fa-heart text-primary fa-2xl`} onClick={setSuccess}></i>
      </ButtonMaker>
      {isLoading && (
        <div className="mask">
          <Spinner size="sm" type="grow" className="mx-2 flex-shrink-0" role="status" />
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
