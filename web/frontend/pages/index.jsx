import {
    Card,
    Page,
    Layout,
    TextContainer,
    Image,
    Stack,
    Link,
    DataTable,
    Banner
} from "@shopify/polaris";

import { StatusNew } from '../constants/constants';
import Heading from '../components/Plans/Heading';

import { trophyImage } from "../assets";
import Chart from "../components/Shipments/ShipmentChart";
import { useState } from "react";

export default function HomePage() {
    const [showSetUpBanner, setShowSetUpBanner] = useState(true)

    const handleSuccessBannerDismiss = () => {
        setShowSetUpBanner(false)
        // query to perm make false.
    }



    return (
        <Page>
            <Layout>
                <Layout.Section fullWidth>
                    <Heading element="h1" color="#121212">
                        Welcome to Trackeroo{' '}
                        <span role="img" aria-label="Wave emoji">
                            👋
                        </span>
                    </Heading>
                </Layout.Section>

                {showSetUpBanner && <Banner
                    title="Your tracking page has been made successfully. You will need to add it to your navbar for customers to access."
                    status="success"
                    action={{ content: 'View tracking page' }}
                    secondaryAction={{content: 'Watch set up tutorial'}}
                    onDismiss={() => handleSuccessBannerDismiss()}
                />}

                <Layout.Section>
                    <Card sectioned>
                        <Heading>Shipment Overview</Heading>
                        <DataTable
                            columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
                            headings={Object.entries(StatusNew).map((item) => item[1])}
                            rows={[]}
                            verticalAlign="middle"
                        />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card sectioned>
                        <Heading>Shipments Tracked</Heading>
                        <Chart loading={false} switcher title="Last 30 days" dataSet={null} type="column" />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card sectioned>
                        <Stack
                            wrap={false}
                            spacing="extraTight"
                            distribution="trailing"
                            alignment="center"
                        >
                            <Stack.Item fill>
                                <TextContainer spacing="loose">
                                    <Heading>Lets build a nice dashboard looking at shipments</Heading>
                                    <p>
                                        Your app is ready to explore! It contains everything you
                                        need to get started including the{" "}
                                        <Link url="https://polaris.shopify.com/" external>
                                            Polaris design system
                                        </Link>
                                        ,{" "}
                                        <Link url="https://shopify.dev/api/admin-graphql" external>
                                            Shopify Admin API
                                        </Link>
                                        , and{" "}
                                        <Link
                                            url="https://shopify.dev/apps/tools/app-bridge"
                                            external
                                        >
                                            App Bridge
                                        </Link>{" "}
                                        UI library and components.
                                    </p>
                                    <p>
                                        Ready to go? Start populating your app with some sample
                                        products to view and test in your store.{" "}
                                    </p>
                                    <p>
                                        Learn more about building out your app in{" "}
                                        <Link
                                            url="https://shopify.dev/apps/getting-started/add-functionality"
                                            external
                                        >
                                            this Shopify tutorial
                                        </Link>{" "}
                                        📚{" "}
                                    </p>
                                </TextContainer>
                            </Stack.Item>
                            <Stack.Item>
                                <div style={{ padding: "0 20px" }}>
                                    <Image
                                        source={trophyImage}
                                        alt="Nice work on building a Shopify app"
                                        width={120}
                                    />
                                </div>
                            </Stack.Item>
                        </Stack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
