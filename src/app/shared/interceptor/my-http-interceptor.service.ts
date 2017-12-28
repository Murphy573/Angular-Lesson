import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class MyHttpInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('请求经过拦截器' + Math.random());
    const started = Date.now();
    let _token = req.params.append('token', Math.random().toString(16).substring(2));

    const authReq = req.clone({headers: req.headers.set('myAuthor', 'pengfei.li'), params: _token});
    return next.handle(authReq).map(event => {
      //在这里拦截响应
      if (event instanceof HttpResponse) {
        const elapsed = Date.now() - started;
        console.log(`请求链接${req.urlWithParams}总耗时===> ${elapsed} ms.`);
      }
      return event;
    });
  }

  constructor() { }

}
