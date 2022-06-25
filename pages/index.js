import { useState } from "react";
import Card from "antd/lib/card/Card";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Input } from "antd";
import { CheckCircleTwoTone } from '@ant-design/icons';


export default function Home() {
  const [loginNumber, setLoginNumber] = useState("");
  const [numberValid, setNumberValid] = useState(true);
  const handleTelephoneChange = (event) => {
    const num = event.target.value.replace(/\s+/g, "");

    if (num.length === 11 && /^(\+7|7|8)[0-9]{10}$/.test(num)) {
      setLoginNumber(
        `${num[0]} ${num.slice(1, 4)} ${num.slice(4, 7)} ${num.slice(
          7,
          9
        )} ${num.slice(9, 11)}`
      );
      setNumberValid(true);
      return;
    }

    if (
      num[0] === "+" &&
      num.length === 12 &&
      /^(\+7|7|8)[0-9]{10}$/.test(num)
    ) {
      setLoginNumber(
        `${num.slice(0, 2)} ${num.slice(2, 5)} ${num.slice(5, 8)} ${num.slice(
          8,
          10
        )} ${num.slice(10, 12)}`
      );
      setNumberValid(true);
      return;
    }

    if (num.length === 9) {
      setLoginNumber(
        `${num[0]} ${num.slice(1, 4)} ${num.slice(4, 7)} ${num.slice(7, 9)}`
      );
      setNumberValid(false);
      return;
    }

    if (num[0] === "+" && num.length === 10) {
      setLoginNumber(
        `${num.slice(0, 2)} ${num.slice(2, 5)} ${num.slice(5, 8)} ${num.slice(
          8,
          10
        )}`
      );
      setNumberValid(false);
      return;
    }

    setLoginNumber(num.replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    if (!/^(\+7|7|8)[0-9]{10}$/.test(num)) {
      setNumberValid(false);
    } else {
      setNumberValid(true);
    }
  };

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
          <Card className={styles.authForm} style={{ width: 614 }}>
            <h2>Вход</h2>
            <h5>Еще не брали кофе? Зарегистрируйтесь</h5>

            <label>
              <span>Номер телефона</span>
              <Input
                value={loginNumber}
                onChange={handleTelephoneChange}
                status={numberValid ? "" : "error"}
                suffix={numberValid ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : ''}
              />
            </label>
          </Card>
        </div>
      </main>
    </div>
  );
}
