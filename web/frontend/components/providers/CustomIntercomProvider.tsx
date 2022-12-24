//import { useHasPrioritySupport } from '@hooks/useHasPrioritySupport';
import React, { FC, useEffect } from 'react';
import { IntercomProvider, useIntercom } from 'react-use-intercom';
import { GET_CURRENT_USER } from '../schemas/shopify/shop.schema';
import { useAppQuery } from '../../hooks';

const IntercomInitializer = () => {
    const { isLoading: loading, error, data: shop } = useAppQuery({
        url: '/api/user'
    });
    const { boot } = useIntercom();
    console.log(process.env)

    useEffect(() => {
        if (!shop?.domain || loading) return;
        boot({
            userId: shop.domain,
            email: shop.email
        });
    }, [boot, shop?.domain, shop?.email, loading]);
    return null;
};


export const CustomIntercomProvider: FC = ({ children }) => {
    return (
        <IntercomProvider appId={"okqa3wwq"}>
            <><IntercomInitializer />
                {children}
            </>
        </IntercomProvider>
    );
};
