import React, { useState, useCallback } from 'react';
import { Card, Layout, Spinner, Tabs, Badge, Page } from '@shopify/polaris';
import Heading from '../components/Plans/Heading';
import ShipmentsTable from '../components/Shipments/ShipmentsTable'
import ShipmentFilters from '../components/Shipments/ShipmentFilters';
import ShipmentsPagination from '../components/Shipments/ShipmentsPagination';
import { subDays } from 'date-fns';
import {
    Status,
    convertStatustoStatusNew,
    convertStatusNewtoStatus,
    CourierData,
    StatusNew,
    DateRange,
    PaginationDirection
} from '../constants/constants';

interface ShipmentFiltersInterface {
    search?: string;
    status?: Status;
    date?: DateFilterObject;
}

interface DateFilterObject {
    start: Date;
    end: Date;
}

interface Shipment {
    order: string;
    trackingNumber: string;
    courier: string;
    lastEvent: string;
    orderDate: Date;
    status: string;
}


//import { useQuery } from 'react-apollo';
//import { GET_SHIPMENTS } from '@schemas/shipments.schema';
//import ShipmentsPagination from '@components/ShipmentsPagination';


const SHIPMENTS_LIMIT = 10;

const Shipments: React.FC = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<ShipmentFiltersInterface>({
        search: '',
        status: Status.All,
        date: {
            start: subDays(new Date(), 29),
            end: new Date(),
        },
    });

    const [selected, setSelected] = useState(0);

    const [statuses, setStatuses] = useState([]);
    const [range, setRange] = useState(DateRange.Last30Days);
    const [selectedDates, setSelectedDates] = useState({
        start: new Date(),
        end: new Date(),
    });

    // TODO: Implement these filters
    const [couriers, setCouriers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [destinations, setDestinations] = useState([]);

    // Courier Codes represent the Destinations and Couriers
    const courierCodes = [];

    // Search through the Curiers and see if any have been selected
    CourierData.forEach((courier) => {
        if (couriers.includes(courier.courierName)) {
            courierCodes.push(courier.courierCode);
        }
    });

    // const { data, loading } = useQuery(GET_SHIPMENTS, {
    //     variables: {
    //         shipmentsInput: {
    //             page,
    //             limit: SHIPMENTS_LIMIT,
    //             search: filters.search,
    //             startDate: filters.date.start,
    //             endDate: filters.date.end,
    //             statuses: [].concat.apply(
    //                 [],
    //                 statuses.map((status) => convertStatusNewtoStatus[status]),
    //             ),
    //             couriers: courierCodes,
    //         },
    //     },
    // });
    const loading = false
    const data = ''

    // The statusCounts need to be mapped to the new Statuses
    const tabData = {};
    let total = 0;

    // data?.shipments?.statusCounts?.map((status) => {
    //     const newStatus = convertStatustoStatusNew(status._id);
    //     if (tabData[newStatus]) {
    //         tabData[newStatus] += status.count;
    //     } else {
    //         tabData[newStatus] = status.count;
    //     }
    //     total += status.count;
    // });

    // const shipments = data?.shipments?.data || [];
    // const meta = data?.shipments?.metaData || {};

    // const preparedShipments = shipments.map((item) => ({
    //     order: { orderName: item.shopifyOrderName, orderID: item.orderID },
    //     trackingNumber: item.trackingNumbers[0],
    //     courier: item.courier,
    //     lastEvent: item.lastEvent,
    //     orderDate: new Date(Number(item.orderDate)),
    //     status: convertStatustoStatusNew(item.status),
    // })) as Shipment[];

    const preparedShipments = []

    const onSearch = (value: string) => {
        setPage(1);
        setFilters((current) => ({
            ...current,
            search: value,
        }));
    };

    const onDateFilter = useCallback((value: DateFilterObject, range: DateRange) => {
        setRange(range);
        setSelectedDates(value);
        setPage(1);
        setFilters((current) => ({
            ...current,
            date: value,
        }));
    }, []);

    const onPagination = (direction: PaginationDirection) => {
        switch (direction) {
            case PaginationDirection.Next:
                setPage((current) => current + 1);
                break;
            case PaginationDirection.Prev:
                setPage((current) => (current > 1 ? current - 1 : current));
                break;
        }
    };

    const tabs = [
        {
            id: 'allShipments',
            content: (
                <span>
                    All <Badge>{`(${total || 0})`}</Badge>
                </span>
            ),
            accessibilityLabel: 'All shipments',
            panelID: 'allShipments',
        },
    ];

    Object.keys(StatusNew).map((status, index) => {
        tabs.push({
            id: status,
            content: (
                <span key={index}>
                    {StatusNew[status]} <Badge>{`(${tabData[StatusNew[status]] || 0})`}</Badge>
                </span>
            ),
            accessibilityLabel: StatusNew[status],
            panelID: status,
        });
    });

    const handleTabChange = useCallback((selectedTabIndex) => {
        setPage(1);
        const selectedStatus = Object.keys(StatusNew)[selectedTabIndex - 1 || 0];
        if (selectedStatus) {
            setStatuses([StatusNew[selectedStatus]]);
        } else {
            setStatuses([]);
        }

        setSelected(selectedTabIndex);
    }, []);

    return (
        <Page>
            <div>
                <Layout>
                    <Layout.Section fullWidth>
                        <Heading element="h1" subtext="Manage your shipments in the table below." color="#121212">
                            Shipments
                        </Heading>
                    </Layout.Section>
                    <Layout.Section>
                    </Layout.Section>
                    <Layout.Section fullWidth>
                        <div>
                            <Card>
                                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
                                    <ShipmentFilters
                                        onSearch={onSearch}
                                        onDateFilter={onDateFilter}
                                        initialStatuses={statuses}
                                        initialDates={selectedDates}
                                        initialRange={range}
                                        setStatuses={(value) => {
                                            handleTabChange(0);
                                            setStatuses(value);
                                        }}
                                        setCouriers={setCouriers}
                                        setDestinations={setDestinations}
                                    />
                                    {loading ? (
                                        <div>
                                            <Spinner size="large" />
                                        </div>
                                    ) : (
                                        <Card>
                                            <ShipmentsTable shipments={preparedShipments} newStatuses />
                                            <ShipmentsPagination
                                                onPagination={onPagination}
                                                page={page}
                                                limit={SHIPMENTS_LIMIT}
                                                total={1}
                                                count={1}
                                                hasNext={false}
                                                hasPrev={false}
                                            />
                                        </Card>
                                    )}
                                </Tabs>
                            </Card>
                        </div>
                    </Layout.Section>
                </Layout>
            </div>
        </Page>
    );
};

export default Shipments;
