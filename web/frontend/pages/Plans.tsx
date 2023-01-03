import React from 'react';
import { Card, Page, Layout, Banner, Spinner } from "@shopify/polaris";
import { useAppQuery } from "../hooks";
import { useWindowDimensions } from '../hooks'
import Heading from '../components/Plans/Heading';
import PlanTable from '../components/Plans/PlanTable'
import PlanTableMobile from '../components/Plans/PlanTableMobile';
import BillingPlans from '../components/Billling/BillingPlans';
import { isAfter } from 'date-fns';


interface TGetBillingDetails {
    shopBillingDetails: any;
}

const Plan: React.FC = () => {

    const { height, width } = useWindowDimensions();
    const { isLoading, error, data } = useAppQuery({
        url: '/api/user'
    });

    if (isLoading) return (<Page fullWidth>
        <Layout>
            <Layout.Section>

                <Heading element="h1" color="#121212">
                    <div style={{ paddingLeft: '15pt' }}>
                        Current Plan
                    </div>
                </Heading>
            </Layout.Section>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: "center", width: '100%' }}>
                <Spinner />
            </div>
        </Layout>
    </Page >);

    let isFirstTime = true;
    if (data?.billing?.plan) {
        isFirstTime = false;
    }

    const needsBillingBanner = () => {
        return (<div style={{ display: 'flex', justifyContent: 'center', alignContent: "center", width: '100%' }}><Banner
            title="You must sign up for a plan to use the app."
            status="info">
        </Banner></div>
        )
    };

    return (
        <Page fullWidth>
            <Layout>
                <Layout.Section>
                    <Heading element="h1" color="#121212">
                        <div style={{ paddingLeft: '5pt' }}>
                            Current Plan
                        </div>
                    </Heading>
                </Layout.Section>
                {isFirstTime && needsBillingBanner()}
                {!isFirstTime &&
                    <Layout.Section >
                        {width < 500 ? <PlanTableMobile
                            plan={data?.billing?.plan}
                            shipments={2}
                            isTrial={isAfter(new Date(data?.billing?.trialEnd), new Date())}
                        /> :
                            <Card>
                                <PlanTable
                                    plan={data?.billing?.plan}
                                    shipments={2}
                                    isTrial={isAfter(new Date(data?.billing?.trialEnd), new Date())}
                                />
                            </Card>
                        }
                    </Layout.Section>
                }

                <Layout.Section>
                    {width < 500 ?
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BillingPlans isFirstTime={isFirstTime} activePlan={data?.billing?.plan} />
                        </div> : <BillingPlans isFirstTime={isFirstTime} activePlan={data?.billing?.plan} />}
                </Layout.Section>

                <Layout.Section></Layout.Section>
            </Layout>
        </Page>
    );
};

export default Plan;
