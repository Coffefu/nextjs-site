import { IProduct } from "./../../interfaces/product.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProductCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}
