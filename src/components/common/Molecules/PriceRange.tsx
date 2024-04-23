'use client';

import React, { useState } from 'react';

import { useTranslate } from '@app/hooks';
import { Input } from 'reactstrap';

interface PriceRangeProps {
  onChange?: (from: string, to: string) => void;
  defaultRange?: { from: string; to: string };
}
const PriceRange = (props: PriceRangeProps) => {
  const { onChange, defaultRange } = props;
  const t = useTranslate('COMP_Price_Range');
  const [range, setRange] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });

  return (
    <div>
      <div className="d-flex align-items-center">
        <h6 className="mx-2 my-0">{t('FROM')} </h6>
        <Input
          type="number"
          onChange={e => {
            setRange(prev => ({ ...prev, from: e.target.value }));
          }}
          defaultValue={Number(defaultRange?.from) || 0}
        />
        <h6 className="mx-2 my-0">{t('TO')}</h6>
        <Input
          type="number"
          onChange={e => {
            setRange(prev => ({ ...prev, to: e.target.value }));
          }}
          defaultValue={Number(defaultRange?.to) || 0}
        />
      </div>
    </div>
  );
};

export default PriceRange;
