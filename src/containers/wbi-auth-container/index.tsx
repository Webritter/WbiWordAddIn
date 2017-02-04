// lib imports
import * as React from 'react';
import { Action } from 'redux-actions';
import { connect } from 'react-redux';
// components imports
import { IRootReducer } from '../../store';
import { IWbiAuthReducer } from '../../store/wbi-auth-reducer';
import { IWbiMyInfoReducer} from '../../store/wbi-myinfo-reducer';
import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import * as wbiAuthActions from '../../store/wbi-auth-reducer';
import * as wbiMyInfoActions from '../../store/wbi-myinfo-reducer';
// services
import { authenticate, IWbiAuthResponse, nullWbiAuthResponse } from '../../services/wbi/wbi-auth';
import { getMyInfo, IWbiMyInfoResponse } from '../../services/wbi/wbi-myinfo';
import { AppStore } from '../../services/local-storage/app-store';

// ui components
import { WbiAuth } from './components/wbi-auth';
import { WbiMyInfo } from './components/wbi-myinfo';
import { WbiOrganizationList } from './components/wbi-organization-list';
// properties
interface IProps {
  wbiAuth: IWbiAuthReducer;
  myInfo: IWbiMyInfoReducer;
  updateUsername : (payload: string) => Action<string>;
  updatePassword : (payload: string) => Action<string>;
  login : (payload: string) => Action<string>;
  loginSuccess : (payload: IWbiAuthResponse) => Action<IWbiAuthResponse>;
  loginError: (payload: string) => Action<string>;
  myInfoRequest : (payload: string) => Action<string>;
  myInfoSuccess : (payload: IWbiMyInfoResponse) => Action<IWbiMyInfoResponse>;
  myInfoError: (payload: string) => Action<string>;
  myInfoClear: (payload: string) => Action<string>;
  logout: (payload: string) => Action<string>
}
interface IState {
}

export class WbiAuthContainer extends React.Component<IProps, IState> {

  render() {
    const { username, password, isLoading, errorMessage, token } = this.props.wbiAuth;
    const { myInfo } = this.props.myInfo;
    const { updateUsername, updatePassword, login, logout, loginSuccess, loginError, 
            myInfoRequest, myInfoSuccess, myInfoError, myInfoClear } = this.props;

    const appstore = new AppStore();
    
    // try to login on wbi data backend
    const onLoginClick = function() {
      // indicate isLoading
      login(username);
      // authetnticate the current user
      authenticate(username, password)
        .then((data) =>{
          // store login success in state
          loginSuccess(data);
          // store access token in local appstore
          appstore.save(data);
          // get the current user info
          myInfoRequest(data.userName);
          getMyInfo()
            .then((data:IWbiMyInfoResponse) => {
                myInfoSuccess(data);
            })
            .catch((error) =>{
              // indicate login error
              myInfoError(error.message)

            });
        })
        .catch((error) =>{
          // indicate login error
          loginError(error.message)
          // clear token in local store
          appstore.save(nullWbiAuthResponse);
        });
    }

    const onLogoutClick = function() {
      myInfoClear("not logged in");
      logout(username);
      // clear token in local store
      appstore.save(nullWbiAuthResponse);
    }

    
    let myInfoComponent = null;
    if (myInfo) {
     
      myInfoComponent = <WbiMyInfo firstName={myInfo.FirstName}
                                   lastName={myInfo.LastName}
                                   isLoading={this.props.myInfo.isLoading} 
                                   errorMessage ={this.props.myInfo.errorMessage}
                                   organizations={myInfo.Organizations}
                        />

    }

    return (
      <article>
        <PageHeader>WBI Login</PageHeader>
        <PageSection className="u-centered">{(token == null) ? "(Login with username and password)" : "(logged in as "+ username + ")"}</PageSection>
        {myInfoComponent}
         <section className="u-letter-box--xlarge">
          <WbiAuth username={username} onUsernameChange={updateUsername}
                   password = {password} onPasswordChange={updatePassword}
                   onLoginClick= {onLoginClick}
                   onLogoutClick={onLogoutClick}
                   isLoading= {isLoading}
                   errorMessage={errorMessage}
                   isLoggedInAs={(token)? token.userName : ''}
                   expires={(token) ? token['.expires'] : new Date()}
            />

        </section>
      </article>
    );
  }
}

const stateToProps = (storeState: IRootReducer) => ({
  wbiAuth: storeState.wbiAuth,
  myInfo : storeState.myInfo
});

const actionsToProps = Object.assign({}, wbiAuthActions, wbiMyInfoActions);

export default connect(stateToProps, actionsToProps)(WbiAuthContainer);
