// lib imports
import * as React from 'react';

import {IDocumentReducer} from '../../../store/document-reducer'

interface IProps {
  info : IDocumentReducer;
}

interface IState {
}

export class WbiDocumentInfo extends React.Component<IProps, IState> {
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
    if (info.wbiData == null)
    {
      return (
        <span>
        </span>
      ) 
    }
    return (
       <span>Nummer: <b> {info.wbiData.Id} </b>
        </span>

    );
  }
}

