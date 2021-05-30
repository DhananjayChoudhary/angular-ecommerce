import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
  data: Book[];
  name:string;
  price:number;
  author:string;
}



@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getBooks(){
    return this.httpClient.get<Book>('assets/book.json')
    .toPromise()
      .then(res => <Book[]>res.data)
      .then(data => { return data; });
  }
}
