import React from 'react';
import { Router } from '../Router/Router';
import './App.css';
import { Page } from '../../view/common/containers/Page/Page';
import { HeaderContent } from '../../view/components/HeaderContent/HeaderContent';
import { FooterContent } from '../../view/components/FooterContent/FooterContent';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Page headerContent={<HeaderContent />} footerContent={<FooterContent />}>
          <Router />
        </Page>
      </BrowserRouter>
    </div>
  );
};
