import React from 'react';
import { Card } from '@shopify/polaris';
import Switcher from '../Switcher';
//import { useRouter } from 'next/router';

interface SettingCheckboxCardProps {
    label?: string;
    name?: string;
    description?: string;
    checked?: boolean;
    checkboxPosition?: 'top' | 'bottom';
    disabled: boolean;
    noAccess: boolean;

    onChange(string, boolean): void;
}

const SettingCheckboxCard: React.FC<SettingCheckboxCardProps> = ({
    label,
    name,
    description,
    onChange,
    checked,
    disabled = false,
    noAccess = false,
}) => {

    return (
        <div>
            <Card sectioned title={label}>
                <p >{description}</p>
                <p >
                    <Switcher checked={checked} onChange={(value) => onChange(name, value)} disabled={disabled} />
                    <span>
                        {label} are currently <b>{checked ? 'activated' : 'not activated'}</b>
                    </span>
                </p>
            </Card>
        </div>
    );
};

export default SettingCheckboxCard;
