import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Order.module.css'
import callApi from '../common/callApi'

import AlertingService from '../services/AlertingService'
import { withLayout } from '../layout/Layout'
import { Input, Tag } from 'antd'
import { ICoffeehouse, ITopping } from '../interfaces/product.interface'
import Link from 'next/link'
import { error } from '../services/AlertingFunctions'
import format from 'dayjs'
import dayjs from 'dayjs'

interface OrderProps extends Record<string, unknown> {
  toppings: ITopping[];
  coffeeHouses: ICoffeehouse[];
}

interface IOrderProduct {
  id: number;
  toppings: number[]
}

interface IOrder {
  status: string,
  order_number: number,
  time: string,
  coffee_house: number,
  products: IOrderProduct[],
  comment: string,
}

const { TextArea } = Input

function Order({ toppings, coffeeHouses }: OrderProps) {

  const [order, setOrder] = useState<IOrder | null>({
    'order_number': 4,
    'coffee_house': 1,
    'time': '2022-04-12 19:59',
    'status': 'Принят',
    'comment': 'Хочу много сахара и воду без газа',
    'products': [
      {
        'id': 26,
        'toppings': [
          11
        ]
      },
      {
        'id': 25,
        'toppings': [
          3
        ]
      }
    ]
  })
  const [coffeeHouse, setCoffeeHouse] = useState<ICoffeehouse | null>({
    name: 'Полка Кофе',
    placement: 'возле D737',
    close_time: '08:00',
    open_time: '18:00',
    id: 1,
  })

  // useEffect(() => {
  //
  //   if (!order || order.status !== 'Отдан покупателю' || order.status !== 'Готов' || order.status !== 'Не забран покупателем') {
  //     checkStatus();
  //     const interval = setInterval(() => {
  //       checkStatus();
  //     }, 60000);
  //
  //     return () => clearInterval(interval);
  //   }
  // }, [])

  const checkStatus = async () => {
    try {
      const res = await callApi(`/last_order`, 'GET', undefined, {})
      console.log(res)
      if (res && res.detail) {
        setOrder(null)
        error(res.detail)
        return
      }

      setOrder(res)

      if (coffeeHouses) {
        setCoffeeHouse(coffeeHouses.filter(item => item.id === res.coffee_house)[0])
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title> Cofefu - Последний заказ </title>
        <meta
          name='description'
          content='Информация о закаке'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AlertingService horizontal={'right'} vertical={'top'} />
      <main className={styles.main}>
        {
          !order
            ? (
              <div className={styles.empty}>
                <h2>
                  Вы ещё ничего не заказали
                </h2>

                <Link href='/menu'>
                  <span className={styles.menuLink}>В меню</span>
                </Link>
              </div>
            )
            : (
              <div className={styles.orderInfo}>
                <h2 className={styles.header}>
                  Последний заказ
                </h2>

                <div>
                  <h3 className={styles.title}>Номер заказа</h3>
                  <span className={styles.number}>{order.order_number}</span>


                </div>

                <Tag>{order.status}</Tag>

                <div>
                  <h3 className={styles.title}>Будет готов к</h3>
                  <span className={styles.number}>{dayjs(order.time).format('HH:mm')}</span>
                </div>

                {coffeeHouse && (
                  <div>
                    <h3 className={styles.title}>Кофейня</h3>
                    <span className={styles.number}>{coffeeHouse.name + " " + coffeeHouse.placement}</span>
                  </div>
                )}

                <button className={styles.refreshButton}>
                  Обновить
                </button>

              </div>
            )
        }
      </main>
    </div>
  )
}

export default withLayout(Order)

export const getStaticProps = async () => {
  const responseToppings = await callApi('/toppings', 'GET', undefined, {})
  const responseCoffeehouses = await callApi('/coffee_houses', 'GET', undefined, {})
  return {
    props: {
      toppings: responseToppings,
      coffeeHouses: responseCoffeehouses
    }
  }
}
