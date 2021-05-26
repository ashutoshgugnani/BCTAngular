import { ProductService } from './../../product.service';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  //product:any={};
  product: any={};  
  subscription: Subscription;
  id;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private categoryService: CategoryService,
    private productService:ProductService
    ) 
    { 
      this.categories$=categoryService.getCategories();

      this.id = this.route.snapshot.paramMap.get('id');

      if (this.id) { this.productService.getProduct(this.id).pipe(take(1)).subscribe(p => {
        return this.product = p;
      }); }
      console.log(this.product);
    }

  save(product){
    if(this.id){
      this.productService.update(this.id,product);
    }
    else{
    this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('SUre ?'))return ;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
