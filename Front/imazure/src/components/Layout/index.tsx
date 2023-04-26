import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import styles from "./styles.module.scss";

// import { useLocation } from "react-router-dom";
// import routes, { routeNames } from 'routes';
// import Footer from './Footer';
// import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  //   const { search } = useLocation();
  return (
    <div
      className={styles.backgroundTheme}
      style={{
        minHeight: "100vh",
      }}
      // className="d-flex flex-column flex-fill wrapper"
    >
      <div
        style={{
          minHeight: "2vh",
        }}
      >
        {/* <Header /> */}
      </div>
      <main
        style={{
          minHeight: "80vh",
        }}
        className="d-flex flex-column flex-grow-1 layout"
      >
        {children}
      </main>

      <div
        style={{
          minHeight: "5vh",
        }}
      >

        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;