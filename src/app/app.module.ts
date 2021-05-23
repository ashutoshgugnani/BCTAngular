import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {NgbModule } from '@ng-bootstrap/ng-bootstrap';


//import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
//import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardServices as AuthGuardServices } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, // .forroot()
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path: 'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'login',component:LoginComponent},

      {path:'check-out',component:CheckOutComponent, canActivate:[AuthGuardServices]},
      {path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGuardServices]},
      {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGuardServices]},
      
      { path:'admin/products',
        component:AdminProductsComponent,
        canActivate:[AuthGuardServices,AdminAuthGuardService]
      },
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuardServices,AdminAuthGuardService]},
    ])
  ],
  providers: [
    AuthService,
    AuthGuardServices,
    UserService,
    AdminAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
