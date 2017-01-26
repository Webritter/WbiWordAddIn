import * as React from 'react';
import { Action } from 'redux-actions';
import {TextField } from 'office-ui-fabric-react/lib/TextField'

interface IProps {
  value: string;
  onChange: (newValue: string) => Action<string>;
}

export function UsernameInput({value = '', onChange}: IProps) {
  return (
    <div>
    <TextField label="Username" ariaLabel="Username" value={value} onChanged={onChange} /> 
      </div>
  );
}
