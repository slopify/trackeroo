import { useAppQuery } from "../../hooks"
import {
    Card,
    Layout,
    DataTable,
    Spinner
} from "@shopify/polaris";

import { StatusNew } from '../../constants/constants';
import Heading from '../Plans/Heading';
import React, { useState, useCallback } from "react";
import { loadavg } from "os";

const styles = {
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    }
}

export const ShipmentsOverview = () => {

    const { isLoading: loading, error, data: shipments } = useAppQuery({
        url: '/api/shipments-overview'
    });

    const shipmentCategoryCounts = [0, 0, 0, 0, 0, 0, 0, 0]
    if (!loading) {
        for (const shipment of shipments) {
            const status = shipment?.fulfillment?.currentStep;
            switch (status) {
                case 'Waiting For Fulfilllment':
                    shipmentCategoryCounts[0]++;
                    break;
                case 'Processing Shipment':
                    shipmentCategoryCounts[1]++;
            }
        }
    }

    return (
        <Layout.Section>
            <Card sectioned>
                <Heading>Shipments Overview</Heading>
                Last 30 days
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinner />
                    </div>
                ) : (
                    <DataTable
                        columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text', 'text']}
                        headings={Object.entries(StatusNew).map((item) => item[1])}
                        rows={[shipmentCategoryCounts]}
                        verticalAlign="middle"
                    />)}
            </Card>
        </Layout.Section>
    )
}