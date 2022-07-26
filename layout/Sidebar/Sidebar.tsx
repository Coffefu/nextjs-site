import {
  UserOutlined,
  ShoppingCartOutlined,
  CoffeeOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Badge, Button, Menu, MenuProps} from 'antd'
import { useState, ReactElement } from "react";

import styles from "./Sidebar.module.css";
import LogoIcon from "./logo.svg";
import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from 'next/router'

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
  getItem(<Link href="/">Заказ</Link>, "/order", <ClockCircleOutlined />),
  getItem(<Link href="/">Профиль</Link>, "/profile", <UserOutlined />),
];

export const Sidebar = ({ className }: SidebarProps) => {

  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(router.asPath);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  return (
    <div className={cn(className, styles.sidebar)}>
      <div className={styles.logoWrapper}>
        <LogoIcon className={styles.logo} />
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        className={styles.menu}
      />
    </div>
  );
};
