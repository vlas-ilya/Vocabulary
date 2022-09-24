import './Content.styles.css';
import { ReactNode } from 'react';

export type ContentProps = {
  className?: string;
  children?: ReactNode;
};

export const Content = (props: ContentProps) => <div className={`Content ${props.className}`}>{props.children}</div>;
