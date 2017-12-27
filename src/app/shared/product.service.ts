/**
 * write by @pengfei.li
 */
import {Injectable} from '@angular/core';

import {ProductModel, Comment} from '../product/product.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>('product/getProducts')
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.post<ProductModel>('product/getProductById', {id: id});
  }


  getComments4Product( productId: number ): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>('product/getProductComment/' + productId);
  }

  getAllProductCategory(): Observable<Array<string>> {
    return this.http.get<Array<string>>('product/getAllProductCategories')
  }

  addProductComment( comment: Comment ): Observable<any> {
    return this.http.post<boolean>('product/addProductComment', comment);
  }
}
