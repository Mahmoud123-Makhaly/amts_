import React from 'react';
import { Col, Row } from 'reactstrap';

import { ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';

interface ICompletedInspectionCardProp {
  data: {
    details: Array<{
      label: string;
      value: String;
    }>;
    onClick?: () => void;
  };
  children?: React.ReactNode;
  className?: string;
  badge?: string;
}
const CompletedInspectionCard = (props: ICompletedInspectionCardProp) => {
  const { data, className, children, badge } = props;
  const t = useTranslate('COMP_Completed_Inspection');

  return (
    <div>
      <div className={`p-3 mb-3 ${className ?? ''}`}>
        <Row>
          <Col lg={3} className="ps-0">
            <ImageMaker src="/images/profile/booking/booking.jpg" className="h-100" />
          </Col>
          <Col lg={9} className="ps-0 flex-col flex-lg-row justify-content-lg-between align-items-start">
            <div className="ms-3">
              <div className="pb-3 d-flex align-items-center gap-4">
                <h6 className="mb-0 fw-semibold">{t('GENERAL_CLEANING_SERVICES')}</h6>
                {badge && <p className="mb-0 border border-warning bg-light-danger rounded-pill px-3 py-1">{badge}</p>}
              </div>

              <table>
                {data.details.map((item, index) => (
                  <tr key={index} className="mb-3">
                    <td className="fw-semibold pe-5 " colSpan={5}>
                      {item.label}
                    </td>
                    <td className="font-14">{item.value}</td>
                  </tr>
                ))}
              </table>
            </div>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CompletedInspectionCard;
