/**
 * write by @pengfei.li
 */
import {Injectable} from '@angular/core';

import {ProductModel, Comment} from '../product/product.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {
  }

  /**
   * 获取所有商品
   * @returns {Observable<Array<ProductModel>>}
   */
  getProducts(): Observable<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>('product/getProducts')
  }

  /**
   * 查询商品信息
   * @param {number} id
   * @returns {Observable<ProductModel>}
   */
  getProductById(id: number): Observable<ProductModel> {
    return this.http.post<ProductModel>('product/getProductById', {id: id});
  }

  /**
   * 根据商品ID获取商品评论
   * @param {number} productId
   * @returns {Observable<Array<Comment>>}
   */
  getComments4Product(productId: number): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>('product/getProductComment/' + productId);
  }

  /**
   * 获取所有的商品类型
   * @returns {Observable<Array<string>>}
   */
  getAllProductCategory(): Observable<Array<string>> {
    return this.http.get<Array<string>>('product/getAllProductCategories')
  }

  /**
   * 添加商品评论
   * @param {Comment} comment
   * @returns {Observable<any>}
   */
  addProductComment(comment: Comment): Observable<any> {
    return this.http.post<boolean>('product/addProductComment', comment);
  }
}
