import * as React from 'react';

import './button.less';

export default function Button(props) {
  return (
    <button>{props.children}</button>
  );
}