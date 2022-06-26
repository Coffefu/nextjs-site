import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Login from "../components/Login/Login";

export default function Home() {

  const [activeType, setActiveType] = useState('login');

  return (
    <div className={styles.container}>
      <Head>
        <title>Cofefu - сервис заказа кофе</title>
        <meta
          name="description"
          content="Новый удобный сервис для студентов. Закажи кофе на паре и не стой в очереди!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.bgWrap}>
        <Image
          alt="Order coffee"
          src="/main-bg.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className={styles.h1}>
            Кофе теперь
            <br /> легко взять с<br /> собой
          </h1>
          <p className={styles.p}>some text</p>
        </div>
        <div className={styles.authFormWrapper}>
          {
            activeType === 'login'
              ? (<Login />)
              : (<div></div>)
          }
        </div>
      </main>
    </div>
  );
}
