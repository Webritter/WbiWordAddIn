// lib imports
import * as React from 'react';
import { IWbiOrganization } from '../../../services/wbi/wbi-myinfo'
import { WbiOrganizationListItem } from './wbi-organization-list-item'
interface IProps {
  organizations : [IWbiOrganization] | null;
}

interface IState {
}

export class WbiOrganizationList extends React.Component<IProps, IState> {
  render(): JSX.Element {
    const { organizations } = this.props;
    if (organizations == null) {
      return <div></div>
    }

 
    const listItems = organizations.map((organization) =>
      // Correct! Key should be specified inside the array.
      <WbiOrganizationListItem key={organization.Id.toString()}
                organization={organization} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    )



  }
}

