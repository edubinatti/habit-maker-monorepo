import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private readonly apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  public getUsers(userId?: number){
    const url = this.apiUrl + (userId ? `/${userId}` : '');    
    return this.http.get<any>(url);
  }

  public getUsersResource(userId?: number){
    console.log('get resource');
    const url = this.apiUrl + (userId ? `/${userId}` : '');    
    return httpResource(() => url);
  }
  
}
