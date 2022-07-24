import React, { FunctionComponent } from "react";
import styles from "./Layout.module.css";
import { LayoutProps } from "./Layout.props";
import { Sidebar } from "./Sidebar/Sidebar";

const Layout = ({ children }: LayoutProps) => {
  
  return (
    <div className={styles.wrapper}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
