import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Menu.module.css";
import callApi from "../common/callApi";

import { AlertingService } from "../services/AlertingService.jsx";
import { withLayout } from "../layout/Layout";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { Tabs } from "antd";

function Menu({ menu }) {
  const { TabPane } = Tabs;

  const [activeTab, setActiveTab] = useState('1');
  const onChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cofefu - Меню</title>
        <meta
          name="description"
          content="Выбери любимый продукт из меню не приходя в кофейню!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AlertingService horizontal={"right"} vertical={"top"} />

      <main className={styles.main}>
        <div className={styles.content}>
          <Tabs onChange={onChange} activeKey={activeTab} className={styles.tabs}>
            <TabPane tab="КОФЕ" key="1">
              {menu &&
                menu.products.filter(product => product.type === 0).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </TabPane>
            <TabPane tab="НЕКОФЕ" key="2">
              {menu &&
                menu.products.filter(product => product.type === 1).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </TabPane>
            <TabPane tab="ЛЕТНЕЕ" key="3">
              {menu &&
                menu.products.filter(product => product.type === 2).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </TabPane>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default withLayout(Menu);

export const getStaticProps = async () => {
  const response = await callApi("/menu", "GET", undefined, {});
  return {
    props: {
      menu: response,
    },
  };
};
