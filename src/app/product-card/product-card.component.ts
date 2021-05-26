import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/products';
import { Component, Input, IterableDiffers, OnInit } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { isTemplateExpression } from 'typescript';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product:Product;
  @Input('show-action') showAction=true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }

  getQuantity(){
    if (!this.shoppingCart) return 0;
    //let item=this.shoppingCart.items[this.product.key];
    const item = this.shoppingCart.items[this.product.key]
    return item ? item.quantity:0;
  }
}
