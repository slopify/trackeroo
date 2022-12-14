import React, { FC, useMemo } from 'react';
import { DataTable, ProgressBar } from '@shopify/polaris';
import { BILLING_PLANS } from '../../constants/constants';
import { pluralize } from '../../helpers/pluralize';


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
      `$${planDetails.price || 0}/month`,
    ],
    ['Current Usage',<ProgressBar progress={2/50*100} />, `${shipments} ${pluralize('shipment', shipments)} this month`, `+$${additionalPayment}`],
  ];
}

const PlanTable: FC<TPlanTableProps> = (props) => {
  const rows = useMemo(() => getTablesRows(props), [props]);

  return <DataTable headings={[]} columnContentTypes={[]} rows={rows} />;
};

export default PlanTable;