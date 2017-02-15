import './main-layout.css!';
import * as React from 'react';
import { Action } from 'redux-actions';
import { connect } from 'react-redux';
import { IRootReducer } from '../store';
import { IWbiAuthReducer } from '../store/wbi-auth-reducer';
import { IWbiMyInfoReducer} from '../store/wbi-myinfo-reducer';
import { LayoutTopNav, LayoutTopNavLink } from './components/layout-top-nav';
import { LayoutHeader } from './components/layout-header';
import { LayoutMain } from './components/layout-main';
import { LayoutFooter } from './components/layout-footer';
import * as wbiMyInfoActions from '../store/wbi-myinfo-reducer';

// services
import { requestMyInfo } from '../services/wbi/wbi-myinfo';
import { IWbiMyInfoResponse } from '../services/wbi/wbi-types';

// properties
interface IProps {
  wbiAuth: IWbiAuthReducer;
  myInfo: IWbiMyInfoReducer;
  myInfoRequest : (payload: string) => Action<string>;
  myInfoSuccess : (payload: IWbiMyInfoResponse) => Action<IWbiMyInfoResponse>;
  myInfoError: (payload: string) => Action<string>;
  myInfoClear: (payload: string) => Action<string>;
}


interface IState {
}


export class MainLayout extends React.Component<IProps, IState> {

  getMyInfo =() => {
    if (this.props.wbiAuth && this.props.wbiAuth.token) {
      if (!this.props.myInfo.myInfo) {
        // set isLoading....
        this.props.myInfoRequest(this.props.wbiAuth.token.userName);
        // try to request infos from wbi server
        requestMyInfo()
          .then((data:IWbiMyInfoResponse) => {
            this.props.myInfoSuccess(data);
          })
          .catch((error: any) =>{
            // indicate request error
            this.props.myInfoError(error.message)
          });
      }
    } 
  }

  componentDidMount() {
    this.getMyInfo();
  }

  render() {
   
    const {myInfo} = this.props;

    this.getMyInfo();

    const {children} = this.props;
    return (
      <div className="c-text">
        <LayoutHeader>
          <LayoutTopNav>
            <LayoutTopNavLink href="/" isPrimary> Home </LayoutTopNavLink>
            <LayoutTopNavLink href="/document"> Dokument </LayoutTopNavLink> 
            <LayoutTopNavLink href="/login"> Login </LayoutTopNavLink>
          </LayoutTopNav>
        </LayoutHeader>

        <LayoutMain>
          {children}
        </LayoutMain>

        <LayoutFooter>
          2017 &copy; Helmut Ritter<br />
        </LayoutFooter>
      </div>
    );
  };
};

const stateToProps = (storeState: IRootReducer) => ({
  wbiAuth: storeState.wbiAuth,
  myInfo : storeState.myInfo
});

const actionsToProps = Object.assign({}, wbiMyInfoActions);

export default connect(stateToProps, actionsToProps)(MainLayout);
