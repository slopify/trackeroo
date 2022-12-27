import React, { FC, useMemo } from 'react';
import { Card, ProgressBar } from '@shopify/polaris';
import { BILLING_PLANS } from '../../constants/constants';
import { pluralize } from '../../helpers/pluralize';
import { PromiseProvider } from 'mongoose';


interface TPlanTableProps {
    plan: string;
    shipments: number;
    isTrial: boolean;
}


function getTablesRows({ plan, shipments, isTrial }: TPlanTableProps) {
    const planDetails = BILLING_PLANS[plan] || {};
    let additionalPayment: number | string = 0;

    if (plan === BILLING_PLANS['Basic'].title && shipments > 100 && !isTrial) {
        additionalPayment = ((shipments - 100) * 0.01).toFixed(2);
    }

    return [
        [
            plan,
            <React.Fragment key="plan-description">
                {planDetails.description}
                <p>{planDetails.subDescription}</p>
            </React.Fragment>,
            `${planDetails.extraShipments}`,
            `$${planDetails.price || 0}/month`,
        ],
        ['Current Usage', <ProgressBar progress={2 / 50 * 100} />, `${shipments} ${pluralize('shipment', shipments)} this month`, `+$${additionalPayment} extra shipments tracked`],
    ];
}

const PlanTable: FC<TPlanTableProps> = ({ plan, shipments, isTrial }) => {

    const maxShipments = 50;
    const additionalPrice = 0.06;
    const additionalPayment = ((shipments - maxShipments) * 0.01).toFixed(2);
    const extraShipments = 2;

    return <div style={{ margin: '10pt' }}>
        <Card title={plan}>
            <div style={{ margin: '10pt' }}>
                <ProgressBar progress={shipments / maxShipments * 100} />
                <div style={{ margin: '5pt' }}>{`Current Usage: ${shipments} ${pluralize('shipment', shipments)} this month`}</div>
            </div>
            {additionalPayment > 0 && <div>
                <div style={{display: 'flex', justifyContent: 'center', color: 'red'}}>{`You have gone over your current plan by ${extraShipments} ${pluralize('shipment', extraShipments)}`}</div>
                <div style={{ margin: '5pt' }}>{`Additional Usage Charge: $${additionalPayment} ${pluralize('shipment', shipments)} this month`}</div>
                <div style={{ margin: '5pt' }}>Upgrade plan to prevent future usage charges.</div>
                </div>}
                <div style={{padding: '5pt'}}></div>
        </Card>
    </div>
};

export default PlanTable;