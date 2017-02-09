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
import { IOfficeReducer } from '../../store/office-reducer';
import * as documentActions from '../../store/document-reducer';

// UI components
import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import { WbiOrganizationDropdown } from '../../components/organization-dropdown';
import { WbiLayoutDropdown } from '../../components/layout-dropdown';
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
  updateDescription :  (payload: string) => Action<string>;
  updateWbiData : (payload: IWbiDocument) => Action<IWbiDocument>;
  updateIsLoading : (payload: boolean) => Action<boolean>;
  updateError:  (payload: string) => Action<string>;
}
interface IState {
}

export class DocumentContainer extends React.Component<IProps, IState> {


  render() {
    const {initialized, reason} = this.props.office;

    const { updateOrganization, updateLayout,updateUrl, updateTitle, updateDescription, updateWbiData, updateIsLoading, updateError } = this.props;

    const { organization, layout, title, url, description, wbiData, isLoading } = this.props.document;
    
    const onSaveClick = function() {

    }

    const requestWbiInfos = function(url:string) {
              console.log("trying to get wbi informations for " + url )
              requestByUrl(url)
              .then(function(info:IWbiDocument) {
                console.log("found wbi informations for " + url )
                updateIsLoading(false);
                // store the received data from wbi server
                updateWbiData(info);
                // update input fields with data from wbi server
                updateTitle(info.Title);
                if (info.Organization)
                  updateOrganization(info.Organization);
                if (info.Layout)
                  updateLayout(info.Layout);
                })
              .catch(function(message:string) {
                // file not found in wbi database!
                console.log("not found wbi informations for " + url )
                updateIsLoading(false);
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
           <WbiDocumentInfo initialized={initialized} reason= {reason} info={this.props.document} />
           <OfficeAddIn />
        </PageSection>
         <section className="u-letter-box--xlarge">
          <TextField disabled={reason != "Debug"} label="Url" ariaLabel="Url" value={url} onChanged={updateUrl} /> 
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
  office: storeState.office
});

const actionsToProps = Object.assign({}, documentActions);

export default connect(stateToProps, actionsToProps)(DocumentContainer);
