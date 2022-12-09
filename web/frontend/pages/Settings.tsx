import React, { useCallback, useMemo } from 'react';
import { Button, Card, Layout, TextField } from '@shopify/polaris';
import { Form, Formik } from 'formik';
import { get } from 'lodash';
import isEqual from 'lodash/isEqual';
import Heading from '@components/common/Heading';
import SettingCheckboxCardImage from '@components/SettingCheckboxCardImage';
import useSettings from '@hooks/useSettings';
import SettingCheckboxCardImageEmpty from '@components/SettingCheckboxCardImageEmpty';
import SettingDeliveryDate from '@components/SettingDeliveryDate';
import { EstimateDeliveryDate } from '@constants/constants';
import { SETUP_GUIDE_STEPS, TRANSLATION_FIELDS } from '@constants/defaultValues';
//import { useMutation, useQuery } from 'react-apollo';
//import { GET_SETUP_GUIDE_STEPS, UPDATE_SETUP_GUIDE, GET_SHOP } from '@schemas/shop.schema';


const Settings: React.FC = () => {
  const { data, loading, update } = useSettings();
  const stepsData = useQuery(GET_SETUP_GUIDE_STEPS);
  const [updateGuideSteps] = useMutation(UPDATE_SETUP_GUIDE);
  const initialValues = useMemo(
    () => ({
      translations: TRANSLATION_FIELDS.map(({ key, initial }, i) => {
        const value =
          get(data, `translations.${i}.key`, null) === key ? get(data, `translations.${i}.value`, initial) : initial;

        return {
          key,
          value,
        };
      }),
      notifications: get(data, 'notifications', false),
      trackingUrl: get(data, 'trackingUrl', false),
      deliveryDateFrom: get(data, 'deliveryDateFrom', EstimateDeliveryDate.Created),
      deliveryDateStartDays: get(data, 'deliveryDateStartDays', '10'),
      deliveryDateEndDays: get(data, 'deliveryDateEndDays', '15'),
      deliveryDateEnabled: get(data, 'deliveryDateEnabled', false),
    }),
    [data],
  );

  const onChangeCheckbox = async (name, value) => {
    if (name === 'notifications') {
      const optionGuideKey =
        SETUP_GUIDE_STEPS.find((el) => el.name.includes('notifications') || el.title.includes('notifications')).name ||
        'deliveryNotifications';
      if (stepsData?.data && !stepsData?.data?.shop?.setupGuide?.includes(optionGuideKey)) {
        updateGuideSteps({
          variables: {
            setupGuideInput: {
              setupGuide: [...(stepsData?.data?.shop?.setupGuide || []), optionGuideKey],
            },
          },
        });
      }
    } else if (name === 'trackingUrl') {
      const optionGuideKey =
        SETUP_GUIDE_STEPS.find((el) => el.name.includes('storefront') || el.title.includes('storefront')).name ||
        'addToStorefront';
      if (stepsData?.data && !stepsData?.data?.shop?.setupGuide?.includes(optionGuideKey)) {
        updateGuideSteps({
          variables: {
            setupGuideInput: {
              setupGuide: [...(stepsData?.data?.shop?.setupGuide || []), optionGuideKey],
            },
          },
        });
      }
    }
    await update({
      [name]: value,
    });
  };

  const onSubmit = useCallback(
    async (event) => {
      await update(event);
    },
    [update],
  );

  const { data: shopData, loading: shopLoading } = useQuery(GET_SHOP);
  const plansWithEmails = ['Enterprise', 'Professional'];
  const needsPlanUpgrade = !plansWithEmails.includes(shopData?.shop?.billing?.plan);

  return (
    <Layout>
      <div className="Settings">
        <Layout>
          <Layout.Section fullWidth>
            <Heading element="h1" color="#121212">
              Settings
            </Heading>
          </Layout.Section>
          <Layout.Section fullWidth>
            <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
              {({ values, setFieldValue, dirty, initialValues }) => (
                <Form className={styles.Settings__form}>
                  <SettingCheckboxCardImage
                    onChange={onChangeCheckbox}
                    label="Notifications"
                    name="notifications"
                    checked={values.notifications}
                    disabled={loading || shopLoading || needsPlanUpgrade}
                    noAccess={needsPlanUpgrade}
                    description="Use Shopify’s shipping template to send notifications when packages are Out for Delivery and Delivered."
                  />

                  <SettingCheckboxCardImageEmpty
                    onChange={onChangeCheckbox}
                    label="Tracking URL"
                    name="trackingUrl"
                    checked={values.trackingUrl}
                    disabled={loading}
                    noAccess={false}
                    description="Change the tracking URL that shows on order confirmation and in your Shopify dashboard to your branded tracking page (recommended)"
                  />

                  <SettingDeliveryDate
                    onChange={onChangeCheckbox}
                    startDays={values.deliveryDateStartDays}
                    endDays={values.deliveryDateEndDays}
                    selected={values.deliveryDateFrom}
                    label="Estimated Delivery Time"
                    switcherLabel="Manual estimated delivery time"
                    name="deliveryDateEnabled"
                    checked={values.deliveryDateEnabled}
                    disabled={loading}
                    noAccess={false}
                    description="Use a manual estimated delivery time when it’s unavailable from the courier."
                  />

                  <div className={styles.Settings__card}>
                    <Card sectioned title="Translations">
                      <p className={styles.Settings__cardDescription}>
                        Change the language strings shown to your customers on the tracking page.
                        <div className={styles.Settings__submit}>
                          <Button submit primary disabled={!dirty || isEqual(initialValues, values)} loading={loading}>
                            Save
                          </Button>
                        </div>
                      </p>
                      <div className={styles.Settings__cardInputs}>
                        {TRANSLATION_FIELDS.map(({ label, key }, i) => (
                          <div className={styles.Settings__cardInput} key={key}>
                            <TextField
                              autoComplete="off"
                              label={label}
                              name={key}
                              value={values.translations[i].value}
                              onChange={(value) =>
                                setFieldValue(`translations.${i}`, {
                                  key: values.translations[i].key,
                                  value,
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  <div className={styles.Settings__submit}>
                    <Button submit primary disabled={!dirty || isEqual(initialValues, values)} loading={loading}>
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Layout.Section>
      </div>
    </Layout>
  );
};

export default Settings;
