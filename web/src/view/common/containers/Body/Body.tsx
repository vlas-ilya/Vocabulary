import './Body.styles.css';

import { ReactNode } from 'react';

export type BodyProps = {
  children?: ReactNode;
};

export const Body = (props: BodyProps) => <div className="Body">{props.children}</div>;
