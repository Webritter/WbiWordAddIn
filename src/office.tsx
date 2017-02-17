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
  updateUrl : (payload: string) => Action<string>;
}

interface IState {
}

export class OfficeContainer extends React.Component<IProps, IState> {

   onRetryClick = () =>  {
      console.log('Retry clicked!');
     
      const { updateUrl } = this.props;
 
      // office is initialized -> try to find the current file url
      Office.context.document.getFilePropertiesAsync(function (asyncResult: Office.AsyncResult) {
          console.log("got file properties from word" );
          // check the file url of the current document
          var fileUrl = asyncResult.value.url;
          updateUrl(fileUrl);
      })
    
    }
  
  componentDidMount() {
    const { officeInitialized, updateUrl } = this.props;
    const {initialized, url, reason } = this.props.office;

    if (!initialized) {
      // office is not inizialized until now.
      Office.initialize = function(reason:any) {
        officeInitialized(reason);
      }
    } else {
      if (Office && Office.context && Office.context.document) {
        // office is initialized -> try to find the current file url
        Office.context.document.getFilePropertiesAsync(function (asyncResult: Office.AsyncResult) {
          console.log("got file properties from word" );
          // check the file url of the current document
          var fileUrl = asyncResult.value.url;
          updateUrl(fileUrl);
        })
      } else {
        // outside of office ????
        
      }
    }
  }



  render() {
    const { officeInitialized, updateUrl, children  } = this.props;
    const {initialized, url, reason } = this.props.office;

    const onDebugClick = function() {
      console.log('Debug clicked!');
      officeInitialized("Debug");
    }

    if (!initialized) {
      return (
        <div>
          <Button buttonType = {ButtonType.primary}  onClick={onDebugClick} >Debug</Button>
        </div>
        );
    }

    if (reason == 'Debug') {
      return (
        <div>
            <TextField label="Url" ariaLabel="Url" value={url} onChanged={updateUrl} /> 
            {children}
        </div>

      )
    }

    if (!url) {
      // app is running inside office, but no url until now
      return (
        <div>
          <div>
            Please save your changes to your knowledge base and try again.
          </div>
          
          <Button buttonType = {ButtonType.primary}  onClick={this.onRetryClick} >Refresh</Button>
        </div>
        );
    }
    return (
      <div>
        {children}
      </div>
    );
  }



}

const stateToProps = (storeState: IRootReducer) => ({
  office: storeState.office,
});

const actionsToProps = Object.assign({}, officeActions);

export default connect(stateToProps, actionsToProps)(OfficeContainer)