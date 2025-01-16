import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../App';
import Home from '../Pages/HomePage';
import Layout from './Layout';
import Authentication from '../Pages/Authentication';
function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout children={<Home />} />}></Route>
        <Route
          path='/login'
          element={
            <Layout children={<Authentication isLogin={true} />} />
          }></Route>
        <Route
          path='/signup'
          element={
            <Layout children={<Authentication isLogin={false} />} />
          }></Route>
      </Routes>
    </>
  );
}

export default Router;
