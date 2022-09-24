import './Header.styles.css';
import { ReactNode } from 'react';

export type HeaderProps = {
  children?: ReactNode;
};

export const Header = (props: HeaderProps) => <div className="Header">{props.children}</div>;
