import React from 'react';
import { Card } from '@shopify/polaris';
import Switcher from '../Switcher';
import SettingDeliveryDateDatepicker from './SettingDeliveryDateDatepicker';

interface SettingDeliveryDateCardProps {
    label?: string;
    name?: string;
    description?: string;
    checked?: boolean;
    checkboxPosition?: 'top' | 'bottom';
    disabled: boolean;
    noAccess: boolean;
    onChange(string, boolean): void;
    switcherLabel?: string;
    startDays: string;
    endDays: string;
    selected: string;
  }

const SettingDeliveryDate: React.FC<SettingDeliveryDateCardProps> = ({
  label,
  switcherLabel,
  name = 'deliveryDateEnabled',
  description,
  onChange,
  startDays,
  endDays,
  selected,
  checked,
  disabled = false,
}) => {
  return (
    <div>
      <Card sectioned title={label}>
        <p>{description}</p>
        <div>
          <SettingDeliveryDateDatepicker
            onChange={onChange}
            startDays={startDays}
            endDays={endDays}
            selected={selected}
            disabled={disabled}
            noAccess={false}
          />
        </div>
        <p>
          <Switcher checked={checked} onChange={(value) => onChange(name, value)} disabled={disabled} />
          <span>
            {switcherLabel} is currently <b>{checked ? 'activated' : 'not activated'}</b>
          </span>
        </p>
      </Card>
    </div>
  );
};

export default SettingDeliveryDate;
