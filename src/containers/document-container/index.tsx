// lib
import * as React from 'react';
import { Action } from 'redux-actions';
import { connect } from 'react-redux';

// services
import { IWbiOrganization, IWbiLayout, IWbiDocument } from '../../services/wbi/wbi-types';
import { inserText } from '../../services/office/document-info';
import { requestByUrl } from '../../services/wbi/wbi-document';

// store
import { IRootReducer } from '../../store';
import { IDocumentReducer } from '../../store/document-reducer';
import { IWbiMyInfoReducer } from '../../store/wbi-myinfo-reducer';
import * as documentActions from '../../store/document-reducer';

// UI components
import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import { WbiOrganizationDropdown } from '../../components/organization-dropdown';
import { WbiLayoutDropdown } from '../../components/layout-dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button,ButtonType } from 'office-ui-fabric-react/lib/Button';
import { WbiDocumentInfo } from './components/wbi-documentinfo';

// properties
interface IProps {
  document: IDocumentReducer;
  myInfo: IWbiMyInfoReducer,
  updateOrganization : (payload: IWbiOrganization) => Action<IWbiOrganization>;
  updateLayout : (payload: IWbiLayout) => Action<IWbiLayout>;
  updateTitle :  (payload: string) => Action<string>;
  updateUrl :  (payload: string) => Action<string>;
  updateDescription :  (payload: string) => Action<string>;
  updateWbiData : (payload: IWbiDocument) => Action<IWbiDocument>;
  updateIsLoading : (payload: boolean) => Action<boolean>;
  updateError:  (payload: string) => Action<string>;
}
interface IState {
}

export class DocumentContainer extends React.Component<IProps, IState> {


  render() {

    const { updateOrganization, updateLayout,updateUrl, updateTitle, updateDescription, updateWbiData, updateIsLoading, updateError } = this.props;

    const { organization, layout, title, url, description, wbiData, isLoading } = this.props.document;
    
    const onSaveClick = function() {

    }
   const onRefreshClick = function() {
        updateIsLoading(true);
        Office.initialize = function(reason) {
          Office.context.document.getFilePropertiesAsync(function (asyncResult: Office.AsyncResult) {
              // check the file url of the current document
              var fileUrl = asyncResult.value.url;
              if (fileUrl === "") {
                  updateDescription("The file hasn't been saved yet. Save the file and try again");
                  updateIsLoading(false);
              } else {
                // update store with file url
                updateUrl(fileUrl);
                // try to find the document in the WBI-list
                console.log("trying to get wbi informations for " + fileUrl )
                requestByUrl(fileUrl).then(function(info:IWbiDocument) {
                  updateIsLoading(false);
                  // store the received data from wbi server
                  updateWbiData(info);
                  // update input fields with data from wbi server
                  updateTitle(info.Title);
                  if (info.Organization)
                    updateOrganization(info.Organization);
                  if (info.Layout)
                    updateLayout(info.Layout);
                  
                 
                }).catch(function(reason) {
                    // file not found in wbi database!
                    updateIsLoading(false);
                    updateError(reason);
                });
              }
              
        });

      };
      inserText();
      //updateDescription("done");
    }
    
    
    const { myInfo} = this.props.myInfo;





    if (myInfo == null) {
      
      return (
        <article>
          <PageHeader>WBI Document</PageHeader>
          <PageSection className="u-centered">{url? '('+ url+ ')' : ""}"</PageSection>
           <section className="u-letter-box--xlarge">
            <div> Bitte zuerst anmelden! </div>
            </section>
        </article>
      )
    }
    



  

    return (
      <article>
        <PageHeader>WBI Document</PageHeader>
        <PageSection className="u-centered">
           <WbiDocumentInfo info={this.props.document} />
        </PageSection>
         <section className="u-letter-box--xlarge">
          <p>{url}</p>
          <TextField label="Title" ariaLabel="Title" value={title} onChanged={updateTitle} /> 
          <TextField label="Description" ariaLabel="Description" multiline={true} value={description} onChanged={updateDescription} /> 
          <WbiOrganizationDropdown disabled ={isLoading || wbiData != null} label="Organisation" selected={organization} organizations={myInfo.Organizations} onChange={updateOrganization}/>
          <WbiLayoutDropdown label="Layout" selected={layout} layouts={(organization)?organization.Layouts: null} onChange={updateLayout}/>
          <Button  description="Aktualisieren" buttonType={ ButtonType.primary } onClick={onRefreshClick}>Aktualisieren</Button>
          <Button  description="Speichern"  buttonType={ ButtonType.primary } onClick={onSaveClick}>Speichern</Button>
        </section>
      </article>
    );
  }
}

const stateToProps = (storeState: IRootReducer) => ({
  document: storeState.document,
  myInfo: storeState.myInfo,
});

const actionsToProps = Object.assign({}, documentActions);

export default connect(stateToProps, actionsToProps)(DocumentContainer);
