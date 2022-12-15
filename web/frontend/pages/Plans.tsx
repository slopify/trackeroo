import React from 'react';
import { Card, Page, Layout, TextContainer, Spinner } from "@shopify/polaris";
import { useAppQuery } from "../hooks";
import Heading from '../components/Plans/Heading';
import PlanTable from '../components/Plans/PlanTable'
import BillingPlans from '../components/Billling/BillingPlans';
import { isAfter } from 'date-fns';

//import { ShopBillingDetails } from '../../../server/schemas/Shop';

interface TGetBillingDetails {
    shopBillingDetails: any;
}

const Plan: React.FC = () => {

    // const { isFetching, data } = useAppQuery<TGetBillingDetails>(GET_BILLING_DETAILS);
    const isFetching = false
    const data = {
        shopBillingDetails: {
            billing: {
                plan: 'Basic',
            },
            shipments: 2,
        }
    }

    if (isFetching) return <Spinner />;
    let isFirstTime = true;
    if (data.shopBillingDetails.billing.plan) {
        isFirstTime = false;
    }

    return (
        Boolean(data) && (
            <Page fullWidth>
                <Layout>
                    <Layout.Section>
                        <Heading element="h1" color="#121212">
                            Current Plan
                        </Heading>
                    </Layout.Section>
                    <Layout.Section >
                        <Card>
                            <PlanTable
                                plan={data.shopBillingDetails.billing.plan}
                                shipments={data.shopBillingDetails.shipments}
                                isTrial={isAfter(new Date(data.shopBillingDetails.billing.trialEnd), new Date())}
                            />
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <BillingPlans isFirstTime={isFirstTime} activePlan={data.shopBillingDetails.billing.plan} />
                    </Layout.Section>
                    <Layout.Section></Layout.Section>
                </Layout>
            </Page>
        )
    );
};

export default Plan;
