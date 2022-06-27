import React, { useState } from "react";

import styles from "./Registration.module.css";

import { success, error, warning, info } from "../../services/AlertingService";
import { Button, Card, Input, PageHeader, Spin } from "antd";
import cn from "classnames";

export const Registration = ({ setActiveType }) => {
  const [number, setNumber] = useState("");
  const [numberValid, setNumberValid] = useState(true);
  const [name, setName] = useState("");

  const handleTelephoneChange = (event) => {
    const num = event.target.value.replace(/\s+/g, "");

    if (num.length === 11 && /^(\+7|7|8)[0-9]{10}$/.test(num)) {
      setNumber(
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
      setNumber(
        `${num.slice(0, 2)} ${num.slice(2, 5)} ${num.slice(5, 8)} ${num.slice(
          8,
          10
        )} ${num.slice(10, 12)}`
      );
      setNumberValid(true);
      return;
    }

    if (num.length === 9) {
      setNumber(
        `${num[0]} ${num.slice(1, 4)} ${num.slice(4, 7)} ${num.slice(7, 9)}`
      );
      setNumberValid(false);
      return;
    }

    if (num[0] === "+" && num.length === 10) {
      setNumber(
        `${num.slice(0, 2)} ${num.slice(2, 5)} ${num.slice(5, 8)} ${num.slice(
          8,
          10
        )}`
      );
      setNumberValid(false);
      return;
    }

    setNumber(num.replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    if (!/^(\+7|7|8)[0-9]{10}$/.test(num)) {
      setNumberValid(false);
    } else {
      setNumberValid(true);
    }
  };

  const handleNameChange = (event) => {
    if (/^[a-zA-Zа-яА-ЯёЁ]+$/.test(event.target.value) || event.target.value === '') {
        setName(event.target.value);
    }
}

  return (
    <>
      <Card className={cn(styles.authForm)} style={{ width: 614 }}>
        <h2>Регистрация</h2>
        <h5>
          Уже зарегистрированы?{" "}
          <Button type="link" onClick={() => setActiveType("login")}>
            Войти
          </Button>
        </h5>

        <label>
          <span>Ваше имя</span>
          <Input
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          <span>Номер телефона</span>
          <Input
            value={number}
            onChange={handleTelephoneChange}
            status={numberValid ? "" : "error"}
          />
        </label>

        <Spin tip="Отправляю...">
          <button className={styles.button}>
            ВОЙТИ
          </button>
        </Spin>
      </Card>
    </>
  );
};