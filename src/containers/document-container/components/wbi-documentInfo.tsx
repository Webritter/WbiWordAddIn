// lib imports
import * as React from 'react';

import {IDocumentReducer} from '../../../store/document-reducer'

interface IProps {
  info : IDocumentReducer;
  initialized: boolean;
  reason : string;
}

interface IState {
}

export class WbiDocumentInfo extends React.Component<IProps, IState> {
  render(): JSX.Element {
    const { info, initialized,reason  } = this.props;

    if (!initialized) {
      return (
        <span>initializing ...
        </span>
      )      
    }
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
    if (info.wbiData == null)
    {
      return (
        <span> {reason}
        </span>
      ) 
    }
    return (
       <span>Nummer: <b> {info.wbiData.Id} </b>
        </span>

    );
  }
}

