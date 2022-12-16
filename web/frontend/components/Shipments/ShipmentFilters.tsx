import React, { useEffect, useState } from 'react';
import { Icon, TextField } from '@shopify/polaris';
import { SearchMinor, CancelSmallMinor } from '@shopify/polaris-icons';
import SortingStatusPicker from './SortingShipmentPicker';
import getDateRange from '../../helpers/getDateRange';
import { StatusNew, DATE_RANGE_LABELS, DateRange } from '../../constants/constants';
import CustomDatePicker from './CustomDatePicker';
import CancelIcon from '../CancelIcon';

const styles = {
    ShipmentsFiltersWrapper: {
        fontFamily: "SF Pro, Arial, sans-serif",
        padding: '25px 20px 30px 15px',
    },
    ShipmentsFilters: {
        display: 'flex',
        marginBottom: '15px',
    },
    ShipmentsFiltersSearch: {
        width: '100%',
        marginRight: '8px',
    },
    input: {
        fontSize: '15px',
    },
    ShipmentsFiltersStatusSorting: {
        maxWidth: '160px',
    },

    statusSortingButton: {
        width: '100%',
    },

    ShipmentsFiltersDatePicker: {
        width: '100%',
        maxWidth: '160px',
    },
    datePickerButton: {
        width: '100%',
    },
    ShipmentsFiltersTag: {
        padding: '4px 8px',
        margin: '0 1rem 1rem 0',
        backgroundColor: '#E4E5E7',
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '2px',
        gap: '0pt 5pt'
    },
    svg: {
        cursor: 'pointer',
    },
    svgPath: {
        transition: 'fill .5s ease -in -out',
    }
}


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
        <div style={styles.ShipmentsFiltersWrapper}>
            <div style={styles.ShipmentsFilters}>
                <div style={styles.ShipmentsFiltersSearch}>
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
                <div style={styles.ShipmentsFiltersStatusSorting}>
                    <SortingStatusPicker
                        options={Object.entries(StatusNew).map((item) => item[1])}
                        name="SHIPMENT STATUS"
                        subTitle="Status"
                        values={statusList}
                        onChange={onStatusChange}
                    />
                </div>

                <div style={styles.ShipmentsFiltersDatePicker}>
                    <CustomDatePicker
                        range={range}
                        setRange={setRange}
                        year={year}
                        month={month}
                        setDate={setDate}
                        selectedDates={selectedDates}
                        setSelectedDates={onDateChange}
                    />
                </div>
            </div>
            {range !== DateRange.All ? (
                <div style={styles.ShipmentsFiltersTag}
                    onClick={() => {
                        setRange(DateRange.All);
                    }}
                >
                    <span>{DATE_RANGE_LABELS[range]}</span>
                    <CancelIcon color="#5C5F62" />
                </div>
            ) : null}
            {statusList.map((status, statusIndex) => (
                <div
                    key={`status_tag_${statusIndex}`}
                    style={styles.ShipmentsFiltersTag}
                    onClick={() => {
                        onStatusChange(statusList.filter((val) => val !== status));
                    }}
                >
                    <span>{status}</span>
                   <CancelIcon color="#5C5F62" />
                </div>
            ))}
        </div>
    );
};

export default ShipmentFiltersNew;
