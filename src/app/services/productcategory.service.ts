import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { ProductCategory } from '../domain/productcategory';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  private baseUrl : string = 'http://localhost:8080/api/product-category';

  constructor(private httpclient:HttpClient) { }

  getProductCategoryList(): Observable<ProductCategory[]>{
      return this.httpclient.get<GetReponse>(this.baseUrl).pipe(
      map(response => response._embedded.productCategory)
      );
  }
}
interface GetReponse{
  _embedded:{
    productCategory: ProductCategory[];
  }
}