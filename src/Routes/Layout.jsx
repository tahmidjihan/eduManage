import React from 'react';
import Footer from './../Components/Footer';
import Navbar from './../Components/Navbar';

function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
}

export default Layout;
