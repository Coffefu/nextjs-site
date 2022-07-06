import styles from "./ProductCard.module.css";
import { Badge } from "antd";

export const ProductCard = ({ product }) => {
  const stringSizes = ["S", "M", "L"];

  return (
    <div className={styles.card}>
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
        руб.
      </div>
    </div>
  );
};
