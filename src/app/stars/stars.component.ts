import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  private _rating: number;
  @Input()
  set rating(rating: number) {//使用setter 替代 ngOnChanges
    this._rating = rating;
    this.renderStar();
  }

  get rating() {
    return this._rating;
  }

  @Input()
  private isReadOnly: boolean = true;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter<number>();

  private stars: boolean[] = [];

  constructor() { }

  ngOnInit() {
    //this.renderStar();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  private renderStar() {
    this.stars.splice(0);
    let _star = Math.floor(this.rating);
    for(let i = 1; i <= 5; i++){
      this.stars.push(i <= _star);
    }
  }

  setStar(index: number) {
    if(this.isReadOnly){
      return;
    }
    this.rating = index + 1;
    this.renderStar();
    this.ratingChange.emit(this.rating);
  }
}
