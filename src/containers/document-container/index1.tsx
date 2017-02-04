import * as React from 'react';

import { Action } from 'redux-actions';
import { connect } from 'react-redux';

import { IRootReducer } from '../../store';
import { IDocumentReducer } from '../../store/document-reducer';
import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import * as documentActions from '../../store/document-reducer';
import * as wbiAuthActions from '../../store/wbi-auth-reducer';

// properties
interface IProps {
   document: IDocumentReducer;
   layoutSelected : (payload:string) => Action<string>
   organizationSelected : (payload: number) => Action<string>;
}

interface IState {
}

export class DocumentContainer3 extends React.Component<IProps, IState> {

  render() {
    const { organization, layout} = this.props.document;

    return (
      <article>
        <PageHeader>WBI Login</PageHeader>
        <PageSection className="u-centered">(Current document settings)</PageSection>
         <section className="u-letter-box--xlarge">
         <p>Organization: {organization}</p>
         <p>Layout: {layout}</p>
        </section>
      </article>
    );
  }
}

const stateToProps = (storeState: IRootReducer) => ({
  document: storeState.document
});

const actionsToProps = Object.assign({}, wbiAuthActions);

export default connect(stateToProps, actionsToProps)(DocumentContainer3);
