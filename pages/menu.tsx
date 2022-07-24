import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Menu.module.css";
import callApi from "../common/callApi";

import AlertingService from "../services/AlertingService";
import { withLayout } from "../layout/Layout";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { Tabs } from "antd";
import { IProduct, ITopping } from "../interfaces/product.interface";
import { useScrollY } from "../hooks/useSrollY";
import { UpOutlined } from "@ant-design/icons";
import { useAnimation, motion } from "framer-motion";

interface MenuProps extends Record<string, unknown> {
  menu: IProduct[];
  toppings: ITopping[];
  firstCategory: number;
}

function Menu({ menu, toppings }: MenuProps) {
  const { TabPane } = Tabs;

  const contentRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const [scrollY, setScrollY] = useState<number>(0);
  const isBrowser = typeof window !== undefined;

  const handleScroll = () => {
    if (contentRef.current) {
      const currentScrollY = isBrowser ? contentRef.current.scrollTop : 0;
      setScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      controls.start({ opacity: scrollY / contentRef.current.scrollHeight });
    }
  }, [scrollY, controls]);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const [activeTab, setActiveTab] = useState("1");
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title> Cofefu - Меню </title>
        <meta
          name="description"
          content="Выбери любимый продукт из меню не приходя в кофейню!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AlertingService horizontal={"right"} vertical={"top"} />
      <main className={styles.main}>
        <div
          className={styles.content}
          ref={contentRef}
          onScroll={handleScroll}
        >
          <Tabs
            onChange={onChange}
            activeKey={activeTab}
            className={styles.tabs}
          >
            <TabPane tab="КОФЕ" key="1">
              {menu &&
                menu
                  .filter((product) => product.type === 0)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} toppings={toppings} />
                  ))}
            </TabPane>
            <TabPane tab="НЕКОФЕ" key="2">
              {menu &&
                menu
                  .filter((product) => product.type === 1)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} toppings={toppings}/>
                  ))}
            </TabPane>
            <TabPane tab="ЛЕТНЕЕ" key="3">
              {menu &&
                menu
                  .filter((product) => product.type === 2)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} toppings={toppings}/>
                  ))}
            </TabPane>
          </Tabs>
        </div>

        <motion.div animate={controls} initial={{ opacity: 0 }}>
          <button className={styles.upButton} onClick={scrollToTop}>
            <UpOutlined />
          </button>
        </motion.div>
      </main>
    </div>
  );
}

export default withLayout(Menu);

export const getStaticProps = async () => {
  const responseProducts = await callApi("/products", "GET", undefined, {});
  const responseToppings = await callApi("/toppings", "GET", undefined, {});
  return {
    props: {
      menu: responseProducts,
      toppings: responseToppings
    },
  };
};
