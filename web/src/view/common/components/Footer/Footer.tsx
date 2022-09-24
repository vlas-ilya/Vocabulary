import './Footer.styles.css';
import { ReactNode } from 'react';

export type FooterProps = {
  children?: ReactNode;
};

export const Footer = (props: FooterProps) => <div className="Footer">{props.children}</div>;
