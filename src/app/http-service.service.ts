import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

interface HttpOpts {
  url: string;
  type?: string;
  header?: object;

  params?: object
  data?: object;
  onSuccess?: Function;
  onError?: Function;
  onFail?: Function;
}

@Injectable()
export class HttpServiceService {

  constructor(
    private http: HttpClient
  ) { }

  post<T> (opts: HttpOpts): void {
    this._post(opts);
  }

  get<T> (opts: HttpOpts): void {
    this._get(opts);
  }

  private _post<T>(opts: HttpOpts): void {
    this.http.post<T>(opts.url, opts.data).subscribe(
      data => {
        if(opts.onSuccess){
          opts.onSuccess(<T>data);
        }
      },
    error => {
        if(opts.onError){
          opts.onSuccess(<T>error);
        }
      }
    )
  }

  private _get<T> (opts: HttpOpts): void {
    this.http.get<T>(opts.url, {params: this.buildHttpParams(opts.params)}).subscribe(
      data => {
        if(opts.onSuccess){
          opts.onSuccess(<T>data);
        }
      },
      error => {
        if(opts.onError){
          opts.onSuccess(<T>error);
        }
      }
    )
  }

  /**
   * 构造HttpParams
   * @param {object} params 调用接口传递过来的对象
   * @returns {HttpParams} HttpParams对象
   */
  private buildHttpParams(params: object): HttpParams {
    let _httpParams: HttpParams = new HttpParams();
    if(!params || params instanceof Object){
      return _httpParams;
    }
    let _params = JSON.parse(JSON.stringify(params));
    for(let [key, value] of Object.entries(_params)){
      _httpParams = _httpParams.set(key, value.toString());
    }

    return _httpParams;
  }

  /**
   * 构造HttpHeaders
   * @param {object} 调用接口传递过来的对象
   * @returns {HttpHeaders} HttpHeaders对象
   */
  private buildHttpHeaders(headers: object): HttpHeaders{
    let _httpHeaders:HttpHeaders = new HttpHeaders();
    if(!headers || headers instanceof Object){
      return _httpHeaders;
    }
    let _params = JSON.parse(JSON.stringify(headers));
    for(let [key, value] of Object.entries(_params)){
      _httpHeaders = _httpHeaders.append(key, value.toString());
    }

    return _httpHeaders;
  }
}
