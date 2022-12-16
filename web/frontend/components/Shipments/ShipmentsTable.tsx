import React, { useMemo } from 'react';
import { DataTable, Badge } from '@shopify/polaris';
import { format } from 'date-fns';
import { STATUSNEW_COLORS, STATUS_COLORS, STATUS_LABELS } from '../../constants/constants';

// import { useQuery } from 'react-apollo';
// import { GET_SHOPIFY_SHOP } from '@schemas/shopify/shop.schema';

interface Shipment {
    order: string;
    trackingNumber: string;
    courier: string;
    lastEvent: string;
    orderDate: Date;
    status: string;
}

interface ShipmentsTableProps {
    shipments: Shipment[];
    newStatuses?: boolean;
}


const styles = {
    ShipmentsTableThead: {
        fontWeight: 'bold',
        fontSize: '14px',
        color: 'black',
        letterSpacing: '.5px',
        borderColor: 'gray',
    },
    ShipmentsTableCell: {
        color: 'gray',
        width: '100%',
        display: 'block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    ShipmentsTableCenter: {
        textAlign: 'center',
    },

    ShipmentsTableLink: {
        color: 'blue',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    ShipmentsTableStatus: {
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        height: '30px',
        borderRadius: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: '.5px',
        margin: '0 auto',
    }
}

const renderItem = ([type, value], shop: string, newStatuses?: boolean) => {
    switch (type) {
        case 'order':
            return (
                <div>
                    <a target="_blank" href={`https://${shop}/admin/orders/${value.orderID}`} rel="noreferrer">
                        {value.orderName}
                    </a>
                </div>
            );
        case 'trackingNumber':
            return (
                <div>
                    <a target="_blank" href={`https://${shop}/tools/track?trackingNumber=${value}`} rel="noreferrer">
                        {value}
                    </a>
                </div>
            );
        case 'courier':
            return <span >{value}</span>;
        case 'orderDate':
            return <span >{format(value, 'MMM dd, hh:mm aaa')}</span>;
        case 'status':
            return (
                <div >
                    <Badge progress="complete" status={(newStatuses ? STATUSNEW_COLORS[value] : STATUS_COLORS[value]) || ''}>
                        {newStatuses ? value : STATUS_LABELS[value]}
                    </Badge>
                </div>
            );
        default:
            return (
                <span title={value}>
                    {value}
                </span>
            );
    }
};

const ShipmentsTable: React.FC<ShipmentsTableProps> = ({ shipments, newStatuses }) => {
    //   const { data } = useQuery(GET_SHOPIFY_SHOP, {
    //     context: { clientName: 'shopify' },
    //   });

    const data = ""

    //   const rows = useMemo(
    //     () =>
    //       shipments.map((shipment) =>
    //         Object.entries(shipment).map((item) => renderItem(item, data?.shop.myshopifyDomain, newStatuses)),
    //       ),
    //     [shipments, data?.shop.myshopifyDomain, newStatuses],
    //   );

    const rows = ""

    return (
        <div>
            <DataTable
                columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
                headings={['Order', 'Tracking Number', 'Courier', 'Last Event', 'Order Date', 'Status']}
                rows={[]}
                verticalAlign="middle"
            />
        </div>
    );
};

export default ShipmentsTable;
