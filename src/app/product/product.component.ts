import {Component, OnInit} from '@angular/core';

import {ProductModel} from './product.model';
import {ProductService} from '../shared/product.service';
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import {HttpClient} from "@angular/common/http";
import {HttpServiceService} from "../http-service.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Array<ProductModel>;

  private imgSrc: string = 'http://placehold.it/320x150';

  private keyWord: string;

  private titleFilter: FormControl = new FormControl();

  constructor(
    public productService: ProductService,
    public http: HttpClient,
    public mHttp: HttpServiceService
  ) {}

  ngOnInit() {
    this._initData();

    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(value => this.keyWord = value);
  }

  private _initData() {
    /*this.http.get('product/getProducts').subscribe(
      data => {
        this.products = <Array<ProductModel>>data;
      }
    )*/

    /*this.http.get<Array<ProductModel>>('product/getProducts').debounceTime(2000).toPromise().then(data => {
      this.products = data;
    })*/
    let _self = this;

    this.mHttp.get({
      url: 'product/getProducts',
      params: {
        'a': '1',
      },
      onSuccess(data) {
        debugger;
        _self.products = data;
      }
    })

  }

}
