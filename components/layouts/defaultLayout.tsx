import React from 'react';
import Header from './header';
import Footer from './footer';
const DefaultLayout = ({ children }:any) => {
  return (
    <div>
        <Header />
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
