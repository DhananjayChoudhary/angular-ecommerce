import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../domain/cart-item';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    //check if we already have the item in our cart
    let aleadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem  ;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on item id

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
      
    }
    // check if we found it
    aleadyExistsInCart = (existingCartItem != undefined);
    if(aleadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals(this.cartItems);

  }
  computeCartTotals(cartItems: CartItem[]) {
    let thetotalPrice : number = 0;
    let thetotalQuantity : number = 0;

    for (let theCartItem of cartItems){
        thetotalQuantity += theCartItem.quantity;
        thetotalPrice +=  (theCartItem.unitPrice * theCartItem.quantity);
    }
    console.log(`thetotalPrice :: ${thetotalPrice}`)
    this.totalPrice.next(thetotalPrice);
    this.totalQuantity.next(thetotalQuantity);
  }
}
