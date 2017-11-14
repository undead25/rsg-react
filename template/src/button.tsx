import * as React from 'react';

import './button.less';

interface ButtonProps {
  children: React.ReactChild;
  style: Object;
}

export default function Button(props: ButtonProps) {
  const limit = '123';

  return (
    <button style={props.style} className="c">{props.children}</button>
  );
}
