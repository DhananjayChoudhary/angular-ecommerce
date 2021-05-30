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

  getProduct(theProductID : number): Observable<Product>{
    const url : string = `${this.baseUrl}/${theProductID}`
    return this.httpClient.get<Product>(url);
    
  }

  getProductListPagenate(thePage:number, theSize: number, theCategoryId: number): Observable<GetReponse>{
    const url = this.baseUrl + `/search/findByProductCategoryId?id=${theCategoryId}`
                            + `&size=${theSize}&page=${thePage}`; 
    return this.httpClient.get<GetReponse>(url);
  }

   getProductList(theCategoryId: number): Observable<Product[]>{
     const url = this.baseUrl + "/search/findByProductCategoryId?id=" + theCategoryId; 
     return this.getFrombackend(url);
   }

   searchProduct(thePage:number, theSize: number,theKeyword: string): Observable<GetReponse>{
    const url = this.baseUrl + `/search/findByNameContainingIgnoreCase?name=${theKeyword}`
                             + `&size=${theSize}&page=${thePage}`;  
    return this.httpClient.get<GetReponse>(url);
    }
    
  private getFrombackend(url: string): Observable<Product[]> {
    return this.httpClient.get<GetReponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetReponse{
  _embedded:{
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
  
}
