import { ChangeEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Profile.module.css'
import callApi from '../common/callApi'

import AlertingService from '../services/AlertingService'
import { withLayout } from '../layout/Layout'
import { Input, List, Tag } from 'antd'
import { error, success } from '../services/AlertingFunctions'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'

function Profile() {

  const [profile, setProfile] = useState({
    'name': 'Иван',
    'phone_number': '9997773322'
  })

  const [isPhoneConfirmed, setIsPhoneConfirmed] = useState(false);
  const [newName, setNewName] = useState<string>(profile.name)

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const res = await callApi(`/is_confirmed`, 'GET', undefined, {});
        setIsPhoneConfirmed(res);
      } catch (e) {
        console.log(e);
      }
    }

    if (!profile) {
      getCustomer();
    }
  }, [profile]);

  const [isNameEditable, setIsNameEditable] = useState<boolean>(false)

  const changePhonenumber = () => {
    return
  }

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNameEditable) {
      return
    }

    if (
      /^[a-zA-Zа-яА-ЯёЁ]+$/.test(event.target.value) ||
      event.target.value === ''
    ) {
      setNewName(event.target.value);
    }
  }

  const editName = () => {
    setIsNameEditable(true)
  }

  const saveName = () => {
    if (profile.name === '') {
      error('Имя не может быть пустым!')
      return;
    }

    if (profile.name === newName) {
      setIsNameEditable(false);
      return;
    }

    const sendNewName = async () => {
      const res = await callApi(`/change_name`, 'PUT', {name: profile.name}, {})

      if (!res.detail) {
        success('Имя успешно изменено!')
      }
    }

    sendNewName()
  }

  const verifyNumber = () => {
    console.log('verify ')
  }

  const listItems = [
    {
      name: 'Подтвердить телефон',
      onClick: verifyNumber,
    },
    {
      name: 'История заказов',
      onClick: verifyNumber,
    },
    {
      name: 'Обратная связь',
      onClick: verifyNumber,
    },
    {
      name: 'Выйти из аккаунта',
      onClick: verifyNumber,
    },
  ];

  // useEffect(() => {
  //   const getCustomer = async () => {
  //     try {
  //       const res = await callApi(`/me`, "GET", undefined, {});
  //       setProfile(res);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //
  //   if (!profile) {
  //     getCustomer();
  //   }
  // }, [profile])

  return (
    <div>
      <Head>
        <title> Cofefu - Профиль </title>
        <meta
          name='description'
          content='Информация о закаке'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AlertingService horizontal={'right'} vertical={'top'} />
      <main className={styles.main}>

        <h2>Мой cofefu</h2>

        <div className={styles.profileData}>
          <div className={styles.name}>
            <Input
              className={styles.input}
              value={newName}
              onChange={changeName}
            />
            {
              isNameEditable
                ? (<SaveOutlined className={styles.editButton} onClick={saveName} />)
                : (<EditOutlined className={styles.editButton} onClick={editName} />)
            }
          </div>
          <Input className={styles.input} prefix={'+7'} value={profile.phone_number} onChange={changePhonenumber} />
        </div>

        <div>
          <List
            dataSource={listItems}
            renderItem={item => (
              <List.Item onClick={item.onClick}>
                <div className={styles.listItem} >{item.name}</div>
              </List.Item>
            )}
          />
        </div>

      </main>
    </div>
  )
}

export default withLayout(Profile)

