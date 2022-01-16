import {ProductTypeEnum} from './productTypeEnum';

export interface Product {
  inStock: boolean;
  type: ProductTypeEnum;
  name: string;
  price: number;
  description: string;
}
