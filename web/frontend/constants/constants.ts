export enum Status {
    All = '',
    OrderCreated = 'data_order_created',
    OrderCanceled = 'data_order_cancelled',
    Transit = 'transit',
    DestinationArrival = 'destination_arrival',
    CustomReceived = 'customs_received',
    CustomException = 'customs_exception',
    CustomRejected = 'customs_rejected',
    CustomCleared = 'customs_cleared',
    AvailableForPickup = 'delivery_available_for_pickup',
    OutForDelivery = 'delivery_out_for_delivery',
    Attempted = 'delivery_attempted',
    Exception = 'delivery_exception',
    Delivered = 'delivery_delivered',
    Return = 'exception_return',
    NotAvailable = 'not_available',
    AwaitingData = 'awaiting_data',
  }
  
  // Source: https://api.ship24.com/public/v1/couriers
  export const CourierData = [
    {
      courierCode: 'ca-post',
      courierName: 'Canada Post',
      isPost: true,
      countryCode: 'CA',
    },
    { courierCode: '4px', courierName: '4PX', isPost: false, countryCode: null },
    { courierCode: 'dhl', courierName: 'DHL', isPost: false, countryCode: null },
    { courierCode: 'fedex', courierName: 'FedEx', isPost: false, countryCode: null },
    { courierCode: 'us-post', courierName: 'USPS', isPost: true, countryCode: 'US' },
    { courierCode: 'ups', courierName: 'UPS', isPost: false, countryCode: null },
  ];
  
  export const DestinationData = [
    { name: 'Canada', code: 'CA' },
    { name: 'United States', code: 'US' },
  ];
  
  //Reverse an enum (entry -> key)
  export function getEnumKeyByEnumValue(myEnum, enumValue) {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
  }
  
  export enum StatusNew {
    WAITING_ON_FULFILLMENT = 'Waiting On Fulfillment',
    INFO_RECEIVED = 'Info Received',
    IN_TRANSIT = 'In Transit',
    OUT_FOR_DELIVERY = 'Out For Delivery',
    DELIVERED = 'Delivered',
    EXCEPTION = 'Exception',
    RETURN = 'Return',
    NOT_AVAILABLE = 'Not Available',
  }
  
  export const templateOptions = [
    { label: 'A shipment from order #1234 is about to ship', value: StatusNew.INFO_RECEIVED },
    { label: 'A shipment from order #1234 is in transit', value: StatusNew.IN_TRANSIT },
    { label: 'A shipment from order #1234 is out for delivery', value: StatusNew.OUT_FOR_DELIVERY },
    { label: 'A shipment from order #1234 has been delivered', value: StatusNew.DELIVERED },
    { label: 'A shipment from order #1234 has an exception', value: StatusNew.EXCEPTION },
  ];
  
  export const convertStatusNewtoStatus = {
    'Info Received': [Status.AwaitingData, Status.OrderCreated],
    'In Transit': [Status.Transit, Status.CustomCleared, Status.CustomReceived, Status.DestinationArrival],
    'Out For Delivery': [Status.OutForDelivery],
    Delivered: [Status.Delivered, Status.AvailableForPickup],
    Exception: [Status.Exception, Status.OrderCanceled, Status.CustomException, Status.CustomRejected, Status.Attempted],
    Return: [Status.Return],
    'Not Available': [Status.NotAvailable],
    Unknown: [],
  };
  
  export function convertStatustoStatusNew(status) {
    if (status === Status.AwaitingData || status === Status.OrderCreated) {
      return StatusNew.INFO_RECEIVED;
    } else if (
      status === Status.Transit ||
      status === Status.CustomCleared ||
      status === Status.CustomReceived ||
      status === Status.DestinationArrival
    ) {
      return StatusNew.IN_TRANSIT;
    } else if (status === Status.OutForDelivery) {
      return StatusNew.OUT_FOR_DELIVERY;
    } else if (status === Status.Delivered || status === Status.AvailableForPickup) {
      return StatusNew.DELIVERED;
    } else if (
      status === Status.Exception ||
      status === Status.OrderCanceled ||
      status === Status.CustomException ||
      status === Status.CustomRejected ||
      status === Status.Attempted
    ) {
      return StatusNew.EXCEPTION;
    } else if (status === Status.Return) {
      return StatusNew.RETURN;
    } else if (status === Status.NotAvailable) {
      return StatusNew.NOT_AVAILABLE;
    } else {
      return StatusNew.NOT_AVAILABLE;
    }
  }
  
  export enum ServerStatus {
    data_order_created = <any>'statusOrderCreated',
    data_order_cancelled = <any>'statusOrderCancelled',
    destination_arrival = <any>'statusArrival',
    customs_received = <any>'statusReceived',
    customs_exception = <any>'statusCustomsException',
    customs_rejected = <any>'statusRejected',
    customs_cleared = <any>'statusCleared',
    exception_return = <any>'statusExceptionReturn',
    delivery_available_for_pickup = <any>'statusAvailableForPickup',
    delivery_out_for_delivery = <any>'statusOutForDelivery',
    delivery_attempted = <any>'statusAttempted',
    delivery_exception = <any>'statusException',
    delivery_delivered = <any>'statusDelivered',
    not_available = <any>'notAvailable',
    awaiting_data = <any>'awaitingData',
  }
  
  export const STATUS_LABELS = {
    [ServerStatus.data_order_created]: 'Order Created',
    [ServerStatus.data_order_cancelled]: 'Order Canceled',
    [ServerStatus.destination_arrival]: 'Arrival',
    [ServerStatus.customs_received]: 'Received',
    [ServerStatus.customs_exception]: 'Custom Exception',
    [ServerStatus.customs_rejected]: 'Rejected',
    [ServerStatus.customs_cleared]: 'Cleared',
    [ServerStatus.exception_return]: 'Exception Return',
    [ServerStatus.delivery_available_for_pickup]: 'Available for Pickup',
    [ServerStatus.delivery_out_for_delivery]: 'Out for Delivery',
    [ServerStatus.delivery_attempted]: 'Attempted',
    [ServerStatus.delivery_exception]: 'Exception',
    [ServerStatus.delivery_delivered]: 'Delivered',
    [ServerStatus.not_available]: 'Not Available',
    [ServerStatus.awaiting_data]: 'Awaiting Data',
  };
  
  export enum DefaultColor {
    Primary = '#000000',
    Secondary = '#DFE3E8',
  }
  


export const STATUS_COLORS = {
  [Status.OrderCreated]: '',
  [Status.OrderCanceled]: 'warning',
  [Status.Transit]: 'info',
  [Status.DestinationArrival]: 'info',
  [Status.CustomReceived]: 'info',
  [Status.CustomCleared]: 'info',
  [Status.CustomRejected]: 'critical',
  [Status.CustomException]: 'warning',
  [Status.AvailableForPickup]: 'info',
  [Status.OutForDelivery]: 'info',
  [Status.Attempted]: 'warning',
  [Status.Delivered]: 'success',
  [Status.Exception]: 'warning',
  [Status.Return]: 'critical',
  [Status.NotAvailable]: '',
};

export const STATUSNEW_COLORS = {
  [StatusNew.INFO_RECEIVED]: 'info',
  [StatusNew.IN_TRANSIT]: 'info',
  [StatusNew.OUT_FOR_DELIVERY]: 'info',
  [StatusNew.DELIVERED]: 'success',
  [StatusNew.EXCEPTION]: 'warning',
  [StatusNew.RETURN]: 'critical',
  [StatusNew.NOT_AVAILABLE]: '',
};

export const STATUS_LABELS_INTERNAL = {
  [Status.All]: 'All',
  [Status.OrderCreated]: 'Order Created',
  [Status.OrderCanceled]: 'Order Canceled',
  [Status.Transit]: 'In Transit',
  [Status.DestinationArrival]: 'Destination Arrival',
  [Status.CustomReceived]: 'Custom Received',
  [Status.CustomException]: 'Custom Exception',
  [Status.CustomRejected]: 'Custom Rejected',
  [Status.CustomCleared]: 'Custom Cleared',
  [Status.AvailableForPickup]: 'Available for Pickup',
  [Status.OutForDelivery]: 'Out for Delivery',
  [Status.Attempted]: 'Attempted',
  [Status.Exception]: 'Exception',
  [Status.Delivered]: 'Delivered',
  [Status.Return]: 'Return',
  [Status.NotAvailable]: 'Not Available',
  [Status.AwaitingData]: 'Awaiting Data',
};

export enum PaginationDirection {
  Prev,
  Next,
}

export enum ToastLabel {
  SavedSuccessfully = 'Saved successfully!',
  SaveError = 'Save error',
  FileUploadError = 'Error Uploading File',
}

export enum DateRange {
  Custom,
  Today,
  Yesterday,
  Last7Days,
  Last30Days,
  Last90Days,
  LastMonth,
  LastYear,
  WeekToDate,
  MonthToDate,
  YearToDate,
  All,
}

export enum DateRangeOld {
  Custom,
  Today,
  Yesterday,
  Last7Days,
  Last30Days,
  Last90Days,
  LastMonth,
  LastYear,
  WeekToDate,
  MonthToDate,
  YearToDate,
  // FourthQuarter,
  // ThirdQuarter,
  // SecondQuarter,
  // FirstQuarter,
}

export const DATE_RANGE_LABELS = {
  [DateRange.Custom]: 'Custom',
  [DateRange.Today]: 'Today',
  [DateRange.Yesterday]: 'Yesterday',
  [DateRange.Last7Days]: 'Last 7 days',
  [DateRange.Last30Days]: 'Last 30 days',
  [DateRange.Last90Days]: 'Last 90 days',
  [DateRange.LastMonth]: 'Last month',
  [DateRange.LastYear]: 'Last year',
  [DateRange.WeekToDate]: 'Week to date',
  [DateRange.MonthToDate]: 'Month to date',
  [DateRange.YearToDate]: 'Year to date',
  [DateRange.All]: 'All time',
};

export const DATE_RANGE_LABELS_OLD = {
  [DateRange.Custom]: 'Custom',
  [DateRange.Today]: 'Today',
  [DateRange.Yesterday]: 'Yesterday',
  [DateRange.Last7Days]: 'Last 7 Days',
  [DateRange.Last30Days]: 'Last 30 Days',
  [DateRange.Last90Days]: 'Last 90 days',
  [DateRange.LastMonth]: 'Last month',
  [DateRange.LastYear]: 'Last year',
  [DateRange.WeekToDate]: 'Week to date',
  [DateRange.MonthToDate]: 'Month to date',
  [DateRange.YearToDate]: 'Year to date',
  // [DateRange.FourthQuarter]: '4th Quarter',
  // [DateRange.ThirdQuarter]: '3rd Quarter',
  // [DateRange.SecondQuarter]: '2nd Quarter',
  // [DateRange.FirstQuarter]: '1st Quarter',
};

export enum ProductRecommendationsPosition {
  Top = 'top',
  Bottom = 'bottom',
}

export const PRODUCT_RECOMMENDATION_OPTIONS = [
  {
    label: 'Bottom',
    value: ProductRecommendationsPosition.Bottom,
  },
  {
    label: 'Top',
    value: ProductRecommendationsPosition.Top,
  },
];

export enum BlacklistedKeywordsPosition {
  Other = 'other',
  Chinese = 'chinese',
}

export const BLACKLISTED_KEYWORDS_OPTIONS = [
  {
    label: 'Other',
    value: BlacklistedKeywordsPosition.Other,
  },
  {
    label: 'Chinese locations',
    value: BlacklistedKeywordsPosition.Chinese,
  },
];

export enum EstimateDeliveryDate {
  Created = 'order_created',
  Fulfilled = 'order_fulfilled',
}

export const ESTIMATE_DELIVERY_DATE_OPTIONS = [
  {
    label: 'order created',
    value: EstimateDeliveryDate.Created,
  },
  {
    label: 'order fulfilled',
    value: EstimateDeliveryDate.Fulfilled,
  },
];

export const BILLING_PLANS = {
  Basic: {
    name: 'Basic',
    title: 'Basic',
    subDescription: '50 free shipments per month',
    extraShipments: 'No extra shimpments',
    price: 0,
    benefitList: ['Order Lookup', 'Branded Tracking Page', 'Unlimited Custom Statuses', 'UPS, USPS, & Fedex'],
    img: '/assets/images/shoppingKart.png',
  },
  Essentials: {
    name: 'Essentials',
    title: 'Essentials',
    subDescription: '100 free shipments per month',
    extraShipments: '$0.08 per extra shipment, max 500',
    price: 9.99,
    benefitList: [
      'All basic features',
      'Remove Trackeroo branding',
      '1,200+ worldwide courier integrations',
      'Up to 500 shipments per month',
    ],
    img: '/assets/images/truck.png',
  },
  Professional: {
    name: 'Professional',
    title: 'Professional',
    subDescription: '500 free shipments per month',
    extraShipments: '$0.06 per extra shipment, max 5,000',
    price: 34.99,
    benefitList: [
      'All essential features',
      'Customizable email notifications',
      'Priority support',
      'Up to 5,000 shipments per month',
    ],
    img: '/assets/images/cartoonPlane.png',
  },
  Enterprise: {
    name: 'Enterprise',
    title: 'Enterprise',
    subDescription: '3000 free shipments per month',
    extraShipments: '$0.04 per extra shipment',
    price: 119.99,
    benefitList: [
      'All professional features',
      'Dedicated support supervisor',
      'Early access to new features',
      'Unlimited shipments per month',
    ],
    img: '/assets/images/cargoShip.png',
  },
};

export const LOOKUP_OPTIONS = [
  'order number/email & tracking number',
  'order number/email only',
  'tracking number only',
];

export const PRODUCT_RECOMMENDATION_POSITION_OPTIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
];


