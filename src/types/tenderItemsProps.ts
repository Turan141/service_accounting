interface IReferenceTenderProps {
    name?: string;
    description?: string;
    masterCode?: string;
    parentMasterCode?: any;
    properties?: {};
  }
  
  interface IPropertiesTenderProps{
    endPlan: string;
    startPlan: string;
    additionalInfo: string;
    service: string;
    serviceName: string;
  };
  
  export interface ITenderSpecificProps {
    additionalInfo?: string | number;
    additionalInfo_watersystemmaintenance?: any;
    aircraft?: string;
    aircraftName?: string;
    aircraftReference?: IReferenceTenderProps;
    aircraftType?: string;
    aircraftTypeName?: string;
    aircraftTypeReference?: IReferenceTenderProps;
    airline?: string;
    company?: string;
    companyName?: string;
    companyReference?: IReferenceTenderProps;
    createdAt?: number;
    createdBy?: string;
    customer?: string;
    customerName?: string;
    customerReference?: IReferenceTenderProps;
    customerSign?: any;
    dispatcherSign?: any;
    endPlan?: string;
    forcedDownTime?: any;
    garageNumberOfSpecialEquipment?: any;
    heatingPoints?: any;
    heatingPointsMasterCodes?: any;
    id?: number;
    items?: any;
    lastModifiedAt?: number;
    lastModifiedBy?: string;
    lavatoryType?: any;
    number?: string;
    parking?: string;
    parkingName?: string;
    parkingReference?: IReferenceTenderProps;
    properties?: IPropertiesTenderProps;
    service?: string;
    serviceName?: string;
    serviceReference?: IReferenceTenderProps;
    startPlan?: string;
    status?: string;
    watersystemmaintenance?: string;
    passengersCount: string | number;
  }