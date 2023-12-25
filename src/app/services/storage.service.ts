import { Injectable } from '@angular/core';

const userKey = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(userKey); 
    window.sessionStorage.setItem(userKey, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(userKey); 
    if(user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(userKey); 

    if(user){
      return true;
    }

    return false;
  }
}
