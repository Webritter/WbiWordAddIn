import * as React from 'react';
import { Action } from 'redux-actions';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/DropDown'

import { IWbiLayout } from '../services/wbi/wbi-types'

interface IProps {
  label: string;
  onChange: (layout: IWbiLayout) => void;
  layouts : [IWbiLayout] | null;
  selected : IWbiLayout | null;
}


interface IProps {
  layouts : [IWbiLayout] | null;
}

interface IState {
}

export class WbiLayoutDropdown extends React.Component<IProps, IState> {
  
  render(): JSX.Element {

    const { layouts, onChange, selected } = this.props;

    // check if there is a organization list
    if (layouts == null) {
      return <div></div>
    }
    
    // create the options list from the organization list
    var layoutOptions: IDropdownOption[] = [];
    layouts.map(function(layout) {
      let isSelected = false;
      if (selected) {
          isSelected = selected.Id == layout.Id;
      }
     
      layoutOptions.push({key:layout.Id, text:layout.Name, isSelected:isSelected})});

    const selectionChanged = function(selectedItem: IDropdownOption) {
      let layout = layouts.find(layout => layout.Id == selectedItem.key)
      if (layout) {
        onChange(layout);
      }
    }



    return <Dropdown
          label='Layout'
          options={layoutOptions}
          onChanged={ selectionChanged }
          /> 

   




  }
}
