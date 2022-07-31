import {
  ClockCircleOutlined,
  CoffeeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import cn from "classnames";
import Link from "next/link";
import React, { ReactElement } from "react";

import styles from "./Bottombar.module.css";
import { BottombarProps } from "./Bottombar.props";

function getItem(label: ReactElement, key: string, icon: ReactElement) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem(<Link href="/menu">Меню</Link>, "/menu", <CoffeeOutlined />),
  getItem(<Link href="/cart">Корзина</Link>, "/cart", <ShoppingCartOutlined />),
  getItem(<Link href="/order">Заказ</Link>, "/order", <ClockCircleOutlined />),
  getItem(<Link href="/profile">Профиль</Link>, "/profile", <UserOutlined />),
];

export const Bottombar = ({ className }: BottombarProps) => {
  return (
    <div className={cn(styles.bottombar, className)}>
      {items &&
        items.map((item) => 
        (<div className={styles.link} key={item.key}>
            <div className={styles.icon}>{item.icon}</div>
            {item.label}
        </div>
        ))}
    </div>
  );
};
