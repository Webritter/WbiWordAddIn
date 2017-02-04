// lib imports
import * as React from 'react';
import { IWbiOrganization } from '../../../services/wbi/wbi-myinfo'
import { WbiOrganizationList } from './wbi-organization-list';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

interface IProps {
  firstName: string;
  lastName: string
  organizations : [IWbiOrganization] | null;
  isLoading: boolean;
  errorMessage: string | null,
}

interface IState {
}

export class WbiMyInfo extends React.Component<IProps, IState> {
  render(): JSX.Element {
    const {
      firstName,
      lastName,
      organizations,
      isLoading,
      errorMessage
    } = this.props;

    return (
        <div>
          <table className="ms-Table">
            <tbody>
              <tr className="ms-Table-row">
                <td className="ms-Table-cell ms-font-xl">Vorname</td>
                <td className="ms-Table-cell ms-font-xl">{firstName}</td>
              </tr>
              <tr className="ms-Table-row">
                <td className="ms-Table-cell ms-font-xl">Nachname</td>
                <td className="ms-Table-cell ms-font-xl">{lastName}</td>
              </tr>
              <tr className="ms-Table-row">
                <td className="ms-Table-cell ms-font-xl">Organisationen</td>
                <td className="ms-Table-cell ms-font-xl"><WbiOrganizationList organizations = {organizations} /></td>
              </tr>
              </tbody>
            </table>
          {(isLoading)? <Spinner /> : ''}
          <div>{errorMessage}</div>
        </div>

    );
  }
}

