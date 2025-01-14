import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../App';
import Layout from './Layout';
import Home from '../Pages/Home';
function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout children={<Home />} />}></Route>
      </Routes>
    </>
  );
}

export default Router;
