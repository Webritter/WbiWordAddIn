
export const WBI_HOST = 'http://wbidatabackend2.azurewebsites.net';
//export const WBI_HOST = 'http://localhost:44351';
export const WBI_AUTH_URL = WBI_HOST + '/token';
export const WBI_DOCUMENTS_URL = WBI_HOST + '/api/documents';
export const WBI_MYINFO_URL =  WBI_HOST + '/api/my/info';
export const WBI_MEMBERS_URL =  WBI_HOST + '/api/members';

export interface IWbiMyInfoResponse {
  FirstName: string;
  LastName: string;
  Organizations: [IWbiOrganization] | null;
 }

export interface IWbiLayout {
  Id: number,
  Name: string,
  Info: string,
  Header: string,
  Footer: string
}
export interface IWbiOrganization {
  Id: number,
  Name: string,
  Address: string,
  Phone: string,
  Info: string,
  Contact: string,
  Layouts: [IWbiLayout] | null
}

export const nullWbiMyInfoResponse : IWbiMyInfoResponse = {
  FirstName: "",
  LastName: "",
  Organizations: null
}

export interface IWbiDocument {
  Id: string;
  Title: string;
  Description: string;
  Version: string;
  Url: string;
  Owner: IWbiMember | null;
  Organization: IWbiOrganization | null;
  Layout : IWbiLayout | null;
  
 }

 export interface IWbiPatchDocument {
  Title: string;
  Description: string;
  Version: string;
  Url: string;
  OwnerId?: number;
  OrganizationId? :number;
  LayoutId? : number;
  
 }

 export interface IWbiAddDocument
 {
  Title: string;
  Description: string;
  Version:string;
  Url: string;
  OwnerId: number;
  OrganizationId: number;
  LayoutId: number
}

export interface IWbiMember {
  Id: number,
  IdentityCode: string,
  FirstName: string,
  LastName: string,
  Info: string,
  OrganizationId : number,
  OrganizationName : string
}

