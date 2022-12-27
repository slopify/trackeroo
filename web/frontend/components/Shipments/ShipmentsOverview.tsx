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

    console.log(shipments)

    return (
        <Layout.Section>
            <Card sectioned>
                <Heading>Shipment Overview</Heading>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinner />
                    </div>
                ) : (
                    <DataTable
                        columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
                        headings={Object.entries(StatusNew).map((item) => item[1])}
                        rows={[]}
                        verticalAlign="middle"
                    />)}
            </Card>
        </Layout.Section>
    )
}