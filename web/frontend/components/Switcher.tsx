import React from 'react';

interface SwitcherProps {
    checked: boolean;
    disabled?: boolean;

    onChange(boolean): any;
    version?: number;
}
const Switcher: React.FC<SwitcherProps> = ({ checked, onChange, disabled = false, version = 1 }) => {
    const onAction = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    return (
        <div
            onClick={onAction}
            tabIndex={-1}
            role="checkbox"
            onKeyDown={onAction}
            aria-checked={checked}
        >
            <div>
                <div />
            </div>
        </div>
    );
};

export default Switcher;