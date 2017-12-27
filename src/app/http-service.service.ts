import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface HttpOpts {
  url: string;
  type?: string;
  header?: object;

  params?: {
    [param: string]: string | string[];
  };
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
    this.http.get<T>(opts.url, {params: opts.params}).subscribe(
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
}
