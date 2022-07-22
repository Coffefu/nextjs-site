export interface IProduct {
  id: number;
  type: number;
  name: string;
  description: string;
  variations: IProductVariation[];
}

export interface IProductVariation {
  id: string;
  size: number;
  price: number;
}
