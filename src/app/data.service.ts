import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user = new BehaviorSubject<string>('');
  cast = this.user.asObservable();

constructor() {}
 editType(newUser) {

   this.user.next(newUser);
 }


}



