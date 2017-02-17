// lib
import * as React from 'react';
import { Action } from 'redux-actions';
import { connect } from 'react-redux';

// services
import { IWbiOrganization, IWbiLayout,IWbiOwner, IWbiDocument, IWbiPathDocument, IWbiAddDocument } from '../../services/wbi/wbi-types';
import { inserText } from '../../services/office/document-info';
import { requestByUrl, patchDocument, addDocument } from '../../services/wbi/wbi-document';
import { insertHeader, clearHeader} from '../../services/office/header-footer'

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
  updateOwner :  (payload: IWbiOwner) => Action<IWbiOwner>;
  updateDescription :  (payload: string) => Action<string>;
  updateWbiData : (payload: IWbiDocument) => Action<IWbiDocument>;
  updateIsLoading : (payload: boolean) => Action<boolean>;
  updateError:  (payload: string) => Action<string>;
}
interface IState {
}



export class DocumentContainer extends React.Component<IProps, IState> {

  
 public onSaveClick = () => { 
    // <-- note syntax here
     const {url} = this.props.office;
     const { updateWbiData, updateIsLoading, updateError } = this.props;

    const { organization, layout, owner, title, description,version, wbiData, } = this.props.document;
    
      if (wbiData) {
        // update the document on the wbi server
        var pathDoc:IWbiPathDocument = {
          Title: title,
          Url: url,
          Description: description,
          Version:version,
        }
        if (owner) pathDoc.OwnerId = owner.Id;
        if (layout) pathDoc.LayoutId = layout.Id;
        if (organization) pathDoc.OrganizationId = organization.Id;
        updateIsLoading(true);
        patchDocument(wbiData.Id, pathDoc).then(function(info:IWbiDocument) {
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

    
    onLayoutChanged = ( layout : IWbiLayout) => {
        const {title, owner, wbiData } = this.props.document;
        const version:string = "";
        this.props.updateLayout(layout)
        insertHeader(layout.Header, (wbiData) ? wbiData.Id : "", title, (owner) ? owner.LastName : "", version)
    }

  render() {
    const {initialized, reason, url} = this.props.office;

    const { updateOrganization,updateUrl, updateTitle, updateDescription, updateVersion, updateOwner, updateWbiData, updateIsLoading, updateError } = this.props;

    const { organization, layout, owner, title, description, version, wbiData, isLoading, layoutOptions } = this.props.document;
    
  

    const requestWbiInfos = function(url:string) {
      requestByUrl(url)
      .then(function(info:IWbiDocument) {
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
          requestWbiInfos(url);
    }

    return (
      <article>
        <PageHeader>WBI Document</PageHeader>
        <PageSection className="u-centered">
           <WbiDocumentInfo initialized={initialized} reason= {reason} info={this.props.document} />      
        </PageSection>
        <OfficeAddIn>
         <section className="u-letter-box--xlarge">
          <TextField label="Title" ariaLabel="Title" value={title} onChanged={updateTitle} /> 
          <TextField label="Description" ariaLabel="Description" multiline={true} value={description} onChanged={updateDescription} /> 
          <TextField label="Version" ariaLabel="Version" value={version} onChanged={updateVersion} /> 
          <WbiOrganizationDropdown disabled ={isLoading || wbiData != null} label="Organisation" selected={organization} organizations={myInfo.Organizations} onChange={updateOrganization}/>
          <WbiLayoutDropdown label="Layout" selected={layout} options={layoutOptions} layouts={(organization)?organization.Layouts: null} onChange={this.onLayoutChanged}/>
          <Button description="Aktualisieren" buttonType={ ButtonType.primary } onClick={onRefreshClick}>Aktualisieren</Button>
          <Button description="Speichern" disabled={!url || !title || !description || !layout || !organization} buttonType={ ButtonType.primary } onClick={this.onSaveClick}>{wbiData ? 'Speichern': 'Hinzufügen'}</Button>
         </section>
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
