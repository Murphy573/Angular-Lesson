import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ProductService} from '../shared/product.service';
import {Comment, ProductModel} from '../product/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private productId: number;
  private product: ProductModel;
  private comments: Comment[];
  private imgSrc: string = 'http://placehold.it/820x230';
  private isDisplay: boolean = false;

  newRating: number = 5;
  newComment: string = '';

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productId = +this.routeInfo.snapshot.params['id'];
    this.getProductById();
  }

  getProductById(): void {
    this.productService.getProductById(this.productId).subscribe(
      data=> {
        this.product = data;
        this.getProductComments();

      }
    )
  }

  getProductComments () {
    this.productService.getComments4Product(this.productId).subscribe(
      data=> {
        this.comments = data;
        this.calcAverage();
      }
    )
  }

  private calcAverage() {
    let _sum = this.comments.reduce((sum: number, comment: Comment) => sum + comment.rating, 0);
    this.product.stars = _sum / this.comments.length;
  }

  addComment(): void {
    if(this.newComment === ''){
      return;
    }
    let _i = this.comments.length;

    let _c = new Comment(++_i * 9, this.productId, new Date(), 'sonmeone', this.newRating, this.newComment);
    this.comments.unshift(_c);

    this.productService.addProductComment(_c).toPromise().then(
      data=> {
        if(data){
          this.isDisplay = false;
          this.getProductComments();
        }
      }
    )

  }

}
