// lib
import * as React from 'react';
import { Action } from 'redux-actions';
import { connect } from 'react-redux';

// store
import { IRootReducer } from './store';
import { IOfficeReducer } from './store/office-reducer';
import * as officeActions from './store/office-reducer';

// UI components
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import {TextField } from 'office-ui-fabric-react/lib/TextField';


// properties
interface IProps {
  office: IOfficeReducer;
  officeInitialized : (payload: string) => Action<string>;
}

interface IState {
}

export class OfficeContainer extends React.Component<IProps, IState> {

  componentDidMount() {
    const { officeInitialized } = this.props;

    Office.initialize = function(reason:any) {
      officeInitialized(reason);
    }
  }



  render() {
    const { officeInitialized,  } = this.props;
    const {initialized, url} = this.props.office;

    const onClick = function() {
      console.log('Debug clicked!');
      officeInitialized("Debug");
    }

    if (!initialized) {
    return (<div>
              <Button buttonType = {ButtonType.primary}  onClick={onClick} >Debug</Button>
            </div>);


    }
    return (<div></div>);
  }



}

const stateToProps = (storeState: IRootReducer) => ({
  office: storeState.office,
});

const actionsToProps = Object.assign({}, officeActions);

export default connect(stateToProps, actionsToProps)(OfficeContainer)