// lib imports
import * as React from 'react';
import { IWbiOrganization } from '../../../services/wbi/wbi-myinfo'
interface IProps {
  organization : IWbiOrganization;
}

interface IState {
}

export class WbiOrganizationListItem extends React.Component<IProps, IState> {
  render(): JSX.Element {
    const { organization } = this.props;

    return (
      <li key={organization.Id.toString()}>
       {organization.Name}
      </li>

    );
  }
}

