import _ from 'lodash';
import React from 'react';
import { Input } from 'semantic-ui-react';

const permittedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', '0','1','2','3','4','5','6','7','8','9'];

const onKeyDown = onSubmit => event => {
  if(_.includes(permittedKeys, event.key)) {
    return;
  }
  event.preventDefault();
  if(event.key === 'Enter' && event.target.value.length > 0) {
    onSubmit(event.target);
    event.target.value = '';
  }
};

const NumberInput = ({size, placeholder, onSubmit}) => (
  <Input type='text' size={size} placeholder={placeholder} onKeyDown={onKeyDown(onSubmit)}></Input>
);

export default NumberInput;
