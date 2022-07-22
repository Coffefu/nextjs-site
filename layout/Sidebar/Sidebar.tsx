import {
  UserOutlined,
  ShoppingCartOutlined,
  CoffeeOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState, ReactElement } from "react";

import styles from "./Sidebar.module.css";
import LogoIcon from "./logo.svg";
import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";

function getItem(label: string, key: string, icon: ReactElement) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem("Меню", "1", <CoffeeOutlined />),
  getItem("Корзина", "2", <ShoppingCartOutlined />),
  getItem("Заказ", "3", <ClockCircleOutlined />),
  getItem("Профиль", "4", <UserOutlined />),
];

export const Sidebar = ({ className }: SidebarProps) => {
  console.log(LogoIcon);

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(className, styles.sidebar)}>
      <div className={styles.logoWrapper}>
        <LogoIcon className={styles.logo} />
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        className={styles.menu}
      />
    </div>
  );
};
