// lib imports
import * as React from 'react';
import { Action } from 'redux-actions';
import {TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button,ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

interface IProps {
  username: string;
  password: string;
  isLoading: boolean;
  isLoggedInAs: string;
  expires: Date;
  errorMessage: string | null,
  onUsernameChange: (payload: string) => Action<string>;
  onPasswordChange: (payload: string) => Action<string>;
  onLoginClick: any;
  onLogoutClick: any;
}

interface IState {
}

export class WbiAuth extends React.Component<IProps, IState> {
  render(): JSX.Element {
    const {
      username,
      password,
      isLoading,
      isLoggedInAs,
      expires,
      onUsernameChange,
      onPasswordChange,
      onLoginClick,
      onLogoutClick,
      errorMessage
    } = this.props;

    if (isLoggedInAs) {
      return(
        <div className="o-grid__cell u-window-box--medium">
          <div>Currently logged in as {isLoggedInAs} until {(expires) ? expires.toString(): ""}</div>
          <Button
            description="Logout"
            buttonType={ ButtonType.primary } onClick={onLogoutClick}
            >Logout
          </Button>
          
        </div>
        );
    }
    return (
      <div className="o-grid__cell u-window-box--medium">
        <TextField label="Username" ariaLabel="Username" value={username} onChanged={onUsernameChange} /> 
        <TextField label="Password" type="password" ariaLabel="Password" value={password} onChanged={onPasswordChange} /> 
        <Button
          disabled={ isLoading || username.length==0 || password.length == 0 }
          description="Login"
          buttonType={ ButtonType.primary } onClick={onLoginClick}
          >Login
        </Button>
        {(isLoading)? <Spinner /> : ''}
        <div>{errorMessage}</div>
      </div>

    );
  }
}

