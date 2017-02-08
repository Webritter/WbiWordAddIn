// lib imports
import * as React from 'react';

import {IWbiAuthReducer} from '../../../store/wbi-auth-reducer'

interface IProps {
  info : IWbiAuthReducer;
}

interface IState {
}

export class WbiLoginInfo extends React.Component<IProps, IState> {
  render(): JSX.Element {
    const { info } = this.props;

    if (info.errorMessage){
      return (
        <span>{info.errorMessage}
        </span>
      )
    }

    if (info.isLoading){
      return (
        <span>loading....
        </span>
      )
    }
    if (info.token == null)
    {
      return (
        <span>
        </span>
      ) 
    }
    return (
       <span>Logged in as <b> {info.token.userName} </b>
        </span>

    );
  }
}

