import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../../features/home/Home';

export type RouterProps = {};

export const Router = (props: RouterProps) => (
  <div className="Router">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </div>
);
