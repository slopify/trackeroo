//import { useHasPrioritySupport } from '@hooks/useHasPrioritySupport';
import React, { FC, useEffect } from 'react';
import { IntercomProvider, useIntercom } from 'react-use-intercom';
import { GET_CURRENT_USER } from '../schemas/shopify/shop.schema';
import { useAppQuery } from '../../hooks'


const IntercomInitializer = () => {
  const { isLoading:loading, error, data:shop } = useAppQuery({
      url: '/api/user'
  });

  console.log(shop);
  //const { hasPrioritySupport, loading: loadingSupportPriority } = useHasPrioritySupport();
  const { boot } = useIntercom();

  useEffect(() => {
    if (!shop?.myshopifyDomain || loading) return;
    boot({
      userId: shop.myshopifyDomain,
      email: shop.email,
    //   customAttributes: {
    //     priority_support: hasPrioritySupport,
    //   },
    });
  }, [boot, shop?.myshopifyDomain, shop?.email, loading]);

  return null;
};

export const CustomIntercomProvider: FC = ({ children }) => {
  return (
    <IntercomProvider appId={process.env.INTERCOM_APP_ID}>
      <IntercomInitializer />
      {children}
    </IntercomProvider>
  );
};
