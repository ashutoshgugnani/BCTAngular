import { AppUser } from './models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { switchMap , map} from 'rxjs/operators';

import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private userService:UserService,private afAuth:AngularFireAuth,private route:ActivatedRoute) { 
    this.user$=afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user=>{
        if(user) return this.userService.get(user.uid);
        return of(null);
      })
    )
  }  
}
