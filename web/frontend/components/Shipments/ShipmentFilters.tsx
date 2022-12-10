import React, { useEffect, useState } from 'react';
import { Icon, TextField, DatePicker } from '@shopify/polaris';
import { SearchMinor, CancelSmallMinor } from '@shopify/polaris-icons';
import SortingStatusPicker from './SortingShipmentPicker';
import getDateRange from '../../helpers/getDateRange';
import { StatusNew, DATE_RANGE_LABELS, DateRange } from '../../constants/constants';

interface DateFilterObject {
    start: Date;
    end: Date;
  }

interface ShipmentFiltersNewProps {
    onSearch(value: string): void;
  
    onDateFilter(value: DateFilterObject, range: DateRange): void;
  
    setStatuses: (value: string[]) => void;
    setCouriers: (value: string[]) => void;
    setDestinations: (value: string[]) => void;
    initialStatuses: string[];
    initialDates: DateFilterObject;
    initialRange: DateRange;
  }

 {/* //TODO: Implement Date Filtering

        <div className={styles.ShipmentsFilters__statusSorting}>
          <SortingStatusPicker
            options={DestinationData.map((destination) => destination.name)}
            name="DESTINATION"
            subTitle="Destination"
            onChange={setDestinations}
          />
        </div> */}

const ShipmentFiltersNew: React.FC<ShipmentFiltersNewProps> = ({
  onDateFilter,
  setStatuses,
  onSearch,
  setCouriers,
  setDestinations,
  initialStatuses,
  initialDates,
  initialRange,
}) => {
  // Search Filter Dropdown
  const [search, setSearch] = useState<string>('');

  // Date Filter Dropdown
  const [range, setRange] = useState<DateRange>(initialRange || DateRange.Last30Days);
  const [{ month, year }, setDate] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
  const [selectedDates, setSelectedDates] = useState<DateFilterObject>(
    initialDates || {
      start: new Date(),
      end: new Date(),
    },
  );

  // Status Filter Dropdown
  const [statusList, setStatusList] = useState(initialStatuses);

  useEffect(() => {
    if (range !== DateRange.Custom && range !== DateRange.All) {
      const newDates = getDateRange(range);
      setSelectedDates(newDates);
      onDateFilter(newDates, range);
    }
    if (range === DateRange.All) {
      const newDates = { start: new Date('1970-01-01'), end: new Date() };
      setSelectedDates(newDates);
      onDateFilter(newDates, range);
    }
  }, [range, onDateFilter]);

  const onDateChange = (selectedDates) => {
    // Update parent filter
    onDateFilter(selectedDates, DateRange.Custom);

    // Update state
    setSelectedDates(selectedDates);
  };

  const onStatusChange = (statuses) => {
    // Update parent filter
    setStatusList(statuses);

    // Update state
    setStatuses(statuses);
  };

  return (
    <div style={{ padding: '25px 20px 30px 15px' }}>
      <div >
        <div >
          <TextField
            label=""
            autoComplete="on"
            placeholder="Filter by order or tracking number"
            onChange={(value) => {
              setSearch(value);
              onSearch(value);
            }}
            value={search}
            prefix={<Icon source={SearchMinor} />}
          />
        </div>
        <div >
          <SortingStatusPicker
            options={Object.entries(StatusNew).map((item) => item[1])}
            name="SHIPMENT STATUS"
            subTitle="Status"
            values={statusList}
            onChange={onStatusChange}
          />
        </div>
       
        <div >
          <DatePicker
            year={year}
            month={month}
          />
        </div>
      </div>
      {range !== DateRange.All ? (
        <div
          onClick={() => {
            setRange(DateRange.All);
          }}
        >
          <span>{DATE_RANGE_LABELS[range]}</span>
          <CancelSmallMinor color="#5C5F62" />
        </div>
      ) : null}
      {statusList.map((status, statusIndex) => (
        <div
          key={`status_tag_${statusIndex}`}
          onClick={() => {
            onStatusChange(statusList.filter((val) => val !== status));
          }}
        >
          <span>{status}</span>
          <CancelSmallMinor color="#5C5F62" />
        </div>
      ))}
    </div>
  );
};

export default ShipmentFiltersNew;
