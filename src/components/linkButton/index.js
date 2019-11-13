import React from 'react';

export default (props) => (
  <a
    onClick={e => e.preventDefault()}
    className={'ant-dropdown-link'}
    {...props}>
    {props.children}
  </a>
);
