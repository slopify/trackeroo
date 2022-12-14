import React from 'react';
import { Page, Layout, Card, Link } from '@shopify/polaris';
import Heading from '../components/Plans/Heading';
import FullscreenEditor from '../components/Editor/FullScreen';

const Tutorials: React.FC = () => {
    const data = {
        shop: {
            myshopifyDomain: "https://test-forced-redirect-cy.myshopify.com"
        }
    }
    return (
        <Page>
            <Layout>

                <Layout.Section>
                    <Heading element="h1"
                        subtext='Use this editor to style your tracking page to your brand. If you need help with any custom design, message us.'
                        color="#121212">
                        Tracking Page
                    </Heading>
                </Layout.Section>
                <FullscreenEditor />
                <Layout.Section>
                    <Card sectioned>
                        <Heading>Current View</Heading>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Link url={`${data.shop.myshopifyDomain}/tools/track?trackingNumber=mock`} external>
                        View on storefront
                    </Link>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default Tutorials;
