import { Component, OnInit, AfterViewInit } from '@angular/core';


declare var $: any;//很关键！！！！


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'app';

  ngAfterViewInit() {
    $('.modal').modal('show');

  }
}
