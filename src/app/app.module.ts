import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProductDataTableComponent } from './components/product-data-table/product-data-table.component';
import {PaginatorModule} from 'primeng/paginator';
import { CartStatusComponent } from './components/cart-status/cart-status.component';



const routes: Routes = [
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductDataTableComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductCategoryComponent,
    ProductDetailsComponent,
    ProductDataTableComponent,
    CartStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    TableModule,
    BrowserAnimationsModule,
    PaginatorModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
