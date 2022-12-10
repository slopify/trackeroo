interface SetupGuideStepData {
    name: string;
    title: string;
    disabledTitle: string;
    description: string;
    disabledDescription: string;
    rightText: string;
    buttonLink: string;
    buttonText: string;
    imgSrc: string;
  }

  interface TranslationField {
    key: string;
    label: string;
    initial: string;
  }



export const TRANSLATION_FIELDS: TranslationField[] = [
  {
    label: 'Header Title',
    key: 'headerTitle',
    initial: 'Track your order',
  },
  {
    label: 'Input Method 1 Button',
    key: 'inputMethod1Button',
    initial: 'Order Number',
  },
  {
    label: 'Input Method 2 Button',
    key: 'inputMethod2Button',
    initial: 'Tracking Number',
  },
  {
    label: 'Enter Text Field #1',
    key: 'enterTextField1',
    initial: 'Enter order number',
  },
  {
    label: 'Enter Text Field #2',
    key: 'enterTextField2',
    initial: 'Enter email',
  },
  {
    label: 'Enter Text Field #3',
    key: 'enterTextField3',
    initial: 'Enter tracking number',
  },
  {
    label: 'Primary Button',
    key: 'primaryButton',
    initial: 'Track Order',
  },
  {
    label: 'Month',
    key: 'month',
    initial: 'January, February, March, April, May, June, July, August, September, October, November, December',
  },
  {
    label: 'Estimate Days Left',
    key: 'daysLeft',
    initial: 'Days Left',
  },
  // {
  //   label: 'Numbers',
  //   key: 'numbers',
  //   initial: '?',
  // },
  // {
  //   label: 'Time format',
  //   key: 'timeFormat',
  //   initial: '?',
  // },
  {
    label: 'Status Title',
    key: 'statusTitle',
    initial: 'Status',
  },
  {
    label: 'You Order Title',
    key: 'yourOrderTitle',
    initial: 'Your Order',
  },
  {
    label: 'Order Created',
    key: 'orderCreated',
    initial: 'Order Created',
  },
  {
    label: 'In Transit',
    key: 'inTransit',
    initial: 'In Transit',
  },
  {
    label: 'Out For Delivery',
    key: 'outOfDelivery',
    initial: 'Out For Delivery',
  },
  {
    label: 'Exception',
    key: 'deliveryException',
    initial: 'Exception',
  },
  {
    label: 'Delivered',
    key: 'delivered',
    initial: 'Delivered',
  },
  {
    label: 'Exception Return',
    key: 'exceptionReturn',
    initial: 'Exception Return',
  },
  // {
  //   label: 'Expired',
  //   key: 'expired',
  //   initial: 'Expired',
  // },
  // {
  //   label: 'Failed Attempt',
  //   key: 'failedAttempt',
  //   initial: 'Failed Attempt',
  // },
  // {
  //   label: 'Info Received',
  //   key: 'infoReceived',
  //   initial: 'Info Received',
  // },
  {
    label: 'Pending',
    key: 'pending',
    initial: 'Pending',
  },
  {
    label: 'Not Available',
    key: 'notAvailable',
    initial: 'Not Available',
  },
  {
    label: 'Shipping Activity Title',
    key: 'shippingActivity',
    initial: 'Shipping Activity',
  },
  {
    label: 'Shop Now Button',
    key: 'shopNowButton',
    initial: 'Shop Now',
  },
  {
    label: 'Track Another Package',
    key: 'trackAnotherPackage',
    initial: 'Track Another Package →',
  },
  // {
  //   label: 'Package Item Number Counter',
  //   key: 'packageItemNumberCounter',
  //   initial: 'This package includes {current} of your {all} items.',
  // },
  {
    label: 'Tracking number not found',
    key: 'trackingNumberNotFound',
    initial: 'No tracking information found (please check provided tracking number or email)',
  },
  {
    label: 'Tracking information not available',
    key: 'trackingInformationNotAvailable',
    initial: 'Tracking information not available for this order',
  },
  {
    label: 'Recommendation Products Section Title',
    key: 'recommendationProductsSectionTitle',
    initial: 'You May Also Like',
  },
  {
    label: 'Recommendation Product Action',
    key: 'recommendationProductAction',
    initial: 'View Product',
  },
];
export const SETUP_GUIDE_STEPS: SetupGuideStepData[] = [
  {
    name: 'configureBranding',
    title: 'Configure branding',
    disabledTitle: 'Configure branding',
    description: 'Make sure Trackeroo is on brand',
    disabledDescription: 'Make sure Trackeroo is on brand',
    rightText:
      "To make Trackeroo on-brand for your visitors, you need to set your brand colours in the tracking page editor. It's simple and takes only 1 minute.",
    buttonText: 'Go to Tracking Page Editor',
    buttonLink: '/editor',
    imgSrc: '/gif/configureBranding.gif',
  },
  {
    name: 'productRecommendations',
    title: 'Product recommendations',
    disabledTitle: 'Product recommendations',
    description: 'Show customers products they might want on the tracking page',
    disabledDescription: 'This will show customers products they might want on the tracking page',
    rightText:
      'Earn extra revenue by showing visitors product recommendations on the tracking page. You can earn extra revenue everytime a visitor makes another purchase from the tracking page.',
    buttonText: 'Go to Tracking Page Editor',
    buttonLink: '/editor',
    imgSrc: '',
  },
  {
    name: 'deliveryNotifications',
    title: 'Delivery notifications',
    disabledTitle: 'Delivery notifications',
    description: 'Send Shopify native email notifications',
    disabledDescription: 'Send Shopify native email notifications',
    rightText:
      'Send Shopify native email notifications when your shipments are on Out for Delivery and Delivered status. You will need to <a target="_blank" href ="https://store.myshopify.com/admin/settings/notifications"> enable this in Shopify</a> and Trackeroo.',
    buttonText: 'Enable in Trackeroo',
    buttonLink: '/notifications',
    imgSrc: '',
  },
  {
    name: 'addToStorefront',
    title: 'Add to storefront',
    disabledTitle: 'Add to storefront',
    description: 'Add the tracking page to your storefront’s navigation',
    disabledDescription: 'Add the tracking page to your storefront’s navigation',
    rightText:
      '<a class="copyIcon" href ="javascript: void(0);">store.myshopify.com/tools/track</a></br></br>You can add Trackeroo to your storefront by copying the URL and adding it to your navigation. <a target="_blank" href ="javascript: void(0);">Click here for a tutorial</a>',
    buttonText: 'Open Navigation Page',
    buttonLink: '/editor',
    imgSrc: '',
  },
];

export const COMMENTS = {
  2: 'FREE expert setup is amazing! I recommend everyone to use this option, they walk you through everything and it looks so good now.',
  3: 'This is the best Tracking App I have used so far, very accurate easy to customize and just very nice and clean looking features.',
  4: 'One of the best apps for tracking we have come across, so easy to use with no messing about, customer service is absolutely brilliant.',
};
