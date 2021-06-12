import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/domain/cart-item';
import { Product } from 'src/app/domain/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!:Product;

  constructor(private productService:ProductService,
              private cartService:CartService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const theProductID : number  = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductID).subscribe(
     data =>
       this.product = data
     );

  }

  addToCart(theProduct : Product){

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
    
  }

}
