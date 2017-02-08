
// Get the latest foreign exchange reference rates in JSON format.

export interface IWbiMyInfoResponse {
  FirstName: string;
  LastName: string
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
  Url: string;
  Owner: string;
  Organization: IWbiOrganization | null;
  Layout : IWbiLayout | null;
  
 }

