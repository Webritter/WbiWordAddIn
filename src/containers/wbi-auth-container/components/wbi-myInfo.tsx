// lib imports
import * as React from 'react';

import {IWbiMyInfoReducer} from '../../../store/wbi-myinfo-reducer'
import { WbiOrganizationList } from './wbi-organization-list';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import {Button, ButtonType} from 'office-ui-fabric-react/lib/Button';

interface IProps {
  info : IWbiMyInfoReducer;
  onRequestClick: any;
}

interface IState {
}

export class WbiMyInfo extends React.Component<IProps, IState> {
  render(): JSX.Element {
    const { info,onRequestClick } = this.props;

    if (info.myInfo == null){
      return (
        <div>
        <Button
          disabled={ info.isLoading  }
          description="Info"
          buttonType={ ButtonType.primary } onClick={onRequestClick}
          >Info
        </Button>
        </div>
      )
    }
    return (
        <div>
          <table className="ms-Table">
            <tbody>
              <tr className="ms-Table-row">
                <td className="ms-Table-cell ms-font-xl">Vorname</td>
                <td className="ms-Table-cell ms-font-xl">{info.myInfo.FirstName}</td>
              </tr>
              <tr className="ms-Table-row">
                <td className="ms-Table-cell ms-font-xl">Nachname</td>
                <td className="ms-Table-cell ms-font-xl">{info.myInfo.LastName}</td>
              </tr>
              <tr className="ms-Table-row">
                <td className="ms-Table-cell ms-font-xl">Organisationen</td>
                <td className="ms-Table-cell ms-font-xl"><WbiOrganizationList organizations = {info.myInfo.Organizations} /></td>
              </tr>
              </tbody>
            </table>
          {(info.isLoading)? <Spinner /> : ''}
          <div>{info.errorMessage}</div>
        </div>

    );
  }
}

