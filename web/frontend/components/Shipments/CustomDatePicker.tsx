import React, { memo, useCallback, useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { Button, DatePicker, Popover, Select } from '@shopify/polaris';
import { CalendarMinor } from '@shopify/polaris-icons';
import { DATE_RANGE_LABELS, DateRange } from '../../constants/constants'

interface DateFilterObject {
    start: Date;
    end: Date;
  }

interface DateFilterProps {
    range: DateRange;
    setRange: (value: DateRange) => void;
    year: number;
    month: number;
    setDate: (value: any) => void;
    selectedDates: DateFilterObject;
    setSelectedDates: (value: DateFilterObject) => void;
  }

  

  const styles = {
    DateFilter: {
        activator : {
          button : {
            icon : {
              marginRight: '6px',
            },
            text : {
              fontWeight: 'bold',
              color: 'grey',
              fontSize: '14px',
            },
          },
        },
      
        rangeSelect : {
          marginBottom: '30px',
        }, 
        actions : {
          display: 'flex',
          columnGap: '15px',
        }
      }
  }

const DateFilter: React.FC<DateFilterProps> = ({
  range,
  setRange,
  year,
  month,
  setDate,
  selectedDates,
  setSelectedDates,
}) => {
  const [datePopoverActive, setDatePopoverActive] = useState(false);

  useEffect(() => {
    setDate({
      month: selectedDates.start.getMonth(),
      year: selectedDates.start.getFullYear(),
    });
  }, [selectedDates, setDate]);

  const toggleDatePickerActive = useCallback(() => setDatePopoverActive((popoverActive) => !popoverActive), []);

  const handleMonthChange = useCallback((month, year) => setDate({ month, year }), [setDate]);

  const handleDateChange = (value) => {
    setSelectedDates(value);
    setRange(DateRange.Custom);
  };

  const rangeOptions = Object.entries(DATE_RANGE_LABELS).map(([value, label]) => ({
    label,
    value,
  }));

  const datePickerActivator = (
    <div style={styles.DateFilter.activator.button.icon}>
      <Button onClick={toggleDatePickerActive} icon={CalendarMinor}>
        Date Range
      </Button>
    </div>
  );

  return (
    <div>
      <Popover active={datePopoverActive} activator={datePickerActivator} onClose={toggleDatePickerActive}>
        <Popover.Pane>
          <Popover.Section>
            <div>
              <div style={styles.DateFilter.rangeSelect}>
                <Select
                  label=""
                  options={rangeOptions}
                  onChange={(value) => setRange(Number(value))}
                  value={String(range)}
                />
              </div>
              <div>
                <DatePicker
                  month={month}
                  year={year}
                  onChange={handleDateChange}
                  onMonthChange={handleMonthChange}
                  selected={selectedDates}
                  allowRange
                  multiMonth
                  disableDatesAfter={new Date()}
                />
              </div>
            </div>
          </Popover.Section>
        </Popover.Pane>
        <Popover.Pane fixed>
          <Popover.Section>
            <div style={styles.DateFilter.actions}>
              <Button onClick={toggleDatePickerActive}>Close</Button>
            </div>
          </Popover.Section>
        </Popover.Pane>
      </Popover>
    </div>
  );
};

export default memo(DateFilter, isEqual);
