// lib imports
import * as React from 'react';
import { Action } from 'redux-actions';
import { connect } from 'react-redux';
// components imports
import { IRootReducer } from '../../store';
import { IWbiAuthReducer } from '../../store/wbi-auth-reducer';
import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import * as currencyConverterActions from '../../store/wbi-auth-reducer';
// services
import { authenticate, IWbiAuthResponse, nullWbiAuthResponse } from '../../services/wbi/wbi-auth';
import { AppStore } from '../../services/local-storage/app-store';

// ui components
import { WbiAuth } from './components/wbi-auth';

// properties
interface IProps {
  wbiAuth: IWbiAuthReducer;
  updateUsername : (payload: string) => Action<string>;
  updatePassword : (payload: string) => Action<string>;
  login : (payload: string) => Action<string>;
  loginSuccess : (payload: IWbiAuthResponse) => Action<IWbiAuthResponse>;
  loginError: (payload: string) => Action<string>;
  logout: (payload: string) => Action<string>
  
}
interface IState {
}

export class WbiAuthContainer extends React.Component<IProps, IState> {

  render() {
    const { username, password, isLoading, errorMessage, token } = this.props.wbiAuth;
    const { updateUsername, updatePassword, login, logout, loginSuccess, loginError } = this.props;

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
        })
        .catch((error) =>{
          // indicate login error
          loginError(error.message)
          // clear token in local store
          appstore.save(nullWbiAuthResponse);
        });
    }

    const onLogoutClick = function() {
      logout(username);
      // clear token in local store
      appstore.save(nullWbiAuthResponse);
    }


    return (
      <article>
        <PageHeader>WBI Login</PageHeader>
        <PageSection className="u-centered">(Login with username and password)</PageSection>
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
  wbiAuth: storeState.wbiAuth
});

const actionsToProps = Object.assign({}, currencyConverterActions);

export default connect(stateToProps, actionsToProps)(WbiAuthContainer);
