import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-data-table',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.css']
})
export class ProductDataTableComponent implements OnInit {

  products : Product [] = [];
  theTotalElements! : number ;
  thePageNumber : number = 0;
  thePageSize  : number = 5;
  thePreviousKeyword : string = '';
  @ViewChild('p', {static: false}) paginator!: Paginator ;
  

  constructor(private productService : ProductService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.thePageNumber = 0;
    this.route.paramMap.subscribe(() =>
    this.listProducts()
    
    );
  }

  reset($event: any) {
    
          this.paginator.changePageToFirst($event);
      
  }

  listProducts() {
      this.handleKeywordSearch();
   }
   
  paginate(event: any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.thePageSize = event.rows;
    this.thePageNumber = event.page;
    this.handleKeywordSearch() ;
  }

   handleKeywordSearch(){
     const theKeyword = this.route.snapshot.paramMap.get('keyword')!;
 
     if(this.thePreviousKeyword != theKeyword){
      this.thePageNumber = 0;
     
     }
     this.thePreviousKeyword = theKeyword;
     this.productService.searchProduct(this.thePageNumber  , this.thePageSize, theKeyword)
                             .subscribe(this.processResult()) ;
   }

   processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber  = data.page.number  ;
      this.thePageSize  = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
   }

}
