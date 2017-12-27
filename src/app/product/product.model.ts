/**
 * write by @pengfei.li
 */

export class ProductModel {
  public id: number;
  public title: string;
  public price: number;
  public stars: number;
  public desc: string;
  public categories: string[];
}


export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: Date,
    public user: string,
    public rating: number,
    public content: string
  ){}
}
