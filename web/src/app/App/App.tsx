import React from 'react';
import { Router } from '../Router/Router';
import './App.css';
import { Page } from '../../view/common/containers/Page/Page';
import { HeaderContent } from '../../view/components/HeaderContent/HeaderContent';
import { FooterContent } from '../../view/components/FooterContent/FooterContent';

export const App = () => {
  return (
    <div className="App">
      <Page headerContent={<HeaderContent />} footerContent={<FooterContent />}>
        <Router />
      </Page>
    </div>
  );
};
