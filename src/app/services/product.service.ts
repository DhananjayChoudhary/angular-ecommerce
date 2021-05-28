import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient : HttpClient) { }

   getProductList(theCategoryId: number): Observable<Product[]>{
     const url = this.baseUrl + "/search/findByProductCategoryId?id=" + theCategoryId; 
     return this.httpClient.get<GetReponse>(url).pipe(
       map(response => response._embedded.products)
     );
   }
}

interface GetReponse{
  _embedded:{
    products: Product[];
  }
  
}
