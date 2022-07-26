import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Cart.module.css'
import callApi from '../common/callApi'

import AlertingService from '../services/AlertingService'
import { withLayout } from '../layout/Layout'
import { Select, Tabs } from 'antd'
import { IProduct, ITopping } from '../interfaces/product.interface'
import { useScrollY } from '../hooks/useSrollY'
import { UpOutlined } from '@ant-design/icons'
import { useAnimation, motion } from 'framer-motion'
import Link from 'next/link'
import { CartCard } from '../components/CartCard/CartCard'
import { ICartProduct } from '../components/CartCard/CartCard.props'
import _ from 'lodash'

interface CartProps extends Record<string, unknown> {
  toppings: ITopping[];
}

function Cart({ toppings }: CartProps) {
  const { Option } = Select;

  const [cartItems, setCartItems] = useState<ICartProduct[]>([])
  const [openTimePicker, setOpenTimePicker] = useState(false)
  const closeTimePicker = () => setOpenTimePicker(false)

  const clearCart = () => {
    localStorage.removeItem('cart')
    setCartItems([])
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(data)
  }, [])

  const deleteItem = (item: ICartProduct) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let deleted = false
    const newCart = cart.filter((product: ICartProduct) => {
      if (deleted) {
        return true;
      }
      if (_.isEqual(product, item)) {
        deleted = true;
      }
      return !_.isEqual(product, item);
    })
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const { TabPane } = Tabs

  const contentRef = useRef<HTMLDivElement>(null)

  const controls = useAnimation()

  const [scrollY, setScrollY] = useState<number>(0)
  const isBrowser = typeof window !== undefined

  const handleScroll = () => {
    if (contentRef.current) {
      const currentScrollY = isBrowser ? contentRef.current.scrollTop : 0
      setScrollY(currentScrollY)
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      controls.start({ opacity: scrollY / contentRef.current.scrollHeight })
    }
  }, [scrollY, controls])

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const [activeTab, setActiveTab] = useState('1')
  const onChange = (key: string) => {
    setActiveTab(key)
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <Head>
          <title> Cofefu - Меню </title>
          <meta
            name='description'
            content='Выбери любимый продукт из меню не приходя в кофейню!'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <AlertingService horizontal={'right'} vertical={'top'} />
        <main className={styles.main}>

          <div className={styles.empty}>
            <h2>
              В вашей корзине пусто
            </h2>

            <Link href='/menu'>
              <span className={styles.menuLink}>В меню</span>
            </Link>
          </div>

          <motion.div animate={controls} initial={{ opacity: 0 }}>
            <button className={styles.upButton} onClick={scrollToTop}>
              <UpOutlined />
            </button>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title> Cofefu - Меню </title>
        <meta
          name='description'
          content='Выбери любимый продукт из меню не приходя в кофейню!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AlertingService horizontal={'right'} vertical={'top'} />
      <main className={styles.main}>

        <div className={styles.content}>
          <div>
            <h2 className={styles.orderTitle}>Мой заказ</h2>

            <div className={styles.products}>
              {
                cartItems.map((item, index) => (
                  <CartCard product={item} toppings={toppings} key={index} deleteItem={deleteItem} />
                ))}
            </div>
          </div>

          <div className={styles.orderInfo}>
            <h2 className={styles.orderTitle}>Информация о заказе</h2>

            <h3>Кофейня</h3>
            <Select defaultValue="d" style={{ width: 'auto' }} onChange={handleChange} size='large'>
              <Option value="e">Полка кофе E3</Option>
              <Option value="d">Полка кофе D7</Option>
            </Select>

          </div>
        </div>

        <motion.div animate={controls} initial={{ opacity: 0 }}>
          <button className={styles.upButton} onClick={scrollToTop}>
            <UpOutlined />
          </button>
        </motion.div>
      </main>
    </div>
  )
}

export default withLayout(Cart)

export const getStaticProps = async () => {
  const responseToppings = await callApi('/toppings', 'GET', undefined, {})
  return {
    props: {
      toppings: responseToppings
    }
  }
}
