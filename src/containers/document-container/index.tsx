// lib
import * as React from 'react';
import { Action } from 'redux-actions';
import { connect } from 'react-redux';

// services
import { IWbiOrganization, IWbiLayout,IWbiMember, IWbiDocument, IWbiPatchDocument, IWbiAddDocument } from '../../services/wbi/wbi-types';
import { requestByUrl, patchDocument, addDocument } from '../../services/wbi/wbi-document';

// store
import { IRootReducer } from '../../store';
import { IDocumentReducer } from '../../store/document-reducer';
import { IWbiMyInfoReducer } from '../../store/wbi-myinfo-reducer';
import { IOfficeReducer } from '../../store/office-reducer';
import * as documentActions from '../../store/document-reducer';

// UI components
import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import { WbiOrganizationDropdown } from '../../components/organization-dropdown';
import { WbiLayoutDropdown } from '../../components/layout-dropdown';
import { WbiOwnerPicker } from '../../components/owner-picker';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button,ButtonType } from 'office-ui-fabric-react/lib/Button';
import { WbiDocumentInfo } from './components/wbi-documentinfo';
import { default as OfficeAddIn } from '../../office';

// properties
interface IProps {
  document: IDocumentReducer;
  myInfo: IWbiMyInfoReducer,
  office: IOfficeReducer,
  updateOrganization : (payload: IWbiOrganization) => Action<IWbiOrganization>;
  updateLayout : (payload: IWbiLayout) => Action<IWbiLayout>;
  updateTitle :  (payload: string) => Action<string>;
  updateUrl :  (payload: string) => Action<string>;
  updateVersion :  (payload: string) => Action<string>;
  updateOwner :  (payload: IWbiMember|null) => Action<IWbiMember|null>;
  updateDescription :  (payload: string) => Action<string>;
  updateWbiData : (payload: IWbiDocument) => Action<IWbiDocument>;
  updateIsLoading : (payload: boolean) => Action<boolean>;
  updateError:  (payload: string) => Action<string>;
}
interface IState {
}



export class DocumentContainer extends React.Component<IProps, IState> {

  
 public onSaveClick = () => { 
    // getting data from props to local variables
    const {url} = this.props.office;
    const { organization, layout, owner, title, description, version, wbiData, } = this.props.document;
    // getting functions from props
    const { updateWbiData, updateIsLoading, updateError } = this.props;

      
    if (wbiData) {
      // update the document on the wbi server
      // prepare parameter for API call
      var patchDoc:IWbiPatchDocument = {
          Title: title,
          Url: url,
          Description: description,
          Version:version,
      }
      if (owner) patchDoc.OwnerId = owner.Id;
      if (layout) patchDoc.LayoutId = layout.Id;
      if (organization) patchDoc.OrganizationId = organization.Id;

      // indicate update is loading
      updateIsLoading(true);
      // call wbi document service to update (patch) the documents data
      patchDocument(wbiData.Id, patchDoc).then(function(info:IWbiDocument) {
          // store the received data from wbi server
          updateWbiData(info);          
        })
        .catch(function(message:string) {
          updateError("" + message);
        });
      } else {
        // add a document to the wbi server
        var addDoc:IWbiAddDocument = {
          Title: title,
          Url: url,
          Description: description,
          Version:version,
          OwnerId: (owner) ? owner.Id : 0,
          LayoutId : (layout) ? layout.Id : 0,
          OrganizationId : (organization) ? organization.Id : 0
        }
        updateIsLoading(true);
        addDocument(addDoc).then(function(info:IWbiDocument) {
          // store the received data from wbi server
          updateWbiData(info);          
        })
        .catch(function(message:string) {
          updateError("" + message);
        });
      }
    }

    

  render() {
    // getting data from props to local variables
    const {initialized, reason, url} = this.props.office;
    const { updateOrganization, updateUrl, updateTitle, updateDescription, updateLayout, updateVersion, updateOwner, updateWbiData, updateIsLoading, updateError } = this.props;
    const { organization, layout, owner, title, description, version, wbiData, isLoading, layoutOptions } = this.props.document;
    
    const requestWbiInfos = function(url:string) {
      requestByUrl(url).then(function(info:IWbiDocument) {
        // store the received data from wbi server
        updateWbiData(info);
        })
      .catch(function(message:string) {
        // file not found in wbi database!
        console.log("not found wbi informations for " + url )
        updateError("" +message);
      });
    }

    const onRefreshClick = function() {
        updateIsLoading(true);
        if (!initialized) {
          console.log("office not initialized!");
          return;
        }
        if (reason == "Debug") {
          requestWbiInfos(url);
          return;
        }
        console.log("trying to get file properties from word" );
        Office.context.document.getFilePropertiesAsync(function (asyncResult: Office.AsyncResult) {
          console.log("got file properties from word" );
          // check the file url of the current document
          var fileUrl = asyncResult.value.url;
          if (fileUrl === "") {
            updateError("The file hasn't been saved yet. Save the file and try again");
            updateIsLoading(false);
          } else {
            // update store with file url
            updateUrl(fileUrl);
            // try to find the document in the WBI-list
            requestWbiInfos(fileUrl);
          }
        });

    };

     const { myInfo} = this.props.myInfo;
     
    // check if the usser is logged in and he has valid myInfos

   
    if (myInfo == null) {
      return (
        <article>
          <PageHeader>WBI Document</PageHeader>
          <OfficeAddIn />
          <PageSection className="u-centered"> Bitte zuerst anmelden!</PageSection>
        </article>
      )
    }
   

    if (!initialized)
    {
      return(
       <article>
          <PageHeader>WBI Document</PageHeader>
          <OfficeAddIn />
          <PageSection className="u-centered"> Bitte zuerst speichern! </PageSection>
        </article>
      )
    }

    if (url && !wbiData) {
       // try to find wbiData for the current url via API
       requestWbiInfos(url);
    }

    return (
      <article>
        <PageHeader>WBI Document</PageHeader>
        <PageSection className="u-centered">
           <WbiDocumentInfo initialized={initialized} reason= {reason} info={this.props.document} />      
        </PageSection>
        <OfficeAddIn>
          <PageSection className="o-container o-container--small">
         <section className="u-letter-box--xlarge">
          <TextField disabled={isLoading}  label="Title" ariaLabel="Title" value={title} onChanged={updateTitle} /> 
          <TextField disabled={isLoading}  label="Description" ariaLabel="Description" multiline={true} value={description} onChanged={updateDescription} /> 
          <TextField disabled={isLoading} label="Version" ariaLabel="Version" value={version} onChanged={updateVersion} /> 
          <WbiOrganizationDropdown disabled ={isLoading || wbiData != null} label="Organisation" selected={organization} organizations={myInfo.Organizations} onChange={updateOrganization}/>
          <WbiLayoutDropdown label="Layout" disabled={isLoading} selected={layout} options={layoutOptions} layouts={(organization)?organization.Layouts: null} onChange={updateLayout}/>
          <WbiOwnerPicker label="Owner" disabled={isLoading || !organization} selected={owner} organizationId={(organization) ? organization.Id : 0} onChange={updateOwner} />         
          <div>
            <br/>
            <Button description="Aktualisieren" buttonType={ ButtonType.primary } onClick={onRefreshClick}>Aktualisieren</Button>
            <Button description="Speichern" disabled={!url || !title || !description || !layout || !organization} buttonType={ ButtonType.primary } onClick={this.onSaveClick}>{wbiData ? 'Speichern': 'Hinzufügen'}</Button>
          </div>
         </section>
         </PageSection>
         </OfficeAddIn>
      </article>
    );
  }
}

const stateToProps = (storeState: IRootReducer) => ({
  document: storeState.document,
  myInfo: storeState.myInfo,
  office: storeState.office
});

const actionsToProps = Object.assign({}, documentActions);

export default connect(stateToProps, actionsToProps)(DocumentContainer);
