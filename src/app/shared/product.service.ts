/**
 * write by @pengfei.li
 */
import {EventEmitter, Injectable} from '@angular/core';

import {ProductModel, Comment, ProductSearchParams} from '../product/product.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {
  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();//搜索事件流：不同组件间通讯方式的一种;

  constructor(private http: HttpClient) {
  }

  /**
   * 获取所有商品
   * @returns {Observable<Array<ProductModel>>}
   */
  getProducts(searchParams?: ProductSearchParams): Observable<Array<ProductModel>> {
    let _httpParams: HttpParams = new HttpParams();
    if(searchParams){
      for(let [key, value] of Object.entries(searchParams)){
        if(value){
          _httpParams = _httpParams.set(key, value.toString());
        }
      }
    }
    return this.http.get<Array<ProductModel>>('product/getProducts', {params: _httpParams})
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
