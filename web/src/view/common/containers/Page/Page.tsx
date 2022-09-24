import './Page.styles.css';
import { ReactNode } from 'react';
import { Header } from '../../components/Header/Header';
import { Body } from '../Body/Body';
import { Footer } from '../../components/Footer/Footer';

export type PageProps = {
  children?: ReactNode;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
};

export const Page = (props: PageProps) => (
  <div className="Page">
    <div className="Page_Item">
      <Header>{props.headerContent}</Header>
    </div>
    <div className="Page_Item">
      <Body>{props.children}</Body>
    </div>
    <div className="Page_Footer">
      <Footer>{props.footerContent}</Footer>
    </div>
  </div>
);
