/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseComponent, assign, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { NormalPeoplePicker,  IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { IWbiMember } from '../services/wbi/wbi-types';
import { searchForMembers } from '../services/wbi/wbi-members'


interface IProps {
  label: string;
  onChange: (owner: IWbiMember) => void;
  selected : IWbiMember | null;
  disabled: boolean;
  organizationId : number;
}

interface IState {

}

interface IPersonaPropsExt extends IPersonaProps {
  organizationId? : number;
}

interface IPersonaWithMenuExt extends IPersonaWithMenu {
  organizationId? : number;
}
const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading'
};

export class WbiOwnerPicker extends BaseComponent<IProps, IState> {
  private _peopleList :IPersonaPropsExt[];
  private contextualMenuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      icon: 'circlePlus',
      name: 'New'
    },
    {
      key: 'upload',
      icon: 'upload',
      name: 'Upload'
    },
    {
      key: 'divider_1',
      name: '-',
    },
    {
      key: 'rename',
      name: 'Rename'
    },
    {
      key: 'properties',
      name: 'Properties'
    },
    {
      key: 'disabled',
      name: 'Disabled item',
      disabled: true
    }
  ];

  // function to convert a WbiMember to a selectable persona 
  convertMemberToPersonaWithMenu = (member: IWbiMember) : IPersonaWithMenuExt => {
        let target: IPersonaWithMenuExt = {};
        target.organizationId = member.OrganizationId;
        target.key =member.Id;
        target.primaryText = (member.Info) ? member.Info : member.LastName + " " + member.FirstName;
        target.secondaryText = member.OrganizationName;
        target.imageInitials = (!!member.FirstName && !!member.LastName) ?  member.LastName.substring(0,1) + member.FirstName.substring(0,1) : (member.LastName) ? member.LastName.substring(0,2) : "";
        assign(target, { menuItems: this.contextualMenuItems, member: member });
        return(target);
  }

  componentDidMount() {
    searchForMembers(this.props.organizationId).then((members:IWbiMember[]) => {
      members.forEach((member: IWbiMember) => {      
        this._peopleList.push(this.convertMemberToPersonaWithMenu(member));
      })
    })
  }

  constructor() {
    super();
    this._peopleList = [];
    /*
    searchForMembers(this.props.organizationId).then((members:IWbiMember[]) => {
      members.forEach((member: IWbiMember) => {      
        this._peopleList.push(this.convertMemberToPersonaWithMenu(member));
      })
    })
    */


  }

  public render() {
   
    let currentSelected: IPersonaProps[] = [];
    if (this.props.selected) {
      currentSelected.push(this.convertMemberToPersonaWithMenu(this.props.selected));
    }
    //currentSelected = people.slice(0,3);
    if (this.props.disabled) {
      return(<div></div>);
    }
    return(
      <div>
        <Label >{this.props.label}</Label>
        <NormalPeoplePicker
          onResolveSuggestions={ this._onFilterChanged }
          getTextFromItem={ (persona: IPersonaProps) => (persona.primaryText) ? persona.primaryText: ""  }
          className={ 'ms-PeoplePicker' }
          onGetMoreResults={ this._onFilterChanged }
          pickerSuggestionsProps={ suggestionProps }
          key={ 'normal' } 
          onChange = {this._onChange}
          defaultSelectedItems={ currentSelected }
        />
      </div>
    );
  }

 @autobind
  private _onChange(persons: any[] | undefined) {
    if (persons != undefined) {
      if (persons.length == 0) {
        this.props.onChange(null);
      } else {
        this.props.onChange(persons[0].member)
      }
    }
  }

  @autobind
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByOrganizationAndText(this.props.organizationId, filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return filteredPersonas;
    } else {
      return [];
    }
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this._peopleList.filter(item => this._doesTextStartWith(item.primaryText, filterText));
  }
  private _filterPersonasByOrganizationAndText(filterOrganizationId: number, filterText: string): IPersonaPropsExt[] {
    return this._peopleList.filter(item => item.organizationId == filterOrganizationId && this._doesTextStartWith(item.primaryText, filterText));
  }

  private _doesTextStartWith(text: string | undefined, filterText: string): boolean {
    if (text == undefined) return false;
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }


}