import { Product } from './../../models/products';
import { query } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  //products$:Observable<any>;
  //products:any[];
  products:Product[];

  filteredProducts:Product[];
  subscription : Subscription;


  constructor(private productService:ProductService) { 
    //this.products$ = this.productService.getAll();

    //this.subscription=this.productService.getAll()
   //   .subscribe(products=> this.filteredProducts = this.products = products);

    //  this.subscription = this.productService.getAll()
    //  .subscribe(products => {
    //    this.filteredProducts = this.products = products;
    //  });
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products.map(
          product => {
            return <Product>{
              title: product.payload.val()['title'],
              category: product.payload.val()['category'],
              imageUrl: product.payload.val()['imageUrl'],
              price: product.payload.val()['price'],
              key: product.key
            }
          }
        )
      });
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query:string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
}
