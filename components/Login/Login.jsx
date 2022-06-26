import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import React, { useState } from "react";

import styles from "./Login.module.css";

const Login = () => {
  const [loginNumber, setLoginNumber] = useState("");
  const [numberValid, setNumberValid] = useState(true);
  const [numberTouched, setNumberTouched] = useState(false);
  const handleTelephoneChange = (event) => {
    setNumberTouched(true);

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
    <Card className={styles.authForm} style={{ width: 614 }}>
      <h2>Вход</h2>
      <h5>Еще не брали кофе? Зарегистрируйтесь</h5>

      <label>
        <span>Номер телефона</span>
        <Input
          value={loginNumber}
          onChange={handleTelephoneChange}
          status={numberValid ? "" : "error"}
          suffix={
            numberTouched && numberValid ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : ""
          }
        />
      </label>

      <button className={styles.loginButton}>ВОЙТИ</button>
    </Card>
  );
};

export default Login;
