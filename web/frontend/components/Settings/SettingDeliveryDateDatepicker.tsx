import React from 'react';
import { Select, TextField, FormLayout } from '@shopify/polaris';
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

const styles = {
    Container: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '620px',
        alignItems: 'center',
    },
    CustomTextField: {
        maxWidth: '122px',
        marginRight: '25px',
        color: '#202223',
    },
    CustomSelectField: {
        maxWidth: '150px',
    },
    CustomSpan: {
        letterSpacing: '0.2px',
        fontWeight: 'bold',
        margin: '5px'
    }
}



const SettingDeliveryDateDatepicker: React.FC<SettingDeliveryDateCardProps> = ({
    disabled,
    onChange,
    startDays,
    endDays,
    selected,
}) => {
    return (
        <div style={styles.Container}>
            <span style={styles.CustomSpan}> Est delivery time is from: </span>
            <div style={styles.CustomTextField}>
                <TextField
                    value={startDays}
                    type="number"
                    suffix="days"
                    name="deliveryDateStartDays"
                    label=""
                    autoComplete='false'
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
            <span style={styles.CustomSpan}>to</span>
            <div style={styles.CustomTextField}>
                <TextField
                    value={endDays}
                    type="number"
                    suffix="days"
                    name="deliveryDateEndDays"
                    label=""
                    autoComplete='false'
                    onChange={onChange}
                    disabled={disabled}
                /></div>

            <span style={styles.CustomSpan}>from</span>
            <div style={styles.CustomSelectField}>
                <Select
                    label=""
                    value={selected}
                    options={ESTIMATE_DELIVERY_DATE_OPTIONS}
                    name="deliveryDateFrom"
                    disabled={disabled}
                    onChange={(val) => onChange('deliveryDateFrom', val)}
                />
            </div>
        </div>
    );
};

export default SettingDeliveryDateDatepicker;
