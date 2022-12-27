/* eslint-disable prettier/prettier */
import React, { useCallback, useMemo, useState } from 'react';
import { Badge, Stack } from '@shopify/polaris';
import { BILLING_PLANS } from '../../constants/constants';
import { useWindowDimensions } from '../../hooks'

import BillingCard from './BillingCard';

const CREATE_CHARGING_PLAN = `
mutation CreateChargingPlan($plan: String!, $trial: Boolean!) {
  createChargingPlan(plan: $plan, trial: $trial) {
    confirmationUrl
  }
}
`;

interface TCreateChargingPlan {
    createChargingPlan: {
        confirmationUrl?: string;
        userErrors: {
            field?: string[];
            message?: string;
        };
    };
}


interface TBillingPlansProps {
    isFirstTime: boolean;
    activePlan?: string;
}

const acceptingBillingPlansDetails = [
    {
        description: (
            <>
                <p>50 free monthly shipments</p> <p>No extra shipments</p>
            </>
        ),
    },
    {
        description: (
            <>
                <p>100 free monthly shipments</p> <p>$0.08 per extra shipment</p>
            </>
        ),
    },
    {
        description: (
            <>
                <p>500 free monthly shipments</p> <p>$0.06 per extra shipment</p>
            </>
        ),
    },
    {
        description: (
            <>
                <p>3k free monthly shipments</p> <p>Additional plans available</p>
            </>
        ),
    },
    { description: <Badge>{'unlimited shipments'.toUpperCase()}</Badge> },
];

const getExpendedBillingPlans = (isFirstTime: boolean) => {
    return Object.values(BILLING_PLANS).map((plan, index) => {
        const res = { ...plan, ...acceptingBillingPlansDetails[index], isChecked: false };

        if (isFirstTime && plan.title === BILLING_PLANS['Essentials'].title) {
            res.isChecked = true;
        }
        if (isFirstTime && plan.title === BILLING_PLANS['Professional'].title) {
            res.isChecked = true;
        }
        if (isFirstTime && plan.title === BILLING_PLANS['Enterprise'].title) {
            res.isChecked = true;
        }

        return res;
    });
};

const getButtonContent = (isFirstTime: boolean, activePlan: string, currentPlanTitle: string) => {
    if (isFirstTime) {
        return 'START 7-DAY FREE TRIAL';
    }

    return activePlan === currentPlanTitle ? 'CURRENT PLAN' : `SWITCH TO ${currentPlanTitle.toUpperCase()}`;
};

const BillingPlans: React.FC<TBillingPlansProps> = ({ isFirstTime = true, activePlan = '' }) => {
    // we need to send billing to shopify
    const [createPlan] = ['figure out billing'];
    const [loadingParams, setLoadingParams] = useState({ plan: '', loading: false });
    const { height, width } = useWindowDimensions();

    const handleAction = () => {
        // make the plan
        // register the user for the plan
        console.log('signing up for plan...')
    };

    const plans = useMemo(() => getExpendedBillingPlans(isFirstTime), [isFirstTime]);

    return (<>
        {width < 500 &&
            <Stack>
                <div style={{ justifyContent: 'center' }}>
                    {plans.map((plan) => (
                        <BillingCard
                            key={plan.title}
                            {...plan}
                            button={{
                                onAction: () => handleAction(plan.name),
                                loading: loadingParams.plan === plan.name,
                                disabled: Boolean(loadingParams.plan) && loadingParams.plan !== plan.name,
                                content: getButtonContent(isFirstTime, activePlan, plan.title),
                                active: plan.title === activePlan,
                            }}
                        />
                    ))}
                </div>
            </Stack>}
        {width >= 500 &&
            <Stack>
                {plans.map((plan) => (
                    <BillingCard
                        key={plan.title}
                        {...plan}
                        button={{
                            onAction: () => handleAction(plan.name),
                            loading: loadingParams.plan === plan.name,
                            disabled: Boolean(loadingParams.plan) && loadingParams.plan !== plan.name,
                            content: getButtonContent(isFirstTime, activePlan, plan.title),
                            active: plan.title === activePlan,
                        }}
                    />
                ))}
            </Stack>}
    </>

    );
};

export default BillingPlans;
