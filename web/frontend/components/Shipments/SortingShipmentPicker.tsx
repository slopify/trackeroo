import React, { memo, useCallback, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { Button, Popover, Checkbox } from '@shopify/polaris';

interface SortingStatusPickerProps {
    onChange: (value: string[]) => void;
    subTitle: string;
    name: string;
    options?: string[];
    values?: string[];
  }

const SortingStatusPickerNew: React.FC<SortingStatusPickerProps> = ({
  name,
  subTitle = '',
  onChange,
  options,
  values,
}) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => {
    if (popoverActive) {
      onChange(values);
    }

    setPopoverActive((popoverActive) => !popoverActive);
  }, [onChange, popoverActive, values]);

  const popoverActivator = useMemo(
    () => (
      <div>
        <Button
          onClick={() => {
            togglePopoverActive();
          }}
          disclosure={popoverActive ? 'up' : 'down'}
        >
          {subTitle}
        </Button>
      </div>
    ),
    [popoverActive, subTitle, togglePopoverActive],
  );

  return (
    <div style={{ display: 'grid' }}>
      <Popover active={popoverActive} activator={popoverActivator} onClose={() => togglePopoverActive()}>
        <div style={{ padding: 17 }}>
          {name}
          {(options || []).map((opt) => {
            return (
              <div key={opt} style={{ paddingTop: 5 }}>
                <Checkbox
                  label={opt}
                  key={`Option_${opt}`}
                  checked={values.includes(opt)}
                  onChange={(value) =>
                    value ? onChange([...values, opt]) : onChange(values.filter((val) => val !== opt))
                  }
                />
              </div>
            );
          })}
        </div>
      </Popover>
    </div>
  );
};

export default memo(SortingStatusPickerNew, isEqual);
