import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnDestroy,OnInit{
  //products$:Observable<any>;
  products: Product[]=[];
  filteredProducts:Product[]=[];
  subscription: Subscription;
  sub:Subscription;
  category:string;
  cart;

  constructor(
    route:ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
    //this.products$=productService.getAll;
    this.subscription = productService.getAll().pipe(
      map((actions) =>
        actions.map((action) => {
          const $key = action.payload.key;
          const data = { $key, ...(action.payload.val() as Product) };

          return data;
        })
      ))
    .subscribe((products) => (this.products = products));

    
    productService.getAll().subscribe(products => {
      this.products = products.map(
      product => {
        return <Product> {
          title: product.payload.val()['title'],
          category: product.payload.val()['category'],
          imageUrl: product.payload.val()['imageUrl'],
          price: product.payload.val()['price'],
          key: product.key
        }
      })
      route.queryParamMap.subscribe(params=>{
        this.category=params.get('category');
        this.filteredProducts=(this.category)?
          this.products.filter(p=> p.category===this.category):
          this.products;
      });
    });

   }

  async ngOnInit(){
    //this.sub=(await this.shoppingCartService.getCart()).subscribe(cart=>this.cart=cart);
    
    this.subscription = (await this.shoppingCartService.getCard()).snapshotChanges()
    .subscribe(cart => this.cart = cart.payload.val());
  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub.unsubscribe();
  }
}
