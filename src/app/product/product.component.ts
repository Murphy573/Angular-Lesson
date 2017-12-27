import {Component, OnInit} from '@angular/core';

import {ProductModel} from './product.model';
import {ProductService} from '../shared/product.service';
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/debounceTime";

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
    public productService: ProductService
  ) {}

  ngOnInit() {
    this._initData();

    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(value => this.keyWord = value);
  }

  private _initData() {
    this.products = this.productService.getProducts();
  }

}
