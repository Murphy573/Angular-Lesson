import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {ProductSearchParams} from "../product/product.model";

@Injectable()
export class CommunicationServiceService {
  private searchSubject = new Subject<ProductSearchParams>();

  search$ = this.searchSubject.asObservable();

  startSearch(psp: ProductSearchParams) {
    this.searchSubject.next(psp);
  }

  constructor() { }

}
