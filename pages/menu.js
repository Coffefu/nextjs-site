import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Menu.module.css";

import { AlertingService } from "../services/AlertingService.jsx";
import { withLayout } from "../layout/Layout";

function Menu() {
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
        <div className={styles.content}>123</div>
      </main>
    </div>
  );
}

export default withLayout(Menu);
