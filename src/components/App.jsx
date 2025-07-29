import { useEffect, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Home = lazy(() => import('Pages/Home'));
const NotFound = lazy(() => import('Pages/NotFound'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
