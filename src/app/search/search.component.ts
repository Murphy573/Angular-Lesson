import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  productCategories: Array<string>;

  constructor(
    private fb: FormBuilder,
    private ps: ProductService
  ) { }

  ngOnInit() {
    this.createFormModel();
    this.initProductCategories();
  }

  initProductCategories() {
    this.ps.getAllProductCategory().subscribe(
      data=> {
        this.productCategories = data;
      }
    )
  }

  createFormModel() {
    this.searchForm = this.fb.group({
      productName: ['',
        [
          Validators.minLength(3),
          Validators.maxLength(6)
        ]
      ],
      productPrice: [null,
        [
          Validators.min(0),
        ]
      ],
      productCategory: ['all']
    })
  }

  query() {
    console.log(this.searchForm.value);

    this.ps.searchEvent.emit(this.searchForm.value);
  }
}
