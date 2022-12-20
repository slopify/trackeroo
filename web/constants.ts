export const BILLING_PLANS = {
    Basic: {
      name: 'Basic',
      title: 'Basic',
      subDescription: '50 free shipments per month, but no extra shipments',
      price: 0,
      benefitList: ['Order Lookup', 'Branded Tracking Page', 'Unlimited Custom Statuses', 'UPS, USPS, & Fedex'],
      img: '/images/shoppingKart.png',
    },
    Essentials: {
      name: 'Essentials',
      title: 'Essentials',
      subDescription: '100 free shipments per month + $0.08 per extra shipment',
      price: 9.99,
      benefitList: [
        'All basic features',
        'Remove Trackeroo branding',
        '1,200+ worldwide courier integrations',
        'Up to 500 shipments per month',
      ],
      img: '/images/earlySupporterPlan.png',
    },
    Professional: {
      name: 'Professional',
      title: 'Professional',
      subDescription: '500 free shipments per month + $0.06 per extra shipment',
      price: 34.99,
      benefitList: [
        'All essential features',
        'Customizable email notifications',
        'Priority support',
        'Up to 5,000 shipments per month',
      ],
      img: '/images/cartoonPlane.png',
    },
    Enterprise: {
      name: 'Enterprise',
      title: 'Enterprise',
      subDescription: '3000 free shipments per month + $0.04 per extra shipment',
      price: 119.99,
      benefitList: [
        'All professional features',
        'Dedicated support supervisor',
        'Early access to new features',
        'Unlimited shipments per month',
      ],
      img: '/images/cargoShip.png',
    },
  };