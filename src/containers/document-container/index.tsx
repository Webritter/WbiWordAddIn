// lib imports
import * as React from 'react';
import { Action } from 'redux-actions';
import { connect } from 'react-redux';
// components imports
import { IRootReducer } from '../../store';
import { IDocumentReducer } from '../../store/document-reducer';
import { IWbiMyInfoReducer } from '../../store/wbi-myinfo-reducer';

import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import { WbiOrganizationDropdown } from '../../components/organization-dropdown';
import { WbiLayoutDropdown } from '../../components/layout-dropdown';
import { IWbiOrganization, IWbiLayout } from '../../services/wbi/wbi-myinfo'

import * as documentActions from '../../store/document-reducer';
// services

// ui components

// properties
interface IProps {
  document: IDocumentReducer;
  myInfo: IWbiMyInfoReducer,
  updateOrganization : (payload: IWbiOrganization) => Action<IWbiOrganization>;
  updateLayout : (payload: IWbiLayout) => Action<IWbiLayout>;
}
interface IState {
}

export class DocumentContainer extends React.Component<IProps, IState> {

  render() {

    const { updateOrganization, updateLayout } = this.props;

    const { organization, layout } = this.props.document;
    const { myInfo} = this.props.myInfo;
    if (myInfo == null) {
      return <div>bitte zuerst einloggen</div>
    }
    
    return (
      <article>
        <PageHeader>WBI Document</PageHeader>
        <PageSection className="u-centered">(current document)</PageSection>
         <section className="u-letter-box--xlarge">
         <WbiOrganizationDropdown label="Organisation" selected={organization} organizations={myInfo.Organizations} onChange={updateOrganization}/>
         <WbiLayoutDropdown label="Layout" selected={layout} layouts={(organization)?organization.Layouts: null} onChange={updateLayout}/>
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
