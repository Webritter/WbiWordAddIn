import * as React from 'react';
import { Action } from 'redux-actions';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/DropDown'

import { IWbiOrganization } from '../services/wbi/wbi-types'

interface IProps {
  label: string;
  onChange: (org: IWbiOrganization) => void;
  organizations : [IWbiOrganization] | null;
  selected : IWbiOrganization | null;
  disabled: boolean;
}

interface IState {
}

export class WbiOrganizationDropdown extends React.Component<IProps, IState> {
  
  render(): JSX.Element {

    const { organizations, onChange, selected, disabled } = this.props;

    // check if there is a organization list
    if (organizations == null) {
      return <div></div>
    }
    
    // create the options list from the organization list
    var orgOptions: IDropdownOption[] = [];
    organizations.map(function(org) {
      let isSelected = false;
      if (selected) {
          isSelected = selected.Id == org.Id;
      }
     
      orgOptions.push({key:org.Id, text:org.Name, isSelected:isSelected})});

    const selectionChanged = function(selectedItem: IDropdownOption) {
      let org = organizations.find(org => org.Id == selectedItem.key)
      if (org) {
        onChange(org);
      }
    }

    return <Dropdown
          label='Organisation'
          options={orgOptions}
          disabled={disabled}
          onChanged={ selectionChanged }
          selectedKey = {selected? selected.Id : 0}
          /> 

  }
}
