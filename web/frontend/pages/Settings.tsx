import React, { useCallback, useMemo } from 'react';
import { Button, Card, Layout, TextField, Page, Form, Grid } from '@shopify/polaris';
import Heading from '../components/Plans/Heading';
import SettingCheckboxCard from '../components/Settings/SettingCheckboxCard';
import SettingDeliveryDate from '../components/Settings/SettingDeliveryDate';
import { EstimateDeliveryDate } from '../constants/constants'
import { SETUP_GUIDE_STEPS, TRANSLATION_FIELDS } from '../constants/defaultValues';
//import { useMutation, useQuery } from 'react-apollo';
//import { GET_SETUP_GUIDE_STEPS, UPDATE_SETUP_GUIDE, GET_SHOP } from '@schemas/shop.schema';
//import useSettings from '../hooks/useSettings';


const Settings: React.FC = () => {
    // const { data, loading, update } = useSettings();
    // const stepsData = useQuery(GET_SETUP_GUIDE_STEPS);
    // const [updateGuideSteps] = useMutation(UPDATE_SETUP_GUIDE);

    const data = ''
    const loading = false
    const update = ''
    const initialValues = "GET THE INIT VALUES"

    const onChangeCheckbox = async (name, value) => {
        console.log(name, value)
    };
    //     if (name === 'notifications') {
    //         const optionGuideKey =
    //             SETUP_GUIDE_STEPS.find((el) => el.name.includes('notifications') || el.title.includes('notifications')).name ||
    //             'deliveryNotifications';
    //         if (stepsData?.data && !stepsData?.data?.shop?.setupGuide?.includes(optionGuideKey)) {
    //             updateGuideSteps({
    //                 variables: {
    //                     setupGuideInput: {
    //                         setupGuide: [...(stepsData?.data?.shop?.setupGuide || []), optionGuideKey],
    //                     },
    //                 },
    //             });
    //         }
    //     } else if (name === 'trackingUrl') {
    //         const optionGuideKey =
    //             SETUP_GUIDE_STEPS.find((el) => el.name.includes('storefront') || el.title.includes('storefront')).name ||
    //             'addToStorefront';
    //         if (stepsData?.data && !stepsData?.data?.shop?.setupGuide?.includes(optionGuideKey)) {
    //             updateGuideSteps({
    //                 variables: {
    //                     setupGuideInput: {
    //                         setupGuide: [...(stepsData?.data?.shop?.setupGuide || []), optionGuideKey],
    //                     },
    //                 },
    //             });
    //         }
    //     }
    //     await update({
    //         [name]: value,
    //     });
    // };

    const onSubmit = useCallback(
        async (event) => {
            await console.log('submitting: ', event)
            //await update(event);
        }, []
        //[update],
    );

    //const { data: shopData, loading: shopLoading } = useQuery(GET_SHOP);
    const shopData = ""
    const shopLoading = false
    const plansWithEmails = ['Enterprise', 'Professional'];

    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Heading element="h1" color="#121212">
                        Settings
                    </Heading>
                </Layout.Section>
                <Layout.Section fullWidth>
                    <Form onSubmit={onSubmit}>

                        <Layout.Section><SettingCheckboxCard
                            onChange={onChangeCheckbox}
                            label="Tracking URL"
                            name="trackingUrl"
                            checked={true}
                            disabled={loading}
                            noAccess={false}
                            description="Change the tracking URL that shows on order confirmation and in your Shopify dashboard to your branded tracking page (recommended)"
                        /></Layout.Section>

                        <Layout.Section><SettingDeliveryDate
                            onChange={onChangeCheckbox}
                            startDays={5}
                            endDays={15}
                            selected={''}
                            label="Estimated Delivery Time"
                            switcherLabel="Manual estimated delivery time"
                            name="deliveryDateEnabled"
                            checked={false}
                            disabled={loading}
                            noAccess={false}
                            description="Use a manual estimated delivery time when it’s unavailable from the courier."
                        /></Layout.Section>
                    </Form>
                </Layout.Section>
                <Layout.Section>
                    <Button submit primary>
                        Save
                    </Button>
                </Layout.Section>
            </Layout >
        </Page >
    );
};

export default Settings;
