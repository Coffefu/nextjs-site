import { Button, Card, Input,  PageHeader, Spin } from "antd";
import React, { useEffect, useState } from "react";

import styles from "./Login.module.css";

import { success, error, warning, info } from "../../services/AlertingService";
import callApi from "../../common/callApi";
import cn from "classnames";
import ReactCodeInput from "react-verification-code-input";
import { useCookies } from "react-cookie";
import add from "date-fns/add";

const Login = ({ setActiveType }) => {
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

  const [isOpenCode, setIsOpenCode] = useState(false);
  const [numberLoading, setNumberLoading] = useState(false);
  const checkNumber = () => {
    if (loginNumber === "" || (numberTouched && !numberValid)) {
      error("Неверный номер!", 5);
      return;
    }

    const number = loginNumber.replace(/\s+/g, "");

    const loginCustomer = async () => {
      try {
        setNumberLoading(true);
        const response = await callApi(
          `/send_login_code`,
          "POST",
          {
            name: "",
            phone_number: number.slice(number.length - 10),
          },
          {}
        );

        setNumberLoading(false);
        if (response === "Success") {
          // open code verification
          setIsOpenCode(true);
          return;
        }

        error(response.detail, 5);
      } catch (e) {}
    };

    loginCustomer();
  };

  const [code, setCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const changeCode = (event) => {
    setCode(event);
  };
  const [cookies, setCookie] = useCookies(["jwt"]);

  useEffect(() => {
    if (code.length === 6) {
      verifyCode();
    }
  }, [code]);

  const verifyCode = () => {
    if (code.length < 6) {
      error("Код не заполнен", 5);
      return;
    }

    const sendVerifyCode = async () => {
      try {
        setCodeLoading(true);
        const response = await callApi(
          `/verify_login_code?code=${code}`,
          "GET",
          undefined,
          {}
        );

        if (response.detail) {
          error(response.detail, 5);
        } else {
          success("Успешный вход.", 5);
          setCookie("jwt", response, {
            path: "/",
            expires: new Date(add(new Date(), { days: 15 })),
          });
          // todo: navigate to menu
        }

        setCodeLoading(false);
      } catch (e) {}
    };

    sendVerifyCode();
  };

  return (
    <>
      <Card
        className={cn(styles.authForm, {
          [styles.hidden]: isOpenCode,
        })}
        style={{ width: 614 }}
      >
        <h2>Вход</h2>
        <h5>
          Еще не брали кофе? <Button type="link" onClick={() => setActiveType('registration')}>Зарегистрируйтесь</Button>
        </h5>

        <label>
          <span>Номер телефона</span>
          <Input
            value={loginNumber}
            onChange={handleTelephoneChange}
            status={numberValid ? "" : "error"}
          />
        </label>

        <Spin tip="Отправляю..." spinning={numberLoading}>
          <button className={styles.loginButton} onClick={checkNumber}>
            ВОЙТИ
          </button>
        </Spin>
      </Card>
      <Card
        className={cn(styles.authForm, {
          [styles.hidden]: !isOpenCode,
        })}
        style={{ width: 614 }}
      >
        <PageHeader
          className={styles.verifyTitle}
          onBack={() => setIsOpenCode(false)}
          title="Подтверждение номера"
        />

        <div className={styles.code}>
          <ReactCodeInput
            type="number"
            fields={6}
            value={code}
            onChange={changeCode}
          />
        </div>
        <Spin tip="Отправляю..." spinning={codeLoading}>
          <button className={styles.loginButton} onClick={verifyCode}>
            ПОДТВЕРДИТЬ
          </button>
        </Spin>
      </Card>
    </>
  );
};

export default Login;
