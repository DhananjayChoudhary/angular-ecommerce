import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/domain/productcategory';
import { ProductcategoryService } from 'src/app/services/productcategory.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  
  productCategory! : ProductCategory [];

  constructor(private productCatergoryService: ProductcategoryService) { }

  ngOnInit(): void {
    this.getProductCategoryList();
  }

  getProductCategoryList(){
    this.productCatergoryService.getProductCategoryList().subscribe(
      data => {
        this.productCategory = data;
      }
    )
  }

}
