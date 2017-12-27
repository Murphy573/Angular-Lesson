/**
 * write by @pengfei.li
 */
import {Injectable} from '@angular/core';

import {ProductModel, Comment} from '../product/product.model';

let products: Array<ProductModel> = [
  {
    id: 1,
    title: '第1个商品',
    price: 1.99,
    stars: 2.5,
    desc: '描述1',
    categories: ['电子产品', '硬件设备']
  },
  {
    id: 2,
    title: '第2个商品',
    price: 1.99,
    stars: 1.5,
    desc: '描述2',
    categories: ['零食']
  },
  {
    id: 3,
    title: '第3个商品',
    price: 1.99,
    stars: 2.5,
    desc: '描述3',
    categories: ['宠物']
  },
  {
    id: 4,
    title: '第4个商品',
    price: 1.99,
    stars: 0.5,
    desc: '描述4',
    categories: ['电子产品']
  },
  {
    id: 5,
    title: '第5个商品',
    price: 1.99,
    stars: 2.5,
    desc: '描述5',
    categories: ['宠物', '生活']
  },
  {
    id: 6,
    title: '第6个商品',
    price: 1.99,
    stars: 2,
    desc: '描述6',
    categories: ['医疗器材']
  },
  {
    id: 7,
    title: '第7个商品',
    price: 1.99,
    stars: 3,
    desc: '描述7',
    categories: ['硬件设备']
  },
  {
    id: 8,
    title: '第8个商品',
    price: 1.99,
    stars: 5,
    desc: '描述8',
    categories: ['电子产品']
  },
];

let comments: Array<Comment> = [
  new Comment(1, 1, new Date(), '张三1', 3, '东西不错1'),
  new Comment(2, 1, new Date(), '张三1', 3.5, '东西不错1'),
  new Comment(3, 1, new Date(), '张三1', 5, '东西不错1'),
  new Comment(4, 2, new Date(), '张三2', 4, '东西不错2'),
  new Comment(5, 2, new Date(), '张三2', 4, '东西不错2'),
  new Comment(6, 3, new Date(), '张三3', 3, '东西不错3'),
  new Comment(7, 3, new Date(), '张三3', 3, '东西不错3'),
  new Comment(8, 4, new Date(), '张三4', 2, '东西不错4'),
  new Comment(9, 5, new Date(), '张三5', 1, '东西不错5'),
];


@Injectable()
export class ProductService {
  constructor() {

  }

  getProducts(): Array<ProductModel> {
    return products;
  }

  getProduct(id: number): ProductModel {
      return products.find(p => p.id === id);
  }

  getCommentsForProduct(productId: number): Array<Comment>{
    return comments.filter((c: Comment) => {
      return c.productId === productId
    })
  }

  getAllProductCategory(): Array<string> {
    let _set: Set<string> = new Set<string>();
    products.every((p: ProductModel) => {
      p.categories.every((c: string) => {
        _set.add(c);
        return true;
      });
      return true;
    });
    return Array.from(_set);
  }
}
