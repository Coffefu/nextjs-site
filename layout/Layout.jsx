import React from "react";
import styles from "./Layout.module.css";
import { Sidebar } from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export const withLayout = (Component) => {
  return function withLayoutComponent(props) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
