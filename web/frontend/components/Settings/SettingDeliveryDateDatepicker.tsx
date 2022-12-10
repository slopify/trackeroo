import React from 'react';
import { Select, TextField } from '@shopify/polaris';
import { ESTIMATE_DELIVERY_DATE_OPTIONS } from '../../constants/constants'

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

const SettingDeliveryDateDatepicker: React.FC<SettingDeliveryDateCardProps> = ({
    disabled,
    onChange,
    startDays,
    endDays,
    selected,
}) => {
    return (
        <div>
            <span>Estimated delivery time is: </span>
            <TextField
                value={startDays}
                label='startDate'
                suffix="days"
                onChange={onChange}
                name="deliveryDateStartDays"
                disabled={disabled}
                autoComplete='false'
            />
            <span>to</span>
            <TextField
                value={endDays}
                suffix="days"
                name="deliveryDateEndDays"
                onChange={onChange}
                disabled={disabled}
                label='endDate'
                autoComplete='false'
            />
            <span>from</span>
            <Select
                label=""
                value={selected}
                options={ESTIMATE_DELIVERY_DATE_OPTIONS}
                name="deliveryDateFrom"
                disabled={disabled}
                onChange={(val) => onChange('deliveryDateFrom', val)}
            />
        </div>
    );
};

export default SettingDeliveryDateDatepicker;
