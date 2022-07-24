import styles from "./ProductCard.module.css";
import { Badge, Modal } from "antd";
import { ProductCardProps } from "./ProductCard.props";
import React, { MouseEvent, useEffect, useState } from "react";
import { ITopping } from "../../interfaces/product.interface";
import {
  success,
  error,
  warning,
  info,
} from "../../services/AlertingFunctions";

interface ISize {
  size: number;
  price: number;
  id: string;
}

export const ProductCard = ({ product, toppings }: ProductCardProps) => {
  const stringSizes = ["S", "M", "L"];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [sum, setSum] = useState<number>(product.variations[0].price);

  const [size, setSize] = useState<ISize>({
    ...product.variations[0],
  });
  const [topping, setTopping] = useState<ITopping[]>([]);

  const changeSize = (evt: MouseEvent<HTMLDivElement>) => {
    const price =
      (evt.currentTarget.dataset.price &&
        parseInt(evt.currentTarget.dataset.price)) ||
      0;

    setSize({
      size:
        (evt.currentTarget.dataset.size &&
          parseInt(evt.currentTarget.dataset.size)) ||
        -1,
      price: price,
      id: evt.currentTarget.dataset.id || "",
    });

    setSum(price + (toppings.reduce((a, b) => (a += b.price), 0) || 0));

    const checkboxes = document.getElementsByClassName(styles.sizeCheckbox);
    for (let i = 0; i < checkboxes.length; i += 1) {
      checkboxes[i].classList.remove(styles.activeSize);
    }
    evt.currentTarget.classList.add(styles.activeSize);
  };

  const changeTopping = (evt: MouseEvent<HTMLDivElement>) => {
    const clickedTopping =
      (evt.currentTarget.dataset.topping &&
        parseInt(evt.currentTarget.dataset.topping)) ||
      -1;

    const clickedPrice =
      (evt.currentTarget.dataset.price &&
        parseInt(evt.currentTarget.dataset.price)) ||
      0;

    // if click on active topping
    if (topping.map((item) => item.id).includes(clickedTopping)) {
      const filteredToppings = [
        ...topping.filter((item) => item.id !== clickedTopping),
      ];
      setTopping(filteredToppings);
      setSum(size.price + filteredToppings.reduce((a, b) => (a += b.price), 0));
      const checkboxes = document.getElementsByClassName(
        styles.toppingCheckbox
      );
      for (let i = 0; i < checkboxes.length; i += 1) {
        if (
          checkboxes[i].getAttribute("data-topping") &&
          parseInt(checkboxes[i].getAttribute("data-topping") || "-1") ===
            clickedTopping
        ) {
          checkboxes[i].classList.remove(styles.activeTopping);
        }
      }
      return;
    }

    setTopping([
      ...topping,
      {
        id: clickedTopping,
        name: evt.currentTarget.dataset.name || "",
        price: clickedPrice,
      },
    ]);

    setSum(
      size.price + clickedPrice + topping.reduce((a, b) => (a += b.price), 0)
    );
    
    const checkboxes = document.getElementsByClassName(styles.toppingCheckbox);
    for (let i = 0; i < checkboxes.length; i += 1) {
      if (!topping.map((item) => item.id).includes(parseInt(checkboxes[i].getAttribute('data-topping') || '-1'))) {
        checkboxes[i].classList.remove(styles.activeTopping);
      }
    }
    evt.currentTarget.classList.add(styles.activeTopping);
  };

  const addProduct = () => {
    success('Продукт успешно добавлен в корзину!', 5);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ ...product, price: sum, topping: topping, id: size.id });
      localStorage.setItem('cart', JSON.stringify(cart));
      handleCancel();
  };

  return (
    <>
      <div className={styles.card} onClick={showModal}>
        <div className={styles.title}>
          <h3 className={styles.name}> {product.name}</h3>
          {product.variations.map((variant) => (
            <Badge
              key={variant.id}
              count={stringSizes[variant.size]}
              style={{ backgroundColor: "#D8AB7E" }}
            />
          ))}
        </div>
        <div className={styles.description}>{product.description}</div>
        <div className={styles.price}>
          {product.variations
            .reduce((a, b) => (a += b.price + "/"), "")
            .slice(0, -1)}{" "}
          ₽
        </div>
      </div>

      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>{product.name}</h3>

          <span>Размер</span>

          <div className={styles.sizes}>
            {product.variations.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.sizeCheckbox} ${
                    index === 0 ? styles.activeSize : ""
                  }`}
                  data-size={item.size}
                  onClick={changeSize}
                  data-price={item.price}
                  data-id={item.id}
                >
                  {stringSizes[item.size]}
                </div>
              );
            })}
          </div>

          <span>Добавки</span>

          <div className={styles.toppings}>
            {toppings.map((topping, index) => {
              return (
                <div
                  key={index}
                  className={styles.toppingCheckbox}
                  data-topping={topping.id}
                  onClick={changeTopping}
                  data-price={topping.price}
                  data-name={topping.name}
                >
                  {`${topping.name} + ${topping.price}₽`}
                </div>
              );
            })}
          </div>

          <button className={styles.addButton} onClick={addProduct}>
            {`Добавить - ${sum}₽`} 
          </button>
        </div>
      </Modal>
    </>
  );
};
