import * as React from 'react';
import { Action } from 'redux-actions';
import { Button,ButtonType } from 'office-ui-fabric-react/lib/Button';

interface IProps {
  value: string;
  disabled:boolean;
  onClick: (newValue: string) => Action<string>;
}

export function LoginButton({value = 'Login', disabled = false, onClick}: IProps) {

  const handleClick = (event: any) => {
    onClick(value);
  };

  return (
    <Button
          data-automation-id='test'
          disabled={ disabled }
          description={value}
          buttonType={ ButtonType.primary } onClick={handleClick}
        >{value}
      </Button>
  );
}
